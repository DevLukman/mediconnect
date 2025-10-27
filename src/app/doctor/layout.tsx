import { DashboardSidebar } from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserSession } from "@/lib/action/getSession";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor",
  description:
    "Manage your appointments, view patient information, and update your availability.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  const username = session?.user.name;
  return (
    <SidebarProvider>
      <DashboardSidebar username={username || null} />
      <SidebarInset>
        <DashboardHeader />
        <main className="px-8 py-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
