# 🕒 ClockIn

ClockIn is a comprehensive employee time-tracking and management solution. This platform helps businesses streamline attendance, work hours, and employee activity while offering an intuitive interface for admins to manage their teams effectively.

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
![Clock In/Out](public/img/clockin.jpg)

#### Work History
![Work History](public/img/workhistory.jpg)

#### Request Time Adjustment
![Request Adjustment](public/img/requestadjustment.jpg)

### Admin (Manager/Owner)
#### Dashboard Overview
![Admin Dashboard](public/img/admindashboard.jpg)

#### Manage Time Entries
![Manage Entries](public/img/manageentries.jpg)

#### Reports
![Reports](public/img/reports.jpg)

## 🛠️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/clockin.git
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
