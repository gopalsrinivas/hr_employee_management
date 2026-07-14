import {
  FiActivity,
  FiArchive,
  FiBarChart2,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiHome,
  FiLayers,
  FiLogOut,
  FiSettings,
  FiShield,
  FiUserCheck,
  FiUsers
} from "react-icons/fi";

export const roles = {
  ADMIN: "admin",
  HR: "hr",
  EMPLOYEE: "employee"
};

export const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: FiHome, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Roles", href: "/roles", icon: FiShield, roles: [roles.ADMIN] },
  { label: "Users", href: "/users", icon: FiUsers, roles: [roles.ADMIN] },
  { label: "Departments", href: "/departments", icon: FiGrid, roles: [roles.ADMIN, roles.HR] },
  { label: "Designations", href: "/designations", icon: FiBriefcase, roles: [roles.ADMIN, roles.HR] },
  { label: "Employees", href: "/employees", icon: FiUserCheck, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Attendance", href: "/attendance", icon: FiCalendar, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Leave Requests", href: "/leave-requests", icon: FiActivity, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Payroll", href: "/payroll", icon: FiDollarSign, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Documents", href: "/employee-documents", icon: FiFileText, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Onboarding", href: "/onboarding", icon: FiLayers, roles: [roles.ADMIN, roles.HR] },
  { label: "Employee Exit", href: "/employee-exits", icon: FiLogOut, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] },
  { label: "Reports", href: "/reports", icon: FiBarChart2, roles: [roles.ADMIN, roles.HR] },
  { label: "Settings", href: "/settings", icon: FiSettings, roles: [roles.ADMIN, roles.HR, roles.EMPLOYEE] }
];

export const secondaryNavigation = [{ label: "API Health", href: "/settings", icon: FiArchive, roles: [roles.ADMIN, roles.HR] }];
