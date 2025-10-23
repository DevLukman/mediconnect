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
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

type DashboardSide = {
  username: string | null;
  props?: React.ComponentProps<typeof Sidebar>;
};

export function DashboardSidebar({ username, ...props }: DashboardSide) {
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
