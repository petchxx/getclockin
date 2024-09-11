import "~/styles/globals.css";

import { Noto_Sans_Thai } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";
import Head from "next/head";
import Script from "next/script";
const nst = Noto_Sans_Thai({ subsets: ["latin"] });

export const metadata = {
  title: "ClockIn | ระบบ HR ระบบบันทึกเวลาทำงาน และการขาดลามาสายของพนักงาน",
  description:
    "ClockIn ระบบ HR ระบบบันทึกเวลาทำงาน และการขาดลามาสายของพนักงาน ระบบคำนวณเงินเดือน ระบบจัดการพนักงาน ทดลองใช้งานฟรี",
  keywords:
    "ClockIn, getclockin, ระบบ HR, ระบบบันทึกเวลาทำงาน, และการขาดลามาสายของพนักงาน, ระบบคำนวณเงินเดือน, ระบบจัดการพนักงาน, ทดลองใช้งานฟรี, แอพบันทึกเวลาทำงาน",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={`${nst.className}`}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-16547685038"
      ></Script>
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
