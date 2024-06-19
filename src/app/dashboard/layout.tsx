import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Sidebar from "../_components/dashboard/Sidebar";
import { api } from "~/trpc/server";
import RegisterPage from "../_components/dashboard/RegisterPage";
import Topbar from "../_components/dashboard/Topbar";
import SubscriptionPage from "../_components/dashboard/SubscriptionPage";
import Pricing from "../_components/dashboard/Pricing";
import { type Company } from "~/lib/interface/company";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (!session || session.user.role != "company") {
    return redirect("/signin");
  }
  const company = await api.company.get();
  //not set up yet
  if (!company) return redirect("/signin");
  if (!company?.name || !company?.app_password) {
    return (
      <div className="w-full p-4">
        <Topbar company={company as Company} title={"ลงทะเบียน"} />
        <RegisterPage />
      </div>
    );
  }

  if (company.status != "active") {
    return (
      <div className="w-full p-4">
        <Topbar company={company as Company} title={"เลือกแพ็คเกจ"} />
        <div className="mt-6">
          <Pricing company={company as Company} />
        </div>
      </div>
    );
  }
  return (
    <main className="flex min-h-[100dvh]">
      <Sidebar company={company as Company} />
      <div className="w-full p-4">
        <Topbar company={company as Company} />
        <div className="">{children}</div>
      </div>
    </main>
  );
}
