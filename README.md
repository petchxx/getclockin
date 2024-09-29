# 🕒 ClockIn

ClockIn is a comprehensive employee time-tracking and management solution. This platform helps businesses streamline attendance, work hours, and employee activity while offering an intuitive interface for admins to manage their teams effectively.
## 👾 Team Members

- Panuphong Burakitphachai (6410521)
- Nitipoom Aumpitak (6420061)
- Phawat Thanajiranon (6413056)

## 🚀 Features

### User (Employee)

- ⏲️ **Clock In/Out**: Log work hours, note and location with a simple clock-in and clock-out system.
- 📊 **Work History**: View detailed history of logged hours and work sessions.
- 📝 **Request Leave or OT**: Submit requests for leave or overtime work.
- 🔔 **Notifications**: Receive notifications for clock-ins via line notify.

### Company (Manager/HR)

- 📅 **View Employee Attendance**: Track the work hours of all employees in real-time.
- 🛠️ **Manage Employee**: Add, edit, or remove employee entries.
- 🔄 **Approve/Reject Time Leave or OT Requests**: Review employee requests for leave or overtime work and take appropriate action.
- 📈 **Reports**: Generate detailed reports on employee attendance and hours worked for payroll and performance tracking.
- 💳 **Manage Plan**: Create, update, remove subsciption.

## 🗂️ Data Models

| Model                | Attributes                                                                                  |
|----------------------|---------------------------------------------------------------------------------------------|
| **Company**          | `id`, `name`, `email`, `password`, `app_password`, `line_token`, `status`, `is_trial`, `stripe_customer_id`, `stripe_subscription_id`, `permissions`, `created_at` |
| **Employee**         | `id`, `company_id`, `email`, `name`, `phone`, `role`, `start_time`, `stop_time`, `status`, `salary`, `off_days`, `is_trial`, `created_at` |
| **Clock**            | `id`, `date_time`, `employee_id`, `status`, `note`, `location`, `created_at`              |
| **Leave**            | `id`, `employee_id`, `leave_type`, `from`, `to`, `status`, `note`, `created_at`           |
| **Overtime**         | `id`, `employee_id`, `date`, `from`, `to`, `status`, `note`, `created_at`                 |

## 📸 Screenshots

### User (Employee)

#### Clock In/Out

![Clock In/Out](preview-images/employee-clockin.png)

#### Day off

![Day Off](preview-images/employee-day-off.png)

#### Overtime

![Overtime](preview-images/employee-overtime.png)

#### Settings

![Settings](preview-images/employee-setting.png)

### Admin (Manager/Owner)

![Company Register](preview-images/company-register.png)

### Package

![Packages](preview-images/company-package.png)

#### Dashboard Overview

![Dashboard](preview-images/company-dashboard.png)

### Add Employee

![Manage Employee](preview-images/company-add-employee.png)

#### Manage Employees

![Manage Employee](preview-images/company-employees.png)

#### Report

![Reports](preview-images/company-employee-report.png)

#### Day Off

![Day Off](preview-images/company-day-off.png)

#### Overtime

![Over time](preview-images/company-overtime.png)


## Video Demo

[![Watch the video](preview-images/landing-page.png)](https://youtu.be/K1wbP-nqTNo)

## 🛠️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/petchxx/clockin.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up the environment variables**:
   Create a `.env` file in the root directory and add the necessary environment variables for your database, API keys, etc.
5. **Run the development server**:
   ```bash
   npm run dev
   ```
6. **Access the application**:
   Open your browser and go to `http://localhost:3000`.

