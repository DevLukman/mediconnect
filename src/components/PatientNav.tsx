"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { PATIENTLINKS } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function PatientNav() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {PATIENTLINKS.map((item) => (
          <Link
            key={item.name}
            href={`${item.url}`}
            className={`rounded-lg ${pathname === item.url ? "bg-primary text-secondary" : "hover:bg-secondary"} transition-all ease-in-out 
           py-1`}
          >
            <SidebarMenuButton
              tooltip={item.name}
              className="cursor-pointer pointer-events-none"
            >
              {item.icon && <item.icon />}
              <span className="text-base capitalize">{item.name}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
