import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "../../lib/components/layout/header";
import { Footer } from "../../lib/components/layout/footer";

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
        <Header
          variant="navigation"
          navigationItems={[
            { label: "Home", href: "/" },
            { label: "Components Overview", href: "/components-overview" },
            { label: "Design Guidelines", href: "/design-guidelines" },
            { label: "Docs", href: "/test" },
          ]}
        />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
