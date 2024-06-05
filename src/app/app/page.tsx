import React from "react";
import { api } from "~/trpc/server";
import HomePage from "../_components/app/HomePage";
import { Employee } from "~/lib/interface/employee";

export default async function page() {
  const employee = await api.employee.get();
  if (!employee) return null;
  return <HomePage employee={employee as Employee} />;
}
