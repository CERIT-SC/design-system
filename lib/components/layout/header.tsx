import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { HomeIcon, LogOut } from "lucide-react";
import eInfraLogoDefault from "./e-INFRA_logo_RGB_lilek.png";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "sidebar" | "navigation";
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;
  logo?: string;
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
        "sticky top-0 z-50 w-full bg-background/95 shadow-lg shadow-secondary/20 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between px-4 mx-auto",
          variant === "navigation" && "container"
        )}
      >
        {/* Left section */}
        <div className="flex items-center gap-4">
          {variant === "sidebar" && <SidebarTrigger />}

          <a href="/" className="flex items-center">
            <img src={logo} alt={logoAlt} className="h-16 w-auto" />
          </a>

          <Separator orientation="vertical" />

          <Button variant="ghost" size="icon" asChild>
            <a href="/">
              <HomeIcon className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </a>
          </Button>

          {variant === "navigation" && navigationItems.length > 0 && (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        href={item.href}
                        className={navigationMenuTriggerStyle()}
                      >
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
        <div className="flex items-center gap-2">
          {children}
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
