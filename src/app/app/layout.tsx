import React, { ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import SignInPage from "../_components/app/SignInPage";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (!session || session.user.role != "employee") {
    return <SignInPage />;
  }
  console.log(session);
  return <div>{children}</div>;
}
