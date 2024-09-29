# 🕒 ClockIn

ClockIn is a comprehensive employee time-tracking and management solution. This platform helps businesses streamline attendance, work hours, and employee activity while offering an intuitive interface for admins to manage their teams effectively.

## 🚀 Features

### User (Employee)
- ⏲️ **Clock In/Out**: Log work hours with a simple clock-in and clock-out system.
- 📊 **Work History**: View detailed history of logged hours and work sessions.
- 📝 **Request Adjustments**: Submit requests for time adjustments if work hours were logged incorrectly.
- 🔔 **Notifications**: Receive notifications for clock-ins, reminders, and work status updates.
  
### Admin (Manager/Owner)
- 📅 **View Employee Attendance**: Track the work hours of all employees in real-time.
- 🛠️ **Manage Time Entries**: Add, edit, or remove clock-in/clock-out entries for employees.
- 🔄 **Approve/Reject Time Adjustment Requests**: Review employee requests for time adjustments and take appropriate action.
- 📈 **Reports**: Generate detailed reports on employee attendance and hours worked for payroll and performance tracking.

## 🗂️ Data Models

| Model                | Attributes                                                                                  |
|----------------------|---------------------------------------------------------------------------------------------|
| **User**             | `id`, `name`, `email`, `role`, `emailVerified`, `password`, `workEntries`, `createdAt`, `updatedAt` |
| **WorkEntry**        | `id`, `clockInTime`, `clockOutTime`, `status`, `adjustmentRequest`, `userId`, `createdAt`, `updatedAt` |
| **AdjustmentRequest** | `id`, `userId`, `workEntryId`, `requestedChange`, `status`, `createdAt`, `updatedAt`        |

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
4. **Run the development server**:
   ```bash
  npm run dev
   ```
5. **Access the application**:
   Open your browser and go to `http://localhost:3000`.
