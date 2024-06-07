export interface Clock {
  id: string;
  date_time: Date;
  employee_id: string;
  status: string;
  note: string | null;
  location: string | null;
}
