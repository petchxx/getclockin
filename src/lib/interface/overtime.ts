import { type Employee } from "./employee";

export interface Overtime {
  id: string;
  employee_id: string;
  date: Date;
  from: string;
  to: string;
  status: string;
  note: string | null;
  employeeName: string;
  employeeEmail: string;
  employeeId: string;
}
