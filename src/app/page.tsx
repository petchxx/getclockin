import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import HomeNavbar from "./_components/home/HomeNavbar";
import { Button, Divider } from "@nextui-org/react";
import Landing from "./_components/home/Landing";
import Feature from "./_components/home/Feature";
import Pricing from "./_components/pricing/Pricing";
import { Icon } from "@iconify/react/dist/iconify.js";

export default async function Home() {
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
        <div className="flex justify-center text-5xl font-semibold">
          ติดต่อเรา
        </div>
        <div className="m-4 flex justify-center">
          <div className="flex max-w-lg items-center text-center text-lg text-foreground/60">
            หากมีข้อสงสัย หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ที่
            {/* eng */}
          </div>
        </div>
        <div className="m-4 flex justify-center">
          <div className="flex max-w-lg items-center gap-4 text-center">
            <Button
              isIconOnly
              as={Link}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06c755]"
              href="https://lin.ee/4lkElFh"
            >
              <Icon icon="bi:line" className="text-white" fontSize={24} />
            </Button>
            <Button
              isIconOnly
              as={Link}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877f2]"
              href="https://web.facebook.com/profile.php?id=61564667780360"
            >
              <Icon icon="bi:facebook" className="text-white" fontSize={24} />
            </Button>
            <Button
              isIconOnly
              as={Link}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877f2]"
              href="mailto:petchxpanuphong@gmail.com"
            >
              <Icon icon="lucide:mail" className="text-white" fontSize={24} />
            </Button>

            {/* <Link */}
            {/*   href={`mailto:petchxpanuphong@gmail.com}`} */}
            {/*   className="cursor-pointer" */}
            {/* > */}
            {/*   petchxpanuphong@gmail.com */}
            {/* </Link> */}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mb-4 mt-20 flex items-center justify-center">
        <div className="flex max-w-lg items-center text-center">
          © 2021 ClockIn. All rights reserved.
        </div>
      </div>
      {/* bottom right floating button */}
      <Button
        isIconOnly
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#06c755]"
        as={Link}
        href="https://lin.ee/4lkElFh"
      >
        <Icon icon="bi:line" className="text-white" fontSize={24} />
      </Button>
    </main>
  );
}
