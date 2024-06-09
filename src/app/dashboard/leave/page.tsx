import React from "react";
import LeavePage from "~/app/_components/dashboard/LeavePage";
import { api } from "~/trpc/server";

export default async function page() {
  const leaves = await api.company.getAllLeaves();
  return <LeavePage leaves={leaves} />;
}
