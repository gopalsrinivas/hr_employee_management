import {
  FiCheck,
  FiClock,
  FiFilePlus,
  FiLogIn,
  FiLogOut,
  FiThumbsDown,
  FiThumbsUp
} from "react-icons/fi";
import { formatCurrency, formatDate, getRecordName } from "../utils/formatters";

const text = (name, label, required = false, extra = {}) => ({ name, label, type: "text", required, ...extra });
const number = (name, label, required = false) => ({ name, label, type: "number", required });
const date = (name, label, required = false) => ({ name, label, type: "date", required });
const bool = (name, label) => ({ name, label, type: "checkbox" });
const textarea = (name, label) => ({ name, label, type: "textarea" });
const lookup = (name, label, lookupKey, required = false) => ({ name, label, type: "select", lookup: lookupKey, required });

const employeeLabel = (record) =>
  record ? `${record.employee_code ? `${record.employee_code} - ` : ""}${getRecordName(record)}` : "-";

const commonLookups = {
  roles: { endpoint: "/roles", label: (record) => record.name, activeOnly: true },
  departments: { endpoint: "/departments", label: (record) => record.department_name, activeOnly: true },
  designations: { endpoint: "/designations", label: (record) => record.designation_name, activeOnly: true },
  employees: { endpoint: "/employees", label: employeeLabel, activeOnly: true }
};

