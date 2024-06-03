import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Sidebar from "../_components/dashboard/Sidebar";
import { api } from "~/trpc/server";
import RegisterPage from "../_components/dashboard/RegisterPage";
import Topbar from "../_components/dashboard/Topbar";
import SubscriptionPage from "../_components/dashboard/SubscriptionPage";
import Pricing from "../_components/home/Pricing";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  const company = await api.company.get({ id: session?.user.id ?? "" });
  if (!session || !company) {
    redirect("/signout");
  }

  if (!company.name || !company.app_password) {
    return <RegisterPage company={company} />;
  }

  if (company.status != "active") {
    return (
      <div className="w-full p-4">
        <Topbar company={company} />
        <div className="mt-6">
          <Pricing company={company} />
        </div>
      </div>
    );
  }
  return (
    <main className="flex min-h-[100dvh]">
      <Sidebar company={company} />
      <div className="w-full bg-background p-4">
        <Topbar company={company} />
        <div className="">{children}</div>
      </div>
    </main>
  );
}
