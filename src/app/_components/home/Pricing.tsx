"use client";
import { Icon } from "@iconify/react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";
import PricingCard from "./PricingCard";
import { type Company } from "~/lib/interface/company";
import { api } from "~/trpc/react";

type Props = {
  company?: Company;
  isShowSubscription?: boolean;
};

export default function Pricing({
  company,
  isShowSubscription = false,
}: Props) {
  const [isAnnual, setIsAnnual] = React.useState(false);
  const subscription = api.stripe.getSubscription.useQuery().data;

  const plans = [
    {
      name: "Basic Plans",
      monthlyPrice: 950,
      yearlyPrice: 899,
      icon: "material-symbols-light:lightbulb-outline",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        "ระบบบันทึกเวลาเข้างานและออกงาน",
        "ผู้ใช้งาน 10 คน",
        "Customer Support",
      ],
      monthlyPriceId: "price_1PTLRcHwApzxTyYDohrIHONB",
      yearlyPriceId: "price_1PGE1EAxJWaaPumFqNXbAbxF",
    },
    {
      name: "Business Plans",
      monthlyPrice: 1350,
      yearlyPrice: 1299,
      icon: "material-symbols-light:kid-star-outline",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        "ระบบลาและทำงานล่วงเวลา",
        "แจ้งเตือนผ่านไลน์",
        "ผู้ใช้งาน 20 คน",
      ],
      monthlyPriceId: "",
      yearlyPriceId: "",
    },
    {
      name: "Enterprise Plans",
      monthlyPrice: 1450,
      yearlyPrice: 1399,
      icon: "material-symbols-light:diamond-outline-rounded",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: ["คำนวนเงินเดือน", "ไม่จำกัดจำนวนผู้ใช้", "ClockIn Care"],
      monthlyPriceId: "",
      yearlyPriceId: "",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center">
        <Chip
          color="primary"
          className="rounded-full "
          onClick={() => {
            console.log(subscription);
          }}
        >
          แพ็คเกจ
        </Chip>
        {company?.is_trial == false ? (
          <p className="mt-4 text-center text-4xl">ต่ออายุการใช้งาน</p>
        ) : (
          <p className="mt-4 text-center text-4xl">ทดลองใช้ฟรี 30 วัน!</p>
        )}
        <p className="mt-4 max-w-screen-md px-4 text-center text-foreground/60">
          เพื่อให้คุณได้สัมผัสกับความสามารถและคุณสมบัติที่เรามีให้
          กรุณาเลือกแพ็คเกจที่ต้องการ
          <br />
          หากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเรา
        </p>
        <Tabs aria-label="Options" className="mt-4">
          <Tab key="monthly" title="รายเดือน">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {plans.map((plan, index) => (
                <PricingCard
                  company={company}
                  key={index}
                  plan={plan}
                  isAnnual={false}
                  subscriptionId={
                    isShowSubscription
                      ? subscription?.items.data[0]?.plan.id
                      : ""
                  }
                />
              ))}
            </div>
          </Tab>
          <Tab key="annual" title="รายปี">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {plans.map((plan, index) => (
                <PricingCard
                  company={company}
                  key={index}
                  plan={plan}
                  isAnnual={true}
                  subscriptionId={
                    isShowSubscription
                      ? subscription?.items.data[0]?.plan.id
                      : ""
                  }
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
