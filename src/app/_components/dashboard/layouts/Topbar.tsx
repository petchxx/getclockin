"use client";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { type Company } from "~/lib/interface/company";
import { ThemeSwitcher } from "../../ThemeSwitcher";
import GravatarImage from "../../GravatarImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import AppLink from "./AppLink";

type Props = {
  company: Company;
  title?: string;
};

export default function Topbar({ company, title }: Props) {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const getTitle = () => {
    if (title) return title;
    if (pathname == "/dashboard") return "แดชบอร์ด";
    if (pathname == "/dashboard/employee") return "พนักงาน";
    if (pathname == "/dashboard/history") return "ประวัติการทำงาน";
    if (pathname == "/dashboard/leave") return "คำขอลางาน";
    if (pathname == "/dashboard/overtime") return "ขอทำงานล่วงเวลา";
    if (pathname == "/dashboard/subscription") return "แพ็คเกจของฉัน";
    if (pathname == "/dashboard/settings") return "ตั้งค่า";
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log(query.get("session_id"));
      setSuccess(true);
      onOpen();
    }

    if (query.get("canceled")) {
      onOpen();
    }
  }, []);

  return (
    <div className="sticky top-4 z-20 w-full">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton={true}
      >
        <ModalContent className="py-6">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col items-center gap-1">{isSuccess ? "Payment Completed" : "Payment Failed"}</ModalHeader> */}
              <ModalBody className="flex-col items-center justify-center">
                {success ? (
                  <Icon icon="ion:checkmark-circle" fontSize={150} />
                ) : (
                  <Icon icon="ion:close-circle" fontSize={150} />
                )}
                <p className="text-center text-lg font-bold">
                  {success ? "ชำระเงินสำเร็จ" : "ชำระเงินไม่สำเร็จ"}
                </p>
                {success ? (
                  <p className="text-center">
                    การชำระเงินเสร็จสมบูรณ์ ขอบคุณที่ใช้บริการ
                  </p>
                ) : (
                  <p className="text-center ">
                    กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button
                  color={`${success ? "success" : "danger"}`}
                  onClick={() => {
                    onClose();
                    router.push("/dashboard");
                  }}
                  className={`w-full `}
                  variant="bordered"
                >
                  ดำเนินการต่อ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Card className="">
        <Navbar maxWidth="full" className="rounded-sm bg-content1 ">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="xl:hidden"
          />
          <NavbarContent className="flex gap-4 font-bold">
            <NavbarItem>
              <div className=" flex items-center gap-2">{getTitle()}</div>
            </NavbarItem>
          </NavbarContent>
          <div className="flex items-center gap-4"></div>
          <div className="flex items-center gap-4">
            <AppLink />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  size="sm"
                  className="transition-transform"
                  src={GravatarImage({ email: company.email })}
                  radius="md"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  onClick={() => router.push("/dashboard")}
                  textValue="Information"
                >
                  <p className="font-semibold">บัญชี</p>
                  <p className="font-semibold">{company.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  onClick={() => router.push("/dashboard/settings")}
                >
                  ตั้งค่า
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={async () => {
                    await signOut();
                  }}
                >
                  ออกจากระบบ
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <NavbarMenu className="mt-6 bg-background">
            <NavbarMenuItem className="mt-6 flex flex-col gap-2">
              <Link
                color={`${pathname == "/dashboard" ? "primary" : "foreground"}`}
                className="w-full"
                href="/dashboard"
                size="lg"
              >
                แดชบอร์ด
              </Link>
              <Link
                color={`${
                  pathname == "/dashboard/employee" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/employee"
                size="lg"
              >
                พนักงาน
              </Link>
              <Link
                color={`${
                  pathname == "/dashboard/history" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/history"
                size="lg"
              >
                ประวัติการทำงาน
              </Link>
              <Link
                color={`${pathname == "/dashboard/leave" ? "primary" : "foreground"}`}
                className="w-full"
                href="/dashboard/leave"
                size="lg"
              >
                ขอลางาน
              </Link>
              <Link
                color={`${
                  pathname == "/dashboard/overtime" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/overtime"
                size="lg"
              >
                ขอทำงานล่วงเวลา
              </Link>
              <Link
                color={`${
                  pathname == "/dashboard/status" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/status"
                size="lg"
              >
                สถานะ
              </Link>
              <Link
                color={`${
                  pathname == "/dashboard/settings" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/settings"
                size="lg"
              >
                ตั้งค่า
              </Link>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </Card>
    </div>
  );
}
