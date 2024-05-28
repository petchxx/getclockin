"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { type Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { type } from "os";
import React, { useState } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";

type Props = {
  session: Session | null;
};

export default function HomeNavbar({ session }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const signOut = () => {
    router.push("/api/auth/signout");
  };
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <a href="#">
            <p className="text-2xl font-bold text-inherit text-primary">
              ClockIn
            </p>
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {/* <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem> */}
        <NavbarItem>
          <Link
            href="#"
            color="foreground"
            aria-current="page"
            className="hover:text-primary"
          >
            หน้าแรก
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#features"
            color="foreground"
            aria-current="page"
            className="hover:text-primary"
          >
            ฟีเจอร์
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#pricing"
            color="foreground"
            aria-current="page"
            className="hover:text-primary"
          >
            แพ็คเกจ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#contact"
            color="foreground"
            aria-current="page"
            className="hover:text-primary"
          >
            ติดต่อเรา
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        {/* {!session && ( */}
        {/*   <NavbarItem className="hidden lg:flex"> */}
        {/*     <Link href="/signup">เริ่มต้นใช้งาน</Link> */}
        {/*   </NavbarItem> */}
        {/* )} */}
        {!session && (
          <NavbarItem>
            <Button color="primary" variant="flat">
              <Link href="/login">เข้าสู่ระบบ</Link>
            </Button>
          </NavbarItem>
        )}
        {session && (
          <NavbarItem>
            <Button color="primary" variant="flat">
              <Link href="/dashboard">แดชบอร์ด</Link>
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="flex gap-3 pt-12">
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="#" size="lg">
            หน้าแรก
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full"
            href="#features"
            size="lg"
          >
            ฟีเจอร์
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link size="lg" color="foreground" className="w-full" href="#pricing">
            แพ็คเกจ
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" size="lg" className="w-full" href="#contact">
            ติดต่อเรา
          </Link>
        </NavbarMenuItem>
        {!session && (
          <NavbarMenuItem>
            <Link color="primary" size="lg" className="w-full" href="#contact">
              เริ่มต้นใช้งาน
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
