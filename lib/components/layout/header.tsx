import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { HomeIcon, LogOut } from "lucide-react";
import eInfraLogo from "./e-INFRA_logo_white.svg";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  showSidebarTrigger?: boolean;
}

export function Header({
  children,
  className,
  showSidebarTrigger = false,
}: HeaderProps) {
  return (
    <header
      className={cn("bg-primary border-b border-border h-16 px-6 ", className)}
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          {showSidebarTrigger && <SidebarTrigger className="text-white" />}
          <a href="/" className="flex justify-end items-center">
            <img src={eInfraLogo} alt="e-INFRA Logo" className="h-22 w-auto" />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="icon"
            className="bg-secondary-foreground text-primary-foreground"
            asChild
          >
            <a href="/">
              <HomeIcon className="h-5 w-5 text-primary" />
            </a>
          </Button>
          <Button
            variant="default"
            size="icon"
            className="bg-secondary-foreground text-primary-foreground"
          >
            <LogOut className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </header>
  );
}
