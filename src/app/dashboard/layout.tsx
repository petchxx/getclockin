import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Sidebar from "../_components/dashboard/Sidebar";
import { api } from "~/trpc/server";
import RegisterPage from "../_components/dashboard/RegisterPage";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  const company = await api.company.get({ id: session?.user.id ?? "" });
  if (!session || !company) {
    redirect("/signout");
  }

  if (!company?.company_key || !company.name || !company.app_password) {
    return <RegisterPage company={company} />;
  }
  return (
    <div>
      <Sidebar company={company} />
      {children}
    </div>
  );
}
