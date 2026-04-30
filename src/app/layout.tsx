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
import EinfraLogoLight from "../../public/einfra-logo.svg";
import EinfraLogoDark from "../../public/e-INFRA_logo_RGB_bila.svg";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { ModeToggle } from "../components/ModeToggle";
import { ThemeProvider } from "../components/ThemeProvider";
import { Button } from "../../lib/components/primitives/button";
import { Package } from "lucide-react";

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
            <HeaderContent container={false} className="w-full mx-4">
              <HeaderLeft>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src={EinfraLogoLight as StaticImageData}
                    alt="e-INFRA Logo (light mode)"
                    width={120}
                    height={16}
                    className="h-20 w-auto dark:hidden"
                  />
                  <Image
                    src={EinfraLogoDark as StaticImageData}
                    alt="e-INFRA Logo (dark mode)"
                    width={120}
                    height={16}
                    className="hidden h-20 w-auto dark:block"
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
                <Link
                  href="https://github.com/CERIT-SC/design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm" className="gap-2 text-sm">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </Link>
                <Link
                  href="https://www.npmjs.com/package/@e-infra/design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm" className="gap-2 text-sm">
                    <Package className="w-5 h-5" />
                    NPM package
                  </Button>
                </Link>
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
