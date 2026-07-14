const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");

let token;
let employeeId;
let leaveRequestId;
let payrollId;
let exitId;

test("successful login returns an access token", async () => {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ email: "admin@example.com", password: "Admin@12345" });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.success, true);
  assert.ok(response.body.data.accessToken);
  token = response.body.data.accessToken;
});

test("invalid login is rejected", async () => {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ email: "admin@example.com", password: "wrong-password" });

  assert.equal(response.statusCode, 401);
});

test("protected route rejects missing token", async () => {
  const response = await request(app).get("/api/v1/employees");
  assert.equal(response.statusCode, 401);
});

test("employee creation and search work", async () => {
  const suffix = Date.now();
  const response = await request(app)
    .post("/api/v1/employees")
    .set("Authorization", `Bearer ${token}`)
    .send({
      employee_code: `TST${suffix}`,
      first_name: "Test",
      last_name: "Employee",
      gender: "Other",
      dob: "1995-01-01",
      email: `test.employee.${suffix}@example.com`,
      mobile: "9999999999",
      joining_date: "2026-07-14",
      department_id: 2,
      designation_id: 1,
      salary: 50000,
      status: "Active"
    });

  assert.equal(response.statusCode, 201);
  employeeId = response.body.data.id;

  const searchResponse = await request(app)
    .get(`/api/v1/employees?search=TST${suffix}`)
    .set("Authorization", `Bearer ${token}`);

  assert.equal(searchResponse.statusCode, 200);
  assert.ok(searchResponse.body.data.length >= 1);
});

test("duplicate employee code is rejected", async () => {
  const existing = await request(app)
    .get(`/api/v1/employees/${employeeId}`)
    .set("Authorization", `Bearer ${token}`);

  const response = await request(app)
    .post("/api/v1/employees")
    .set("Authorization", `Bearer ${token}`)
    .send({
      employee_code: existing.body.data.employee_code,
      first_name: "Duplicate",
      last_name: "Employee",
      gender: "Other",
      email: `duplicate.${Date.now()}@example.com`,
      joining_date: "2026-07-14",
      department_id: 2,
      designation_id: 1,
      salary: 50000
    });

  assert.equal(response.statusCode, 409);
});

test("attendance duplicate check-in is rejected", async () => {
  const date = "2026-08-01";
  const first = await request(app)
    .post("/api/v1/attendance/check-in")
    .set("Authorization", `Bearer ${token}`)
    .send({ employee_id: employeeId, attendance_date: date, check_in: "09:00:00" });
  assert.equal(first.statusCode, 201);

  const duplicate = await request(app)
    .post("/api/v1/attendance/check-in")
    .set("Authorization", `Bearer ${token}`)
    .send({ employee_id: employeeId, attendance_date: date, check_in: "09:30:00" });
  assert.equal(duplicate.statusCode, 409);
});

test("leave application and approval work", async () => {
  const create = await request(app)
    .post("/api/v1/leave-requests")
    .set("Authorization", `Bearer ${token}`)
    .send({
      employee_id: employeeId,
      leave_type: "Sick Leave",
      from_date: "2026-08-05",
      to_date: "2026-08-06",
      reason: "Medical"
    });

  assert.equal(create.statusCode, 201);
  leaveRequestId = create.body.data.id;

  const approve = await request(app)
    .patch(`/api/v1/leave-requests/${leaveRequestId}/approve`)
    .set("Authorization", `Bearer ${token}`)
    .send({ remarks: "Approved for test" });

  assert.equal(approve.statusCode, 200);
  assert.equal(approve.body.data.status, "Approved");
});

test("payroll calculation works", async () => {
  const response = await request(app)
    .post("/api/v1/payroll")
    .set("Authorization", `Bearer ${token}`)
    .send({
      employee_id: employeeId,
      payroll_month: "August",
      payroll_year: 2026,
      basic_salary: 10000,
      hra: 1000,
      da: 500,
      bonus: 250,
      incentives: 250,
      pf: 500,
      esi: 100,
      tax: 400,
      deductions: 100
    });

  assert.equal(response.statusCode, 201);
  assert.equal(Number(response.body.data.net_salary), 10900);
  payrollId = response.body.data.id;
});

test("employee exit completion works after approvals and clearance", async () => {
  const create = await request(app)
    .post("/api/v1/employee-exits")
    .set("Authorization", `Bearer ${token}`)
    .send({
      employee_id: employeeId,
      resignation_date: "2026-08-01",
      last_working_day: "2026-08-31",
      reason: "Test exit"
    });

  assert.equal(create.statusCode, 201);
  exitId = create.body.data.id;

  await request(app)
    .patch(`/api/v1/employee-exits/${exitId}/manager-approval`)
    .set("Authorization", `Bearer ${token}`)
    .send({ manager_approval: true });
  await request(app)
    .patch(`/api/v1/employee-exits/${exitId}/hr-approval`)
    .set("Authorization", `Bearer ${token}`)
    .send({ hr_approval: true });

  const complete = await request(app)
    .patch(`/api/v1/employee-exits/${exitId}/complete`)
    .set("Authorization", `Bearer ${token}`)
    .send({ asset_returned: true, fnf_completed: true });

  assert.equal(complete.statusCode, 200);
  assert.equal(complete.body.data.exit_status, "Completed");
});

test.after(async () => {
  await sequelize.close();
});
