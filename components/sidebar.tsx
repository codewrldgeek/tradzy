"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  PenTool,
  ScrollText,
  Settings,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Daily Journal",
    href: "/journal",
    icon: ScrollText,
  },
  {
    title: "Trade Log",
    href: "/trades",
    icon: LineChart,
  },
  {
    title: "AI Risk Calculator",
    href: "/calculator",
    icon: Calculator,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
];

interface SidebarContentProps {
  className?: string;
  onNavClick?: () => void;
}

function SidebarContent({ className, onNavClick }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 w-full md:w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          {/* <Image
            src="/logodark.webp"
            alt="Tradzy logo"
            width={100}
            height={100}
            className="rounded-full"
          /> */}
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            TRADZY
          </h2>
          <div className="px-2 py-2 bg-slate-900 rounded-lg mb-4">
            <p className="text-xs text-muted-foreground">Account Balance</p>
            <p className="text-xl font-bold text-green-500">$125,430.50</p>
          </div>
        </div>
        <ScrollArea className="px-1">
          <div className="space-y-1 p-2">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={onNavClick}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
          <div className="px-4 py-2 mt-8">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={onNavClick}
              ></Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden fixed left-4 top-4 z-40 hover:bg-slate-800"
            size="icon"
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0 border-slate-800">
          <SidebarContent onNavClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "fixed top-0 left-0 z-30 hidden h-screen border-r border-slate-800 md:block",
          className
        )}
      >
        <SidebarContent />
      </aside>

      {/* Content Offset for Desktop */}
      <div className="hidden md:block md:w-64" />
    </>
  );
}
