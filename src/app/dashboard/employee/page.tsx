import React from "react";
import EmployeePage from "~/app/_components/dashboard/employee/EmployeePage";
import { type Company } from "~/lib/interface/company";
import { type Employee } from "~/lib/interface/employee";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page() {
  const employee = await api.employee.getAll();
  return <EmployeePage employees={employee as Employee[]} />;
}
