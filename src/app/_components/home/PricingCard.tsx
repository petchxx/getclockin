"use client";
import { Icon } from "@iconify/react";

import { Button, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { type Company } from "~/lib/interface/company";
import { api } from "~/trpc/react";

type Plan = {
  name: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string;
  description: string;
  monthlyPriceId: string;
  annualPriceId: string;
};

type Props = {
  plan: Plan;
  isAnnual: boolean;
  company?: Company;
};

export default function PricingCard({ plan, isAnnual, company }: Props) {
  const router = useRouter();
  const createCheckoutSession = api.stripe.createCheckoutSession.useMutation({
    async onSuccess(data) {
      console.log(data);
      router.push(data.url!);
    },
  });

  const handleCheckout = async (plan: Plan) => {
    if (isAnnual) {
      await createCheckoutSession.mutateAsync({
        priceId: plan.annualPriceId,
        companyId: company?.id ?? "",
      });
    } else {
      await createCheckoutSession.mutateAsync({
        priceId: plan.monthlyPriceId,
        companyId: company?.id ?? "",
      });
    }
  };
  return (
    <Card className="group w-80 items-start p-4 hover:border-primary">
      <Card className="flex h-10 w-10 items-center justify-center transition-colors duration-200 group-hover:bg-primary">
        <Icon
          icon={plan.icon ?? ""}
          height={20}
          className=" group-hover:text-white"
        />
      </Card>
      <p className="mt-2">{plan.name}</p>
      <p className="mt-2 text-sm opacity-60">{plan.description}</p>
      <p className="mt-4 text-4xl">
        ฿
        {isAnnual
          ? plan.yearlyPrice.toLocaleString()
          : plan.monthlyPrice.toLocaleString()}
        <span className="text-sm opacity-60"> / เดือน</span>
      </p>
      <p className="mt-4 text-sm opacity-60">สิทธิ์การเข้าถึง</p>
      <div className="mt-2">
        {plan.features?.map((feature, index) => (
          <div key={index} className="mt-2 flex items-center">
            <Icon
              icon="material-symbols-light:check"
              height={20}
              className="mr-2 inline-block text-primary"
            />
            <p className="text-sm">{feature}</p>
          </div>
        ))}
      </div>
      <Button
        className="mt-6 w-full group-hover:bg-primary group-hover:text-white"
        variant="bordered"
        color="primary"
        onClick={() => handleCheckout(plan)}
      >
        {company?.is_trial == false ? "เลือกแพ็คเกจ" : "ทดลองใช้ฟรี 30 วัน!"}
      </Button>
    </Card>
  );
}
