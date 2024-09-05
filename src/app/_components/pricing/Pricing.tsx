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
import moment from "moment";
import { motion } from "framer-motion";

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
  const env = process.env.NODE_ENV;

  const plans = [
    {
      name: "Basic Plan",
      monthlyPrice: 950,
      yearlyPrice: 899,
      icon: "material-symbols-light:lightbulb-outline",
      description: "แพ็คเกจสำหรับธุรกิจขนาดเล็ก",
      features: [
        "ระบบบันทึกเวลาเข้างานและออกงาน",
        "ผู้ใช้งาน 10 คน",
        "Customer Support",
      ],

      monthlyPriceId:
        env == "development"
          ? "price_1PTLRcHwApzxTyYDohrIHONB"
          : env == "production"
            ? "price_1PV27GHwApzxTyYDX4aZ6Gq4"
            : "",
      yearlyPriceId: "price_1PZYQbHwApzxTyYDTIiAcZrw",
      permissions: {
        maxEmployees: 10,
      },
    },
    {
      name: "Business Plan",
      monthlyPrice: 1350,
      yearlyPrice: 1299,
      icon: "material-symbols-light:kid-star-outline",
      description: "แพ็คเกจสำหรับธุรกิจขนาดกลาง",
      features: [
        "ระบบลาและทำงานล่วงเวลา",
        "แจ้งเตือนผ่านไลน์",
        "ผู้ใช้งาน 20 คน",
      ],
      monthlyPriceId:
        env == "development"
          ? "price_1PUMrdHwApzxTyYDwlPxCZPM"
          : env == "production"
            ? "price_1PV27oHwApzxTyYDO7v2WyYm"
            : "",
      yearlyPriceId: "price_1PZYSXHwApzxTyYD16AJ1woW",
      permissions: {
        maxEmployees: 20,
        isLeaveOt: true,
        isLineNotify: true,
      },
    },
    {
      name: "Enterprise Plan",
      monthlyPrice: 1450,
      yearlyPrice: 1399,
      icon: "material-symbols-light:diamond-outline-rounded",
      description: "แพ็คเกจสำหรับธุรกิจขนาดใหญ่",
      features: ["คำนวณเงินเดือน", "ผู้ใช้งานไม่จำกัด", "ClockIn Care"],
      monthlyPriceId:
        env == "development"
          ? "price_1PV2DLHwApzxTyYDtgZhSM79"
          : env == "production"
            ? "price_1PV28KHwApzxTyYDprZjEH2R"
            : "",
      yearlyPriceId: "price_1PZYTjHwApzxTyYDoM0MT7y2",
      permissions: {
        maxEmployees: 100,
        isLeaveOt: true,
        isLineNotify: true,
        isCalculate: true,
      },
      isPopular: true,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
      }}
      id="features"
    >
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
          <p className="mt-4 text-center text-4xl font-semibold">
            ทดลองใช้ฟรี 30 วัน!
          </p>
        )}
        <p className="md mt-4 max-w-2xl px-4 text-center text-foreground/60">
          เพื่อให้คุณได้สัมผัสกับความสามารถและคุณสมบัติที่เรามีให้
          กรุณาเลือกแพ็คเกจที่ต้องการ และหากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม
          กรุณาติดต่อเรา
        </p>
        {subscription && company?.status == "active" && (
          <p className="mt-2 text-primary">
            ต่ออายุ{" "}
            {moment(subscription?.current_period_end * 1000).format(
              "DD/MM/YYYY",
            )}
          </p>
        )}
        {subscription && company?.status == "canceled" && (
          <p className="mt-2 text-primary">
            ใช้งานได้ถึง{" "}
            {moment(subscription?.current_period_end * 1000).format(
              "DD/MM/YYYY",
            )}
          </p>
        )}

        <Tabs aria-label="Options" className="mt-4">
          <Tab key="monthly" title="รายเดือน">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {plans.map((plan, index) => (
                <PricingCard
                  company={company}
                  key={index}
                  plan={plan}
                  isAnnual={false}
                  subscriptionPricingId={subscription?.items.data[0]?.plan.id}
                  subscriptionItemId={subscription?.items.data[0]?.id ?? ""}
                  subscriptionId={subscription?.id}
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
                  subscriptionPricingId={subscription?.items.data[0]?.plan.id}
                  subscriptionItemId={subscription?.items.data[0]?.id ?? ""}
                  subscriptionId={subscription?.id}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </motion.div>
  );
}
