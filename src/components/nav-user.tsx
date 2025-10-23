"use client";
import {
  ChevronsUpDown,
  Headset,
  HouseHeart,
  LogOut,
  Moon,
  Trash,
  UserRoundPen,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Notification } from "./Notification";
import { usePathname, useRouter } from "next/navigation";
import { DeleteUser, Logout } from "@/lib/action/authAction";
import { toast } from "sonner";

export function NavUser({ username }: { username: string | null }) {
  const router = useRouter();
  const pathname = usePathname().split("/")[1];
  const { isMobile } = useSidebar();
  async function handleLogout() {
    const result = await Logout();
    if (result.success) {
      toast.success(result.message);
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  }
  async function handleDeleteAccount() {
    const result = await DeleteUser();
    if (result.success) {
      toast.success(result.message);
      router.push("/signup");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div className="flex items-center">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{username}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 mx-2 rounded-lg"
              side={isMobile ? "bottom" : "top"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <Link
                  href={`/${pathname}/dashboard`}
                  className="flex items-center gap-2"
                >
                  <DropdownMenuItem className="focus:bg-primary w-full cursor-pointer focus:text-secondary">
                    <HouseHeart />
                    <span>Home</span>
                  </DropdownMenuItem>
                </Link>
                <Link
                  href={`/${pathname}/settings`}
                  className="flex items-center gap-2"
                >
                  <DropdownMenuItem className="focus:bg-primary w-full cursor-pointer focus:text-secondary">
                    <UserRoundPen />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/"} className="flex items-center gap-2">
                  <DropdownMenuItem className="focus:bg-primary w-full cursor-pointer focus:text-secondary">
                    <Headset />
                    <span>Customer support</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-primary cursor-pointer focus:text-secondary">
                  <Moon />
                  Toggle Theme
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="focus:bg-primary cursor-pointer focus:text-secondary"
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-primary cursor-pointer hover:text-secondary focus:text-secondary"
                  onClick={handleDeleteAccount}
                >
                  <Trash />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Notification />
    </div>
  );
}
