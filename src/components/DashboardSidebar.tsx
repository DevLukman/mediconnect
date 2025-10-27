"use client";

import * as React from "react";

import { DashboardLogo } from "@/components/DashboardLogo";
import { DoctorNav } from "@/components/DoctorNav";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  username: string | null;
};
export function DashboardSidebar({
  username,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-red-500">
      <SidebarHeader className="py-6">
        <DashboardLogo />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="">
        <DoctorNav />
      </SidebarContent>
      <SidebarFooter className="">
        <NavUser username={username || null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
