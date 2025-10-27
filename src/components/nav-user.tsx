"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { DeleteUser, Logout } from "@/lib/action/authAction";
import {
  ChevronsUpDown,
  Headset,
  HouseHeart,
  LogOut,
  Moon,
  Trash,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Notification } from "./Notification";
import { Spinner } from "./ui/spinner";
import { useTheme } from "next-themes";

export function NavUser({ username }: { username: string | null }) {
  const router = useRouter();
  const pathname = usePathname().split("/")[1] as string;
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
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
    try {
      setLoading(true);
      const result = await DeleteUser();
      if (result.success) {
        toast.success(result.message);
        router.push("/signup");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      const e = err as Error;
      toast.error(
        e.message || "Something went wrong while deleting your account."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={loading}
              className="flex items-center  justify-center"
            >
              {loading ? <Spinner /> : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                    <AvatarFallback className="rounded-lg">
                      {(username?.slice(0, 2) ?? "CN").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{username}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 mx-2 rounded-lg"
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
                    <DropdownMenuItem
                      className="focus:bg-primary w-full
                      cursor-pointer focus:text-secondary"
                    >
                      <Headset />
                      <span>Customer support</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="focus:bg-primary cursor-pointer focus:text-secondary"
                    onClick={handleToggleTheme}
                  >
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

                  {/* Open Delete Dialog */}
                  <DropdownMenuItem
                    onClick={() => setOpen(true)}
                    className="focus:bg-destructive cursor-pointer hover:text-secondary focus:text-secondary"
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
    </>
  );
}
