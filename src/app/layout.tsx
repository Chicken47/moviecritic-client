"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col w-screen`}>
        <RecoilRoot>
          <Header />
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
