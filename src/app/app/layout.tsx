import React, { ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import SignInPage from "../_components/app/SignInPage";
import BottomBar from "../_components/app/BottomBar";
import TopBar from "../_components/app/TopBar";

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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <TopBar />
      {children}
      <BottomBar />
    </div>
  );
}
