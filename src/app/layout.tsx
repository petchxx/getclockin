import "~/styles/globals.css";

import { Noto_Sans_Thai } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";
const nst = Noto_Sans_Thai({ subsets: ["latin"] });

export const metadata = {
  title: "ClockIn | ระบบบันทึกเวลาทำงาน",
  description:
    "ClockIn ระบบบันทึกเวลาทำงานของพนักงาน ระบบคำนวนเงินเดือน ระบบจัดการพนักงาน",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={`${nst.className}`}>
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
