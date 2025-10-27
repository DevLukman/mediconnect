"use client";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Role, ROLE_ROUTES } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "./LogoIcon";

export function DashboardLogo() {
  const pathname = usePathname();
  const role = pathname.split("/")[1] as Role;
  if (!role || !(role in ROLE_ROUTES)) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={ROLE_ROUTES[role]} className="flex items-center gap-2">
          <LogoIcon />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-2xl font-bold">Mediconnect</span>
          </div>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
