# HR Employee Management System

# Part-4 – Frontend Architecture

---

# 1. Frontend Overview

The frontend of the HR Employee Management System provides a modern, responsive, and user-friendly interface for HR users, administrators, and employees.

The frontend communicates with the backend using REST APIs.

Technology Used

- Next.js
- React.js
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast

---

# 2. Frontend Objectives

The frontend should

- Be responsive.
- Be easy to use.
- Load quickly.
- Consume REST APIs.
- Handle authentication.
- Validate forms.
- Display reports.
- Support future enhancements.

---

# 3. Frontend Technology Stack

| Technology | Purpose |
|------------|----------|
| Next.js | React Framework |
| React.js | UI Development |
| Tailwind CSS | Styling |
| Axios | API Communication |
| React Hook Form | Forms |
| React Hot Toast | Notifications |
| JWT Decode | Authentication |
| React Icons | Icons |

---

# 4. Frontend Folder Structure

```text
frontend/

│

├── public/

│

├── src/

│   ├── app/

│   ├── pages/

│   ├── layouts/

│   ├── components/

│   ├── modules/

│   ├── services/

│   ├── hooks/

│   ├── contexts/

│   ├── utils/

│   ├── constants/

│   ├── validations/

│   ├── assets/

│   ├── styles/

│   ├── types/

│   ├── middleware/

│   └── config/

│

├── package.json

├── tailwind.config.js

├── next.config.js

└── .env.local
```

---

# 5. Folder Responsibilities

## app/

Contains App Router files.

---

## pages/

Contains application pages.

Examples

- Login
- Dashboard
- Employees
- Attendance
- Payroll

---

## layouts/

Contains common layouts.

Examples

- Admin Layout
- HR Layout
- Employee Layout
- Authentication Layout

---

## components/

Reusable UI Components.

Examples

- Button
- Table
- Card
- Modal
- Loader
- Pagination
- Sidebar
- Navbar
- Input

---

## modules/

Business modules.

Examples

```
employee/

attendance/

leave/

payroll/

dashboard/
```

---

## services/

API calls.

Example

```
employeeService.js

leaveService.js

authService.js
```

---

## hooks/

Custom React Hooks.

Examples

```
useAuth()

usePagination()

useDebounce()
```

---

## contexts/

React Context API.

Examples

```
AuthContext

ThemeContext
```

---

## validations/

Frontend validations.

Examples

```
loginValidation

employeeValidation

leaveValidation
```

---

## assets/

Images

Icons

Fonts

Logos

---

## styles/

Global CSS

Tailwind styles

Theme styles

---

## utils/

Common helper functions.

Examples

```
formatDate()

formatCurrency()

downloadFile()
```

---

# 6. Frontend Architecture

```
Browser

↓

Next.js Pages

↓

Reusable Components

↓

API Services

↓

Axios

↓

REST API

↓

Backend
```

---

# 7. Page Structure

Each page should contain

```
Page

↓

Components

↓

API Service

↓

Backend
```

Business logic should not be written inside UI components.

---

# 8. Layout Structure

The application should have multiple layouts.

Authentication Layout

```
Login

Forgot Password
```

---

Admin Layout

```
Sidebar

Navbar

Content

Footer
```

---

Employee Layout

```
Sidebar

Header

Content
```

---

# 9. Reusable Components

Create reusable components for

```
Button

Input

Textarea

Dropdown

Table

Pagination

Loader

Spinner

Modal

Alert

Badge

Card

Search Box

Date Picker

Confirmation Dialog
```

Advantages

- Reusable
- Easy Maintenance
- Less Duplicate Code

---

# 10. Routing Structure

```
/

↓

Login

↓

Dashboard

↓

Employees

↓

Attendance

↓

Leave

↓

Payroll

↓

Documents

↓

Onboarding

↓

Employee Exit

↓

Reports

↓

Settings
```

---

# 11. Authentication Flow

```
Login Page

↓

Submit Credentials

↓

Login API

↓

JWT Token

↓

Store Token

↓

Redirect Dashboard
```

JWT Token should be stored securely.

Logout should remove

- JWT Token
- User Information

from browser storage.

---

# 12. Protected Routes

Protected Pages

```
Dashboard

Employees

Attendance

Leave

Payroll

Reports

Settings
```

Public Pages

```
Login

Forgot Password
```

Users without valid JWT should automatically redirect to Login.

---

# 13. API Communication

Use Axios.

Create one reusable Axios instance.

Responsibilities

- Base URL
- Authorization Header
- Timeout
- Error Handling

Every API should use this common Axios instance.

---

# 14. State Management

Use React Context API.

Contexts

```
Authentication

Theme

Loading
```

Avoid unnecessary global state.

Keep component state local whenever possible.

---

# 15. Form Handling

Use

```
React Hook Form
```

Every form should have

- Validation
- Error Messages
- Loading Button
- Success Toast
- Error Toast

Examples

- Login
- Employee
- Leave
- Department
- Payroll

---

# Part-4B Preview

Next section includes

- Dashboard UI
- Tables
- Pagination
- Search
- Filters
- Forms
- Toast Notifications
- Loading Screens
- Error Pages
- UI Standards
- Responsive Design
- Frontend Best Practices
- Performance Optimization
- Frontend Development Checklist
- Codex Instructions

