"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { DOCTORLINKS, DoctorRoute } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DoctorNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {DOCTORLINKS.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.url as DoctorRoute}
              className={cn(
                `rounded-lg ${
                  pathname.startsWith(item.url)
                    ? "bg-primary text-secondary"
                    : "hover:bg-secondary"
                } transition-all ease-in-out py-1`
              )}
            >
              <SidebarMenuButton
                tooltip={item.name}
                className="cursor-pointer pointer-events-none"
              >
                {item.icon && <item.icon />}
                <span className="text-base capitalize">{item.name}</span>
              </SidebarMenuButton>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
