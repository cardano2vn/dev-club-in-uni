import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "NFT Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container py-5">
        <ContextProvider>{children}</ContextProvider>
        </div>
      </body>
    </html>
  );
}
