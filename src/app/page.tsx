import Link from "next/link";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import HomeNavbar from "./_components/home/HomeNavbar";
import { Icon } from "@iconify/react";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import Landing from "./_components/home/Landing";
import Feature from "./_components/home/Feature";
import Pricing from "./_components/dashboard/Pricing";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main>
      <div className="flex h-12 w-full items-center justify-center gap-4 text-primary ">
        <p className="text-sm">🎉 ทดลองใช้งานฟรี 30 วัน!</p>
        <Button
          className="rounded-full "
          as={Link}
          href="/signup"
          size="sm"
          color="primary"
          variant="bordered"
        >
          <p className="flex gap-1">เริ่มต้นใช้งาน!</p>
        </Button>
      </div>
      <Divider />
      <HomeNavbar session={session} />
      <Landing />
      <Feature />
      <div className="mt-14 pt-20" id="pricing">
        <Pricing />
      </div>
      <div className="mt-12 pt-32" id="contact">
        <div className="flex justify-center text-5xl font-bold">ติดต่อเรา</div>
        <div className="m-4 flex justify-center">
          <div className="flex max-w-lg items-center text-center">
            หากมีข้อสงสัย หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ที่
            {/* eng */}
          </div>
        </div>
        <div className="m-4 flex justify-center">
          <div className="flex max-w-lg items-center text-center">
            <Link
              href={`mailto:petchxpanuphong@gmail.com}`}
              className="cursor-pointer"
            >
              petchxpanuphong@gmail.com
            </Link>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mb-4 mt-20 flex items-center justify-center">
        <div className="flex max-w-lg items-center text-center">
          © 2021 ClockIn. All rights reserved.
        </div>
      </div>
    </main>
  );
}
