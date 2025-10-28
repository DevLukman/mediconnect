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
  image: string | null;
};
export function DashboardSidebar({
  username,
  image,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-6">
        <DashboardLogo />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <DoctorNav />
      </SidebarContent>
      <SidebarFooter>
        <NavUser username={username} image={image} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
