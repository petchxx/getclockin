import { redirect } from "next/navigation";
import React from "react";
import OvertimePage from "~/app/_components/dashboard/OvertimePage";
import { type Company } from "~/lib/interface/company";
import { type Overtime } from "~/lib/interface/overtime";
import { api } from "~/trpc/server";

export default async function page() {
  const overtime = await api.company.getAllOvertimes();
  const company = (await api.company.get()) as Company;
  if (!company.permissions.isLeaveOt) {
    return redirect("/dashboard");
  }

  return <OvertimePage overtimes={overtime as Overtime[]} />;
}
