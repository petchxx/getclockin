import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import SignUpForm from "../_components/SignUpForm";

export default async function page() {
  const session = await getServerAuthSession();
  if (session) {
    if (session.user.role === "admin") {
      redirect("/admin");
    }
    if (session.user.role === "company") {
      redirect("/dashboard");
    }
  }

  return <SignUpForm />;
}
