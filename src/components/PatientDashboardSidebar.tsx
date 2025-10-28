"use client";

import * as React from "react";

import { DashboardLogo } from "@/components/DashboardLogo";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PatientNav } from "./PatientNav";
import { Separator } from "./ui/separator";

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  username: string | null;
  image: string | null;
};

export function PatientDashboardSidebar({
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
        <PatientNav />
      </SidebarContent>
      <SidebarFooter>
        <NavUser username={username} image={image} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
