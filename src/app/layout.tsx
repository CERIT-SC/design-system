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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../lib/components/primitives/navigation-menu";
import { Footer } from "../../lib/components/layout/footer";
import EinfraLogo from "../../public/einfra-logo.svg";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { ModeToggle } from "../components/mode-toggle";
import { ThemeProvider } from "../components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header>
            <HeaderContent container={false}>
              <HeaderLeft>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src={EinfraLogo as StaticImageData}
                    alt="e-INFRA Logo"
                    width={120}
                    height={16}
                    className="h-20 w-auto"
                  />
                </Link>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/docs/foundations">
                        Foundations
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/docs/components">
                        Components
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </HeaderLeft>
              <HeaderRight>
                <ModeToggle />
              </HeaderRight>
            </HeaderContent>
          </Header>
          {children}
          <Footer tag={process.env.NEXT_PUBLIC_TAG} />
        </ThemeProvider>
      </body>
    </html>
  );
}
