import { Skeleton } from "@nextui-org/react";
import React from "react";
import LeaveCard from "~/app/_components/app/LeaveCard";
import TopBar from "~/app/_components/app/TopBar";
import ClockCard from "~/app/_components/app/home/ClockCard";
import { Employee } from "~/lib/interface/employee";
import { api } from "~/trpc/server";

export default async function page() {
  const leaves = await api.employee.getLeaves({
    limit: 30,
  });
  const employee = await api.employee.get();
  return (
    <div>
      <TopBar title="ประวัติการลา" isBack />
      <div className=" flex justify-center pt-20">
        <div className="mt-4 flex min-h-[280px] w-80 flex-col gap-2">
          {!leaves ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
          ) : leaves.length > 0 ? (
            leaves?.map((leave, index) => (
              <LeaveCard key={index} leave={leave} />
            ))
          ) : (
            <div className="group flex h-[280px] w-full items-center justify-center gap-2 text-foreground/50"></div>
          )}
        </div>
      </div>
    </div>
  );
}
