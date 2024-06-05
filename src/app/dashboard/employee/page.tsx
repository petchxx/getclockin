import React from "react";
import EmployeePage from "~/app/_components/dashboard/employee/EmployeePage";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page() {
  const employee = await api.employee.getAll();
  return <EmployeePage employees={employee} />;
}
