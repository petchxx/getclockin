import React from "react";
import LeavePage from "~/app/_components/dashboard/LeavePage";
import { api } from "~/trpc/server";

export default async function page() {
  const leaves = await api.company.getAllLeaves();
  console.log(leaves);
  return <LeavePage leaves={leaves} />;
}
