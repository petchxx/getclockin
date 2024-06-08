import React, { ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import SignInPage from "../_components/app/SignInPage";
import BottomBar from "../_components/app/BottomBar";
import TopBar from "../_components/app/TopBar";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (!session || session.user.role != "employee") {
    return <SignInPage />;
  }
  console.log(session);

  return (
    <div>
      <div className="">{children}</div>
      <BottomBar />
    </div>
  );
}
