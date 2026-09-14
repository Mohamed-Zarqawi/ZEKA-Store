// app/layout.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav"; // استيراد الشريط السفلي
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Bruno_Ace, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bruno = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZEKA Store",
  description: "A store for all sports equipment",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    title: "ZEKA",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable)}>
      <body className={cn("flex min-h-screen flex-col", bruno.className)}>
        <Providers>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <Toaster className="font-bruno! hidden md:flex" />
        </Providers>
      </body>
    </html>
  );
}
