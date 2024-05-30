import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Sidebar from "../_components/dashboard/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
