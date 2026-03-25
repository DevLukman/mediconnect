import DashboardHeader from "@/components/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PatientDashboardSidebar } from "@/components/patient/PatientDashboardSidebar";
import { getUserSession } from "@/lib/action/getSession";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mediconnect | Patient",
  description:
    "View your appointments, medical records, and manage your healthcare.",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  const username = session?.user.name ?? null;
  const image = session?.user.image ?? null;
  return (
    <SidebarProvider>
      <PatientDashboardSidebar username={username} image={image} />
      <SidebarInset>
        <DashboardHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
