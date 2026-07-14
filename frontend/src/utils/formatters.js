export const toTitle = (value = "") =>
  String(value)
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

export const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

export const getRecordName = (record) => {
  if (!record) return "-";
  if (record.name) return record.name;
  if (record.department_name) return record.department_name;
  if (record.designation_name) return record.designation_name;
  if (record.first_name || record.last_name) return `${record.first_name || ""} ${record.last_name || ""}`.trim();
  if (record.employee?.first_name || record.employee?.last_name) {
    return `${record.employee.first_name || ""} ${record.employee.last_name || ""}`.trim();
  }
  return `#${record.id}`;
};

export const normalizeRole = (user) =>
  String(user?.role?.name || user?.Role?.name || user?.role || "")
    .trim()
    .toLowerCase();