export const moduleConfigs = {
  roles: {
    title: "Roles",
    description: "Manage system roles used by authentication and authorization.",
    endpoint: "/roles",
    createLabel: "Create Role",
    permissions: { create: ["admin"], edit: ["admin"], delete: ["admin"] },
    columns: [
      { key: "id", label: "ID", sortable: true },
      { key: "name", label: "Role", sortable: true },
      { key: "created_at", label: "Created", sortable: true, render: (row) => formatDate(row.created_at) }
    ],
    fields: [text("name", "Role name", true, { placeholder: "HR" })],
    filters: [text("name", "Role name")]
  },
  users: {
    title: "Users",
    description: "Create application users and map them to roles.",
    endpoint: "/users",
    createLabel: "Create User",
    permissions: { create: ["admin"], edit: ["admin"], delete: ["admin"] },
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "role_id", label: "Role", sortable: true, render: (row) => row.Role?.name || row.role?.name || row.role_id },
      { key: "is_active", label: "Status", type: "status", render: (row) => row.is_active }
    ],
    fields: [
      text("name", "Full name", true),
      text("email", "Email", true, { inputType: "email" }),
      text("password", "Password", true, { inputType: "password", createOnly: true }),
      lookup("role_id", "Role", "roles", true),
      bool("is_active", "Active user")
    ],
    filters: [lookup("role_id", "Role", "roles")],
    lookups: { roles: commonLookups.roles }
  },
  departments: {
    title: "Departments",
    description: "Structure teams and business units for HR reporting.",
    endpoint: "/departments",
    createLabel: "Create Department",
    permissions: { create: ["admin"], edit: ["admin"], delete: ["admin"] },
    columns: [
      { key: "department_name", label: "Department", sortable: true },
      { key: "description", label: "Description" },
      { key: "status", label: "Status", type: "status", render: (row) => row.status }
    ],
    fields: [text("department_name", "Department name", true), textarea("description", "Description"), bool("status", "Active")],
    filters: [{ name: "status", label: "Status", type: "select", options: [{ value: "true", label: "Active" }, { value: "false", label: "Inactive" }] }]
  },
  designations: {
    title: "Designations",
    description: "Maintain role titles within each department.",
    endpoint: "/designations",
    createLabel: "Create Designation",
    permissions: { create: ["admin"], edit: ["admin"], delete: ["admin"] },
    columns: [
      { key: "designation_name", label: "Designation", sortable: true },
      { key: "department_id", label: "Department", sortable: true, render: (row) => row.department?.department_name || row.department_id },
      { key: "status", label: "Status", type: "status", render: (row) => row.status }
    ],
    fields: [
      lookup("department_id", "Department", "departments", true),
      text("designation_name", "Designation name", true),
      textarea("description", "Description"),
      bool("status", "Active")
    ],
    filters: [lookup("department_id", "Department", "departments")],
    lookups: { departments: commonLookups.departments }
  },
  employees: {
    title: "Employees",
    description: "Employee master records with department, designation, manager, and salary details.",
    endpoint: "/employees",
    createLabel: "Create Employee",
    permissions: { create: ["admin", "hr"], edit: ["admin", "hr"], delete: ["admin", "hr"] },
    columns: [
      { key: "employee_code", label: "Code", sortable: true },
      { key: "name", label: "Employee", sortable: false, render: getRecordName },
      { key: "email", label: "Email", sortable: true },
      { key: "department_id", label: "Department", sortable: true, render: (row) => row.department?.department_name || row.department_id },
      { key: "joining_date", label: "Joining", sortable: true, render: (row) => formatDate(row.joining_date) },
      { key: "status", label: "Status", type: "status" }
    ],
    fields: [
      text("employee_code", "Employee code", false, {
        placeholder: "Generating employee code...",
        readOnly: true,
        submit: false
      }),
      text("first_name", "First name", true),
      text("last_name", "Last name", true),
      { name: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      date("dob", "Date of birth"),
      text("email", "Email", true, { inputType: "email" }),
      text("mobile", "Mobile"),
      date("joining_date", "Joining date", true),
      lookup("department_id", "Department", "departments", true),
      lookup("designation_id", "Designation", "designations", true),
      lookup("manager_id", "Manager", "employees"),
      number("salary", "Salary"),
      { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Notice Period", "Exited"] }
    ],
    filters: [
      lookup("department_id", "Department", "departments"),
      lookup("designation_id", "Designation", "designations"),
      { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Notice Period", "Exited"] }
    ],
    lookups: {
      departments: commonLookups.departments,
      designations: commonLookups.designations,
      employees: commonLookups.employees
    },
    generatedFields: [{ name: "employee_code", endpoint: "/employees/next-code" }]
  },
  attendance: {
    title: "Attendance",
    description: "Daily attendance, check-ins, check-outs, and employee history.",
    endpoint: "/attendance",
    createLabel: "Manual Check In",
    permissions: { create: ["admin", "hr", "employee"], edit: [], delete: [] },
    createEndpoint: "/attendance/check-in",
    columns: [
      { key: "employee_id", label: "Employee", sortable: true, render: (row) => employeeLabel(row.employee) || row.employee_id },
      { key: "attendance_date", label: "Date", sortable: true, render: (row) => formatDate(row.attendance_date) },
      { key: "check_in", label: "Check In" },
      { key: "check_out", label: "Check Out" },
      { key: "working_hours", label: "Hours", sortable: true },
      { key: "status", label: "Status", type: "status" }
    ],
    fields: [lookup("employee_id", "Employee", "employees"), date("attendance_date", "Attendance date"), text("check_in", "Check in time", true, { inputType: "time" })],
    filters: [lookup("employee_id", "Employee", "employees"), date("attendance_date", "Date")],
    lookups: { employees: commonLookups.employees },
    rowActions: [
      {
        label: "Check out",
        icon: FiLogOut,
        method: "post",
        endpoint: "/attendance/check-out",
        payload: (row) => ({ employee_id: row.employee_id, attendance_date: row.attendance_date, check_out: new Date().toTimeString().slice(0, 5) })
      }
    ],
    quickActions: [
      { label: "Check In Now", icon: FiLogIn, endpoint: "/attendance/check-in", method: "post", payload: () => ({ check_in: new Date().toTimeString().slice(0, 5) }) },
      { label: "Check Out Now", icon: FiLogOut, endpoint: "/attendance/check-out", method: "post", payload: () => ({ check_out: new Date().toTimeString().slice(0, 5) }) }
    ]
  },
  "leave-requests": {
    title: "Leave Requests",
    description: "Apply, approve, reject, and review leave workflows.",
    endpoint: "/leave-requests",
    createLabel: "Apply Leave",
    permissions: { create: ["admin", "hr", "employee"], edit: [], delete: [] },
    columns: [
      { key: "employee_id", label: "Employee", sortable: true, render: (row) => employeeLabel(row.employee) || row.employee_id },
      { key: "leave_type", label: "Type", sortable: true },
      { key: "from_date", label: "From", sortable: true, render: (row) => formatDate(row.from_date) },
      { key: "to_date", label: "To", sortable: true, render: (row) => formatDate(row.to_date) },
      { key: "total_days", label: "Days", sortable: true },
      { key: "status", label: "Status", type: "status" }
    ],
    fields: [
      lookup("employee_id", "Employee", "employees"),
      { name: "leave_type", label: "Leave type", type: "select", required: true, options: ["Casual", "Sick", "Earned", "Unpaid"] },
      date("from_date", "From date", true),
      date("to_date", "To date", true),
      textarea("reason", "Reason")
    ],
    filters: [lookup("employee_id", "Employee", "employees"), { name: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] }],
    lookups: { employees: commonLookups.employees },
    rowActions: [
      { label: "Approve", icon: FiThumbsUp, endpoint: (row) => `/leave-requests/${row.id}/approve`, roles: ["admin", "hr"] },
      { label: "Reject", icon: FiThumbsDown, endpoint: (row) => `/leave-requests/${row.id}/reject`, roles: ["admin", "hr"] }
    ]
  },
  payroll: {
    title: "Payroll",
    description: "Generate salary records and track payroll status.",
    endpoint: "/payroll",
    createLabel: "Generate Payroll",
    permissions: { create: ["admin", "hr"], edit: ["admin", "hr"], delete: [] },
    columns: [
      { key: "employee_id", label: "Employee", sortable: true, render: (row) => employeeLabel(row.employee) || row.employee_id },
      { key: "payroll_month", label: "Month", sortable: true },
      { key: "payroll_year", label: "Year", sortable: true },
      { key: "basic_salary", label: "Basic", sortable: true, render: (row) => formatCurrency(row.basic_salary) },
      { key: "net_salary", label: "Net", sortable: true, render: (row) => formatCurrency(row.net_salary) },
      { key: "salary_status", label: "Status", type: "status" }
    ],
    fields: [
      lookup("employee_id", "Employee", "employees", true),
      text("payroll_month", "Payroll month", true, { placeholder: "July" }),
      number("payroll_year", "Payroll year", true),
      number("basic_salary", "Basic salary", true),
      number("hra", "HRA"),
      number("da", "DA"),
      number("bonus", "Bonus"),
      number("incentives", "Incentives"),
      number("pf", "PF"),
      number("esi", "ESI"),
      number("tax", "Tax"),
      number("deductions", "Deductions")
    ],
    filters: [lookup("employee_id", "Employee", "employees"), number("payroll_year", "Payroll year"), text("payroll_month", "Payroll month")],
    lookups: { employees: commonLookups.employees }
  },
  "employee-documents": {
    title: "Employee Documents",
    description: "Upload, review, and manage employee documents.",
    endpoint: "/employee-documents",
    createLabel: "Upload Document",
    isMultipart: true,
    permissions: { create: ["admin", "hr", "employee"], edit: [], delete: ["admin", "hr", "employee"] },
    columns: [
      { key: "employee_id", label: "Employee", sortable: true, render: (row) => employeeLabel(row.employee) || row.employee_id },
      { key: "document_type", label: "Type", sortable: true },
      { key: "document_number", label: "Number" },
      { key: "original_name", label: "File" },
      { key: "uploaded_at", label: "Uploaded", sortable: true, render: (row) => formatDate(row.uploaded_at) }
    ],
    fields: [lookup("employee_id", "Employee", "employees"), text("document_type", "Document type", true), text("document_number", "Document number"), { name: "file", label: "File", type: "file", required: true }],
    filters: [lookup("employee_id", "Employee", "employees"), text("document_type", "Document type")],
    lookups: { employees: commonLookups.employees }
  },
  onboarding: {
    title: "Onboarding",
    description: "Track joining tasks from document verification to welcome kit.",
    endpoint: "/onboarding",
    createLabel: "Start Onboarding",
    updateMethod: "patch",
    permissions: { create: ["admin", "hr"], edit: ["admin", "hr"], delete: [] },
    columns: [
      { key: "employee_id", label: "Employee", sortable: true, render: (row) => employeeLabel(row.employee) || row.employee_id },
      { key: "joining_date", label: "Joining", sortable: true, render: (row) => formatDate(row.joining_date) },
      { key: "documents_verified", label: "Docs", type: "status", render: (row) => row.documents_verified },
      { key: "laptop_allocated", label: "Laptop", type: "status", render: (row) => row.laptop_allocated },
      { key: "onboarding_status", label: "Status", type: "status" }
    ],
    fields: [
      lookup("employee_id", "Employee", "employees", true),
      date("joining_date", "Joining date", true),
      bool("documents_verified", "Documents verified"),
      bool("induction_completed", "Induction completed"),
      bool("laptop_allocated", "Laptop allocated"),
      bool("email_created", "Email created"),
      bool("id_card_generated", "ID card generated"),
      bool("welcome_kit_issued", "Welcome kit issued")
    ],
    filters: [lookup("employee_id", "Employee", "employees"), { name: "onboarding_status", label: "Status", type: "select", options: ["Pending", "Completed"] }],
    lookups: { employees: commonLookups.employees },
    rowActions: [{ label: "Complete", icon: FiCheck, endpoint: (row) => `/onboarding/${row.id}/complete`, roles: ["admin", "hr"] }]
  },
  "employee-exits": {
    title: "Employee Exit",
    description: "Manage resignation, approvals, asset return, and final settlement.",
    endpoint: "/employee-exits",
    createLabel: "Create Exit Request",
    permissions: { create: ["admin", "hr", "employee"], edit: [], delete: [] },
    columns: [
      { key: "employee_id", label: "Employee", sortable: true, render: (row) => employeeLabel(row.employee) || row.employee_id },
      { key: "resignation_date", label: "Resignation", sortable: true, render: (row) => formatDate(row.resignation_date) },
      { key: "last_working_day", label: "Last Day", sortable: true, render: (row) => formatDate(row.last_working_day) },
      { key: "manager_approval", label: "Manager", type: "status", render: (row) => row.manager_approval },
      { key: "hr_approval", label: "HR", type: "status", render: (row) => row.hr_approval },
      { key: "exit_status", label: "Status", type: "status" }
    ],
    fields: [lookup("employee_id", "Employee", "employees"), date("resignation_date", "Resignation date", true), date("last_working_day", "Last working day", true), textarea("reason", "Reason")],
    filters: [lookup("employee_id", "Employee", "employees"), { name: "exit_status", label: "Status", type: "select", options: ["Pending", "Completed"] }],
    lookups: { employees: commonLookups.employees },
    rowActions: [
      { label: "Manager approval", icon: FiThumbsUp, endpoint: (row) => `/employee-exits/${row.id}/manager-approval`, payload: { manager_approval: true }, roles: ["admin", "hr"] },
      { label: "HR approval", icon: FiFilePlus, endpoint: (row) => `/employee-exits/${row.id}/hr-approval`, payload: { hr_approval: true }, roles: ["admin", "hr"] },
      { label: "Complete", icon: FiCheck, endpoint: (row) => `/employee-exits/${row.id}/complete`, payload: { asset_returned: true, fnf_completed: true }, roles: ["admin", "hr"] }
    ]
  }
};

export const dashboardEndpoints = ["/dashboard/summary", "/dashboard/department-summary", "/dashboard/attendance-summary", "/dashboard/leave-summary"];

export const reportCards = [
  { title: "Summary Report", endpoint: "/reports/summary", icon: FiClock },
  { title: "Employee Report", endpoint: "/reports/employees", icon: FiFilePlus },
  { title: "Attendance Report", endpoint: "/reports/attendance", icon: FiLogIn },
  { title: "Leave Report", endpoint: "/reports/leaves", icon: FiThumbsUp },
  { title: "Payroll Report", endpoint: "/reports/payroll", icon: FiFilePlus }
];
