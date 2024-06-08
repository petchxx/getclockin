import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Flip, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          transition={Flip}
        />

        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
