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
import React from "react";
import { type Company } from "~/lib/interface/company";
import { ThemeSwitcher } from "../ThemeSwitcher";
import GravatarImage from "../GravatarImage";

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
    if (pathname == "/dashboard/calculate") return "คำนวนเงินเดือน";
    if (pathname == "/dashboard/leave") return "คำขอลางาน";
    if (pathname == "/dashboard/overtime") return "คำขอเพิ่มเวลาทำงาน";
    if (pathname == "/dashboard/subscription") return "แพ็คเกจของฉัน";
    if (pathname == "/dashboard/settings") return "ตั้งค่า";
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="sticky top-4 z-20 w-full">
      <Card className="">
        <Navbar maxWidth="full" className="rounded-sm bg-content1 ">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
          <NavbarContent className="flex gap-4 font-bold">
            <NavbarItem>
              <div className=" flex items-center gap-2">{getTitle()}</div>
            </NavbarItem>
          </NavbarContent>
          <div className="flex items-center gap-4"></div>
          <div className="flex items-center gap-4">
            <Button onPress={onOpen} isIconOnly variant="light">
              {/* <IoLinkSharp className="" fontSize={20} /> */}
            </Button>
            <ThemeSwitcher />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      เข้าใช้งาน Application
                    </ModalHeader>
                    <ModalBody className="">
                      <p className="text-sm">คัดลอกลิงค์</p>

                      <Snippet
                        variant="bordered"
                        symbol={
                          <div className="flex gap-2">
                            {/* <IoLinkSharp className="" fontSize={20} /> */}
                          </div>
                        }
                      >
                        https://getclockin.com/app
                      </Snippet>
                      <p className="mt-2 text-sm">หรือแชร์ไปยัง</p>

                      <div className="">
                        {/* <LineShareButton */}
                        {/*   url={"https://getclockin.com/app"} */}
                        {/*   title={ */}
                        {/*     "next-share is a social share buttons for your next React apps." */}
                        {/*   } */}
                        {/* > */}
                        {/*   <LineIcon className="rounded-full" size={40} /> */}
                        {/* </LineShareButton> */}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        ตกลง
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
          <NavbarMenu className="bg-background">
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
                  pathname == "/dashboard/calculate" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/calculate"
                size="lg"
              >
                คำนวนเงินเดือน
              </Link>
              <Link
                color={`${pathname == "/dashboard/leave" ? "primary" : "foreground"}`}
                className="w-full"
                href="/dashboard/leave"
                size="lg"
              >
                ลางาน
              </Link>
              <Link
                color={`${
                  pathname == "/dashboard/overtime" ? "primary" : "foreground"
                }`}
                className="w-full"
                href="/dashboard/overtime"
                size="lg"
              >
                เพิ่มเวลาทำงาน
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
