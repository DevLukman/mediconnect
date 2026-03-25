"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { DOCTORLINKS, DoctorRoute } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DoctorNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarGroup className="pt-4">
      <SidebarMenu>
        {DOCTORLINKS.map((item) => {
          return (
            <Link
              onClick={() => setOpenMobile(false)}
              key={item.name}
              href={item.url as DoctorRoute}
              className={cn(
                `rounded-lg ${
                  pathname?.startsWith(item.url)
                    ? "bg-primary text-secondary"
                    : "hover:bg-secondary"
                } py-1 transition-all ease-in-out`,
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
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
