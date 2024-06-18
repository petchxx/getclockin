export interface Leave {
  id: string;
  employee_id: string;
  leave_type: string;
  from: Date;
  to: Date;
  status: string;
  note: string | null;
  employeeName: string;
  employeeEmail: string;
  employeeId: string;
}

export interface AppLeave {
  id: string;
  employee_id: string;
  leave_type: string;
  from: Date;
  to: Date;
  status: string;
  note: string | null;
}
