import { redirect } from "next/navigation";
import React from "react";
import LeavePage from "~/app/_components/dashboard/LeavePage";
import { type Company } from "~/lib/interface/company";
import { api } from "~/trpc/server";

export default async function page() {
  const leaves = await api.company.getAllLeaves();
  const company = (await api.company.get()) as Company;
  if (!company.permissions.isLeaveOt) {
    return redirect("/dashboard");
  }
  return <LeavePage leaves={leaves} />;
}
