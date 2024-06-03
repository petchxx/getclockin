import { Icon } from "@iconify/react";

import { Button, Card } from "@nextui-org/react";
import React from "react";
import { Company } from "~/lib/interface/company";

type Props = {
  plan: {
    name: string;
    features: string[];
    monthlyPrice: number;
    yearlyPrice: number;
    icon: string;
    description: string;
    monthlyPriceId: string;
    yearlyPriceId: string;
  };
  isAnnual: boolean;
  company?: Company;
};

export default function PricingCard({ plan, isAnnual, company }: Props) {
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
      >
        {company?.is_trial == true ? "ทดลองใช้ฟรี 30 วัน!" : "เลือกแพ็คเกจ"}
      </Button>
    </Card>
  );
}
