"use client";
import { Icon } from "@iconify/react";

import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { type Router } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { type Company } from "~/lib/interface/company";
import { api } from "~/trpc/react";

type Plan = {
  name: string;
  features: string[];
  monthlyPrice?: number;
  yearlyPrice?: number;
  icon: string;
  description: string;
  monthlyPriceId?: string;
  annualPriceId?: string;
  permissions: {
    maxEmployees: number;
    isLeaveOt?: boolean;
    isLineNotify?: boolean;
    isCalculate?: boolean;
  };
};

type Props = {
  plan: Plan;
  isAnnual: boolean;
  company?: Company;
  subscriptionPricingId?: string;
  subscriptionItemId?: string;
  subscriptionId?: string;
};

export default function PricingCard({
  plan,
  isAnnual,
  company,
  subscriptionPricingId,
  subscriptionItemId,
  subscriptionId,
}: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createCheckoutSession = api.stripe.createCheckoutSession.useMutation({
    async onSuccess(data) {
      console.log(data);
      router.push(data.url!);
    },
  });

  const updateSubscription = api.stripe.updateSubscription.useMutation({
    async onSuccess(data) {
      // router.refresh();
      return window.location.reload();
    },
  });

  const cancelSubscription = api.stripe.cancelSubscription.useMutation({
    async onSuccess(data) {
      if (data?.cancel_at_period_end) {
        router.refresh();
        return toast.success(
          "ยกเลิกแพ็คเกจสำเร็จ คุณจะสามารถใช้งานได้ถึงวันที่ " +
            moment(data.current_period_end * 1000).format("DD/MM/YYYY"),
          {
            autoClose: 5000,
          },
        );
      }
    },
  });

  const handleCheckout = async (plan: Plan) => {
    if (!company) {
      return router.push("/signup");
    }
    if (subscriptionPricingId && company?.status == "active") {
      //update
      if (isAnnual) {
        updateSubscription.mutate({
          priceId: plan.annualPriceId ?? "",
          subscriptionId: subscriptionId ?? "",
          subscriptionItemId: subscriptionItemId ?? "",
          permissions: plan.permissions,
        });
      } else {
        updateSubscription.mutate({
          priceId: plan.monthlyPriceId ?? "",
          subscriptionId: subscriptionId ?? "",
          subscriptionItemId: subscriptionItemId ?? "",
          permissions: plan.permissions,
        });
      }
      return;
    }
    if (isAnnual) {
      createCheckoutSession.mutate({
        priceId: plan.annualPriceId ?? "",
        companyId: company?.id ?? "",
        isTrial: company?.is_trial ?? false,
        permissions: plan.permissions,
      });
    } else {
      createCheckoutSession.mutate({
        priceId: plan.monthlyPriceId ?? "",
        companyId: company?.id ?? "",
        isTrial: company?.is_trial ?? false,
        permissions: plan.permissions,
      });
    }
  };

  const handleCacelSubscription = async (plan: Plan) => {
    if (!company) {
      return router.push("/signup");
    }
    if (!subscriptionPricingId) {
      return toast.error("คุณไม่มีแพ็คเกจอยู่");
    }
    onOpen();
  };

  const isCurrentPlan =
    subscriptionPricingId && company?.status == "active"
      ? subscriptionPricingId ==
        (isAnnual ? plan.annualPriceId : plan.monthlyPriceId)
      : "";
  return (
    <Card
      className={`group w-80 items-start p-4 hover:border-primary ${isCurrentPlan && "bg-primary text-background"}`}
    >
      <Card
        className={`flex h-10 w-10 items-center justify-center transition-colors duration-200 group-hover:bg-primary ${isCurrentPlan && "group-hover:bg-background"}`}
      >
        <Icon
          icon={plan.icon ?? ""}
          height={20}
          className={`  ${isCurrentPlan == true ? "group-hover:text-foreground" : "group-hover:text-white"} `}
        />
      </Card>
      <p className="mt-2">{plan.name}</p>
      <p className="mt-2 text-sm opacity-60">{plan.description}</p>
      <p className="mt-4 text-4xl">
        ฿
        {isAnnual
          ? plan.yearlyPrice?.toLocaleString()
          : plan.monthlyPrice?.toLocaleString()}
        <span className="text-sm opacity-60"> / เดือน</span>
      </p>
      <p className="mt-4 text-sm opacity-60">สิทธิ์การเข้าถึง</p>
      <div className="mt-2">
        {plan.features?.map((feature, index) => (
          <div key={index} className="mt-2 flex items-center">
            <Icon
              icon="material-symbols-light:check"
              height={20}
              className={`mr-2 inline-block ${isCurrentPlan ? "text-background" : " text-primary "}`}
            />
            <p className="text-sm">{feature}</p>
          </div>
        ))}
      </div>
      {isCurrentPlan == true ? (
        <Button
          className="group-hover:text-back mt-6 w-full text-background"
          variant="bordered"
          color="default"
          onClick={async () => await handleCacelSubscription(plan)}
        >
          ยกเลิกแพ็คเกจ
        </Button>
      ) : (
        <Button
          className="mt-6 w-full group-hover:bg-primary group-hover:text-white"
          variant="bordered"
          color="default"
          onClick={async () => await handleCheckout(plan)}
        >
          {company?.is_trial == false ? "เลือกแพ็คเกจ" : "ทดลองใช้ฟรี 30 วัน!"}
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-2xl">ยืนยันการยกเลิกแพ็คเกจ</p>
                <p className="text-sm opacity-60">
                  คุณต้องการยกเลิกแพ็คเกจหรือไม่
                </p>
              </ModalHeader>
              <ModalBody>
                <p className="text-sm opacity-60">
                  หากยกเลิกแพ็คเกจ คุณจะสามารถใช้งานได้ถึงวันสิ้นสุดรอบ
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  ปิด
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  onClick={() => {
                    cancelSubscription.mutate();
                  }}
                >
                  ยืนยัน
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
