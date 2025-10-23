"use client";

import * as React from "react";

import { NavMain } from "@/components/DoctorNav";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/DashboardLogo";
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

export function PaitentSideBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-red-500">
      <SidebarHeader className="py-6">
        <TeamSwitcher />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="">
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
