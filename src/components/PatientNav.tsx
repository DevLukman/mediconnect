"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PATIENTLINKS } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const PATIENT_ROUTES = {
  dashboard: "/patient/dashboard",
  doctors: "/patient/doctors",
  appointments: "/patient/appointments",
  settings: "/patient/settings",
} as const;

export type PatientRoute = (typeof PATIENT_ROUTES)[keyof typeof PATIENT_ROUTES];
export function PatientNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {PATIENTLINKS.map((item) => (
          <Link
            key={item.name}
            href={item.url as PatientRoute}
            className={cn(
              "rounded-lg py-1 transition-all ease-in-out",
              pathname === item.url
                ? "bg-primary text-secondary"
                : "hover:bg-secondary",
            )}
          >
            <SidebarMenuButton
              tooltip={item.name}
              className="pointer-events-none"
            >
              {item.icon && <item.icon />}
              <span className="text-sm capitalize">{item.name}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