---

# 16. Dashboard UI

The Dashboard is the first screen displayed after a successful login.

It provides a quick overview of the HR system.

---

## Dashboard Widgets

```
Total Employees

Present Employees

Absent Employees

Departments

Pending Leaves

Today's Birthdays

New Joiners

Employees Exiting

Payroll Processed
```

---

## Dashboard Charts

Recommended Charts

```
Employee Count by Department

Monthly Attendance

Monthly Leave Statistics

Payroll Summary

Joining Trend

Employee Status
```

Charts can be implemented using

- Chart.js
- Recharts

---

# 17. Employee List Screen

The Employee List page should support the following features.

---

## Search

Search by

```
Employee Code

Employee Name

Email

Mobile Number
```

---

## Filters

```
Department

Designation

Status

Joining Date

Manager
```

---

## Sorting

```
Employee Name

Employee Code

Department

Joining Date

Salary
```

---

## Pagination

Support pagination.

```
10 Records

25 Records

50 Records

100 Records
```

---

## Actions

Each employee row should support

```
View

Edit

Delete

Documents

Attendance

Leave History

Payroll History
```

---

# 18. Form Standards

Every form should follow the same design.

Form Layout

```
Header

↓

Input Fields

↓

Validation Messages

↓

Submit Button

↓

Cancel Button
```

---

## Form Validation

Required Fields

Display validation immediately.

Example

```
Employee Name Required

Email Required

Department Required

Salary Required
```

---

## Submit Button

While submitting

```
Disable Button

↓

Show Loader

↓

Call API

↓

Enable Button
```

---

# 19. Toast Notifications

Display toast notifications after every important action.

Examples

```
Employee Created Successfully

Employee Updated Successfully

Employee Deleted Successfully

Leave Approved Successfully

Payroll Generated Successfully
```

---

Error Messages

```
Login Failed

Validation Failed

Network Error

Internal Server Error
```

---

# 20. Loading Screens

Whenever data is loading,

Display

```
Loader

Spinner

Skeleton Screen
```

Avoid blank pages.

---

# 21. Error Pages

Create common error pages.

```
401 Unauthorized

403 Forbidden

404 Page Not Found

500 Internal Server Error
```

---

# 22. Empty States

When no data exists,

Display friendly messages.

Examples

```
No Employees Found

No Attendance Available

No Leave Requests

No Payroll Records
```

---

# 23. Responsive Design

The application should support

```
Desktop

Laptop

Tablet

Mobile
```

Tailwind CSS breakpoints

```
sm

md

lg

xl

2xl
```

---

# 24. UI Design Standards

Use consistent spacing.

Recommended spacing

```
Padding

16px

24px

32px
```

---

Buttons

```
Primary

Secondary

Danger

Success
```

---

Cards

```
Rounded Corners

Shadow

Padding

Responsive Width
```

---

Tables

```
Sticky Header

Hover Effect

Pagination

Sorting

Filtering
```

---

# 25. Frontend Performance Best Practices

Follow these best practices.

- Lazy load pages.
- Lazy load components.
- Reuse components.
- Avoid unnecessary re-renders.
- Debounce search.
- Cache API responses where appropriate.
- Optimize images.
- Minimize bundle size.
- Use pagination.
- Avoid duplicate API requests.

---

# 26. Frontend Security Best Practices

- Never store passwords.
- Store only JWT token.
- Validate all forms.
- Escape user input.
- Hide sensitive information.
- Remove expired JWT automatically.
- Logout on token expiration.
- Restrict unauthorized pages.

---

# 27. Frontend Development Checklist

Authentication

- Login
- Logout
- Protected Routes

Dashboard

- Summary Cards
- Charts

Employee

- CRUD
- Search
- Filters
- Pagination

Attendance

- CRUD

Leave

- CRUD

Payroll

- CRUD

Documents

- Upload

Download

Onboarding

Employee Exit

Reports

Settings

Responsive Design

Toast Notifications

Loading Screens

Error Pages

---

# 28. Acceptance Criteria

Frontend development is considered complete when:

- All pages are responsive.
- Authentication works correctly.
- Protected routes are implemented.
- Forms are validated.
- API integration is complete.
- CRUD operations work successfully.
- Dashboard displays real-time data.
- Search, filtering, and pagination work correctly.
- Toast notifications are displayed.
- Loading indicators are implemented.
- Error pages are available.

---

# 29. Codex Development Instructions

Implement the frontend module-by-module.

Rules

- Use Next.js App Router.
- Use React Functional Components.
- Use Tailwind CSS.
- Use Axios for API calls.
- Use React Hook Form for forms.
- Use Context API for Authentication.
- Create reusable UI components.
- Use protected routes.
- Keep business logic out of UI components.
- Maintain consistent UI design.
- Follow responsive design principles.
- Generate production-ready code.

---

# Part-5 Preview

The next document is **Part-5 – HR Modules**, which includes

- Authentication Module
- Dashboard Module
- Employee Module
- Department Module
- Designation Module
- Attendance Module
- Leave Module
- Payroll Module
- Employee Documents Module
- Onboarding Module
- Employee Exit Module
- Reports Module
- Settings Module
- API Summary
- Development Roadmap
- Final Codex Instructions