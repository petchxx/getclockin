import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Sidebar from "../_components/dashboard/layouts/Sidebar";
import { api } from "~/trpc/server";
import RegisterPage from "../_components/dashboard/RegisterPage";
import Topbar from "../_components/dashboard/layouts/Topbar";
import { type Company } from "~/lib/interface/company";
import Pricing from "../_components/pricing/Pricing";

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

  if (company.status != "active" && company.status != "canceled") {
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
