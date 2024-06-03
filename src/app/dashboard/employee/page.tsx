import React from "react";
import EmployeePage from "~/app/_components/dashboard/employee/EmployeePage";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type Props = {};

export default async function page({}: Props) {
  const session = await getServerAuthSession();
  const employee = await api.employee.get({ id: session?.user.id ?? "" });
  return <EmployeePage employees={employee} />;
}
