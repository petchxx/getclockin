import { Employee } from "./employee";

export interface Leave {
  id: string;
  employee_id: string;
  leave_type: string;
  from: Date;
  to: Date;
  status: string;
  note: string | null;
}

export interface LeaveObject {
  leave: Leave;
  employee: Employee;
}
