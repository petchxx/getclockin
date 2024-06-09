import React from "react";
import SettingsPage from "~/app/_components/dashboard/SettingsPage";
import { Company } from "~/lib/interface/company";
import { api } from "~/trpc/server";

export default async function page() {
  const company = await api.company.get();
  return <SettingsPage company={company as Company} />;
}
