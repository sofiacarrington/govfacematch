import type { Metadata } from "next";
import { DM_Sans, Rethink_Sans } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GovFaceMatch — A new standard in identity verification",
  description:
    "The only identity platform that partners directly with state DMVs for real-time biometric verification. Higher conversion. Stronger assurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${rethinkSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
