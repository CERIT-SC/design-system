import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import {
  Header,
  HeaderContent,
  HeaderLeft,
  HeaderRight,
} from "../../lib/components/layout/header";
import { Footer } from "../../lib/components/layout/footer";
import EinfraLogo from "../../public/e-INFRA_logo_RGB_lilek.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-INFRA CZ Design System - Components",
  description: "Design system components for e-INFRA CZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header>
          <HeaderContent container={false}>
            <HeaderLeft>
              <a href="/" className="flex items-center gap-2">
                <Image
                  src={EinfraLogo}
                  alt="e-INFRA Logo"
                  width={120}
                  height={40}
                  className="h-20 w-auto"
                />
              </a>
              <nav className="flex items-center gap-6">
                <a
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="/docs/foundations"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Foundations
                </a>
                <a
                  href="/docs/components"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Components
                </a>
              </nav>
            </HeaderLeft>
            <HeaderRight>{/* Additional actions can go here */}</HeaderRight>
          </HeaderContent>
        </Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
