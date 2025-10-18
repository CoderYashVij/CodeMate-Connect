import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: side-effect import of CSS without type declarations
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./header";
import { Footer } from "@/components/footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codemate Connect",
  description:
    "An application to help pair programming with random developers online.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />
          <main className="container mx-auto flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
