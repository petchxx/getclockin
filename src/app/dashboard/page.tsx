import { Card, Link, Skeleton } from "@nextui-org/react";
import React from "react";
import EmployeePage from "../_components/dashboard/employee/EmployeePage";
import { api } from "~/trpc/server";
import { type Employee } from "~/lib/interface/employee";
import { Icon } from "@iconify/react/dist/iconify.js";
import { type Leave } from "~/lib/interface/leave";
import { type Overtime } from "~/lib/interface/overtime";

export default async function page() {
  const employees = await api.employee.getAll();
  const leaves = await api.company.getAllLeaves();
  const overtimes = await api.company.getAllOvertimes();
  async function getTotalIn(employees: Employee[] | null) {
    if (employees != null) {
      return (
        employees.filter((employee) => employee.status === "in").length ?? 0
      );
    }
  }

  async function getTotalOut(employees: Employee[] | null) {
    if (employees != null) {
      return (
        employees.filter((employee) => employee.status === "out").length ?? 0
      );
    }
  }

  async function getTotalPendingLeave(leaves: Leave[] | null) {
    if (leaves != null) {
      return leaves.filter((leave) => leave.status === "pending").length ?? 0;
    }
  }

  async function getTotalPendingOvertime(overtimes: Overtime[] | null) {
    if (overtimes != null) {
      return (
        overtimes.filter((overtime) => overtime.status === "pending").length ??
        0
      );
    }
  }

  return (
    <main className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href={"/dashboard/employee"}>
          <Card className="h-40 w-full cursor-pointer hover:scale-[1.03]">
            <Skeleton className="rounded-xl" isLoaded={employees != null}>
              <div className="flex flex-col justify-center gap-2 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-success bg-opacity-20">
                  <Icon
                    icon="ion:person-add-outline"
                    className="text-success"
                    fontSize="24"
                  />
                </div>
                <div className="">
                  <div className="flex items-end">
                    <p className="text-4xl">
                      {getTotalIn(employees as Employee[])}
                    </p>
                    <p className="text-foreground-400">
                      {" "}
                      / {employees.length} คน
                    </p>
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
                  <Icon
                    icon="ion:person-remove-outline"
                    className="text-danger"
                    fontSize="24"
                  />
                </div>
                <div className="">
                  <div className="flex items-end">
                    <p className="text-4xl">
                      {getTotalOut(employees as Employee[])}
                    </p>
                    <p className="text-foreground-400">
                      {" "}
                      / {employees.length} คน
                    </p>
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
                  <Icon
                    icon="ion:person-circle-outline"
                    className="text-primary"
                    fontSize="24"
                  />
                </div>
                <div className="">
                  <div className="flex items-end gap-2">
                    <p className="text-4xl">
                      {getTotalPendingLeave(leaves as Leave[])}
                    </p>
                    <p className="text-foreground-400">รายการ</p>
                  </div>
                  <p>คำขอลางาน</p>
                </div>
              </div>
            </Skeleton>
          </Card>
        </Link>
        <Link href={"/dashboard/overtime"}>
          <Card className="h-40  w-full cursor-pointer hover:scale-[1.03]">
            <Skeleton className="rounded-xl" isLoaded={employees != null}>
              <div className="flex flex-col justify-center gap-2 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary bg-opacity-20">
                  {/* <IoPersonCircleOutline size={24} className="text-info" /> */}
                  <Icon
                    icon="ion:person-circle-outline"
                    className="text-primary"
                    fontSize="24"
                  />
                </div>
                <div className="">
                  <div className="flex items-end gap-2">
                    <p className="text-4xl">
                      {getTotalPendingOvertime(overtimes)}
                    </p>
                    <p className="text-foreground-400">รายการ</p>
                  </div>
                  <p>คำขอทำงานล่วงเวลา</p>
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
