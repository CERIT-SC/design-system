"use client";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../primitives/navigation-menu";
import { PanelRight } from "lucide-react";
import eInfraLogoDefault from "./e-INFRA_logo_RGB_lilek.png";

/** Accepts a plain URL string or a Next.js / bundler static-import object. */
type LogoSrc = string | { src: string; width?: number; height?: number };

function resolveLogoSrc(logo: LogoSrc): string {
  return typeof logo === "string" ? logo : logo.src;
}

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "sidebar" | "navigation";
  navigationItems?: {
    label: string;
    href: string;
  }[];
  logo?: LogoSrc;
  logoAlt?: string;
}

export function Header({
  children,
  className,
  variant = "navigation",
  navigationItems = [],
  logo = eInfraLogoDefault,
  logoAlt = "e-INFRA Logo",
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 shadow-xl shadow-secondary/20 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between px-2",
          variant === "navigation" && "container"
        )}
      >
        {/* Left section */}
        <div className="flex items-center gap-6">
          {variant === "sidebar" && <PanelRight />}

          <a href="/" className="flex items-center">
            <img
              src={resolveLogoSrc(logo)}
              alt={logoAlt}
              className="h-20 w-auto"
            />
          </a>

          {variant === "navigation" && navigationItems.length > 0 && (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink href={item.href}>
                        {item.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}
