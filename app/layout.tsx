import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Card } from "@/components/ui/card";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Law",
  description: "Know Law in Simple Words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" sm:m-10">
          <Card className="">{children}</Card>
        </div>
      </body>
    </html>
  );
}
