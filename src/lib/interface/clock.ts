export interface Clock {
  id: string;
  date_time: Date;
  employee_id: string;
  status: string;
  note: string | null;
  location: string | null;
}

export interface History {
  employee_id: string;
  status: "present" | "absent" | "offday";
  date: Date;
  in_date_time: Date | null;
  out_date_time: Date | null;
  in_note: string | null;
  out_note: string | null;
  in_location: string | null;
  out_location: string | null;
}

// mixedData.push({
//   in_id: entry.id,
//   in_date_time: entry.date_time,
//   company_id: entry.company_id,
//   employee_id: entry.employee_id,
//   in_note: entry.note,
//   in_location: entry.location,
//   in_created_at: entry.created_at,
//   out_id: outEntry ? outEntry.id : null,
//   out_date_time: outEntry ? outEntry.date_time : null,
//   out_note: outEntry ? outEntry.note : null,
//   out_location: outEntry ? outEntry.location : null,
//   out_created_at: outEntry ? outEntry.created_at : null,
// });
//
