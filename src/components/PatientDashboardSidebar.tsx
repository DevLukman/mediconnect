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
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

type DashboardSide = {
  props?: React.ComponentProps<typeof Sidebar>;
};

export function PatientDashboardSidebar({ ...props }: DashboardSide) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-6">
        <DashboardLogo />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="">
        <PatientNav />
      </SidebarContent>
      <SidebarFooter className="">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
