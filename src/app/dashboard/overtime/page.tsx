import React from "react";
import OvertimePage from "~/app/_components/dashboard/OvertimePage";
import { type Overtime } from "~/lib/interface/overtime";
import { api } from "~/trpc/server";

export default async function page() {
  const overtime = await api.company.getAllOvertimes();
  return <OvertimePage overtimes={overtime as Overtime[]} />;
}
