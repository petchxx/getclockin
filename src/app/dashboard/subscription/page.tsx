import React from "react";
import Pricing from "~/app/_components/pricing/Pricing";
import { type Company } from "~/lib/interface/company";
import { api } from "~/trpc/server";

export default async function page() {
  const company = await api.company.get();
  return (
    <div className="my-10">
      <Pricing company={company as Company} isShowSubscription />
    </div>
  );
}
