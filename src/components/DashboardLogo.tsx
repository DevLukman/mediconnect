"use client";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLogo() {
  const pathname = usePathname().split("/")[1];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link
          href={`/${pathname}/dashboard`}
          className="flex items-center gap-2"
        >
          <svg
            viewBox="0 0 100 100"
            width={30}
            height={30}
            fill="none"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="45" fill="#0EA5E9" />
            <rect x="45" y="25" width="10" height="50" fill="white" rx="2" />
            <rect x="25" y="45" width="50" height="10" fill="white" rx="2" />
          </svg>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-2xl font-bold">Mediconnect</span>
          </div>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
