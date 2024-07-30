import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/contexts";
import Title from "@/components/Title";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Esto Es - Projects",
  description: "Projects by Esto Es",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <html lang="en">
        <body className={cn(inter.className, 'bg-slate-300')}>
          <header
            className="flex bg-white py-2 px-4 border-b border-b-gray-300"
          >
            <span
              className=" text-sm text-[#BDBDBD] font-semibold"
            >
              LOGO
            </span>
          </header>
          <Title />
          {children}
        </body>
      </html>
    </ContextProvider>
  );
}
