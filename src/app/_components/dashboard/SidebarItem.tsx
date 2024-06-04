import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  path: string;
  icon: React.ReactNode;
  title: string;
};

export default function SidebarItem({ path, icon, title }: Props) {
  const pathname = usePathname();
  return (
    <Link
      className={`mt-1 flex h-10 cursor-pointer items-center rounded-lg px-4   ${
        pathname == path
          ? "bg-primary text-content1"
          : "text-foreground transition-background hover:bg-black hover:bg-opacity-5"
      }`}
      href={path}
    >
      {icon}
      <h1 className="ml-2  ">{title}</h1>
    </Link>
  );
}
