import React from "react";
import { api } from "~/trpc/server";
import HomePage from "../_components/app/home/HomePage";
import { type Employee } from "~/lib/interface/employee";
import BottomBar from "../_components/app/BottomBar";

export default async function page() {
  const employee = await api.employee.get();
  if (!employee) return null;
  return (
    <div>
      <HomePage employee={employee as Employee} />
      <BottomBar />
    </div>
  );
}
