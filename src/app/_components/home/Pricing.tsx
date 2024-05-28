"use client";
import { Icon } from "@iconify/react/dist/iconify.mjs";
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

export default function Pricing() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  const plans = [
    {
      name: "Basic Plans",
      monthlyPrice: 1450,
      yearlyPrice: 950,
      icon: "material-symbols-light:lightbulb-outline",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      monthlyPriceId: "price_1PGDylAxJWaaPumFN79FAeXE",
      yearlyPriceId: "price_1PGE1EAxJWaaPumFqNXbAbxF",
    },
    {
      name: "Business Plans",
      monthlyPrice: 1250,
      yearlyPrice: 1600,
      icon: "material-symbols-light:kid-star-outline",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      monthlyPriceId: "",
      yearlyPriceId: "",
    },
    {
      name: "Enterprise Plans",
      monthlyPrice: 950,
      yearlyPrice: 2400,
      icon: "material-symbols-light:diamond-outline-rounded",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      monthlyPriceId: "",
      yearlyPriceId: "",
    },
  ];
  return (
    <div className="mt-12 pt-32" id="pricing">
      <div className="mt-6 flex flex-col items-center">
        <Chip color="primary" className="rounded-full ">
          แพ็คเกจ
        </Chip>
        <p className="mt-4 text-center text-4xl">ทดลองใช้ฟรี 30 วัน!</p>
        <p className="mt-4 max-w-screen-md px-4 text-center text-foreground/60">
          ทดลองใช้งานระบบของเราได้ฟรีเป็นเวลา 30 วัน
          เพื่อให้คุณได้สัมผัสกับความสามารถและคุณสมบัติที่เรามีให้
          กรุณาเลือกแพ็คเกจที่ต้องการ หากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม
          กรุณาติดต่อเรา
        </p>
        <Tabs aria-label="Options" className="mt-4">
          <Tab key="monthly" title="รายเดือน">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {plans.map((plan, index) => (
                <PricingCard key={index} plan={plan} isAnnual={false} />
              ))}
            </div>
          </Tab>
          <Tab key="annual" title="รายปี">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {plans.map((plan, index) => (
                <PricingCard key={index} plan={plan} isAnnual={true} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
