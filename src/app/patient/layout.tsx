import DashboardHeader from "@/components/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PatientDashboardSidebar } from "@/components/PatientDashboardSidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <PatientDashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="px-8 py-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
