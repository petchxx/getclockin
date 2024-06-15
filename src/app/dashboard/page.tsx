import { Card, Link, Skeleton } from "@nextui-org/react";
import React from "react";
import EmployeePage from "../_components/dashboard/employee/EmployeePage";
import { api } from "~/trpc/server";
import { type Employee } from "~/lib/interface/employee";

export default async function page() {
  const employees = await api.employee.getAll();
  return (
    <main className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href={"/dashboard/employee"}>
          <Card className="h-40 w-full cursor-pointer hover:scale-[1.03]">
            <Skeleton className="rounded-xl" isLoaded={employees != null}>
              <div className="flex flex-col justify-center gap-2 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-success bg-opacity-20">
                  {/* <IoPersonAddOutline size={24} className="text-success" /> */}
                </div>
                <div className="">
                  <div className="flex items-end">
                    <p className="text-4xl">dsakld</p>
                    <p className="text-foreground-400">dsa</p>
                  </div>
                  <p>พนักงานที่เข้างาน</p>
                </div>
              </div>
            </Skeleton>
          </Card>
        </Link>
        <Link href={"/dashboard/employee"}>
          <Card className="h-40  w-full cursor-pointer hover:scale-[1.03]">
            <Skeleton className="rounded-xl" isLoaded={employees != null}>
              <div className="flex flex-col justify-center gap-2 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-danger bg-opacity-20">
                  {/* <IoPersonRemoveOutline size={24} className="text-danger" /> */}
                </div>
                <div className="">
                  <div className="flex items-end">
                    <p className="text-4xl">kadlsf</p>
                    <p className="text-foreground-400">dsa</p>
                  </div>
                  <p>พนักงานที่ออกงาน</p>
                </div>
              </div>
            </Skeleton>
          </Card>
        </Link>
        <Link href={"/dashboard/employee"}>
          <Card className="h-40  w-full cursor-pointer hover:scale-[1.03]">
            <Skeleton className="rounded-xl" isLoaded={employees != null}>
              <div className="flex flex-col justify-center gap-2 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-warning bg-opacity-20">
                  {/* <IoPersonCircleOutline size={24} className="text-warning" /> */}
                </div>
                <div className="">
                  <div className="flex items-end">
                    <p className="text-4xl">dskalf</p>
                    <p className="text-foreground-400">dsa</p>
                  </div>
                  <p>พนักงานที่ลา</p>
                </div>
              </div>
            </Skeleton>
          </Card>
        </Link>
        <Link href={"/dashboard/employee"}>
          <Card className="h-40  w-full cursor-pointer hover:scale-[1.03]">
            <Skeleton className="rounded-xl" isLoaded={employees != null}>
              <div className="flex flex-col justify-center gap-2 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary bg-opacity-20">
                  {/* <IoPersonCircleOutline size={24} className="text-info" /> */}
                </div>
                <div className="">
                  <div className="flex items-end">
                    <p className="text-4xl">dksalf</p>
                    <p className="text-foreground-400">dsa</p>
                  </div>
                  <p>พนักงานที่ลา</p>
                </div>
              </div>
            </Skeleton>
          </Card>
        </Link>
      </div>
      <div className="mt-6">
        <EmployeePage employees={employees as Employee[]} />
      </div>
    </main>
  );
}
