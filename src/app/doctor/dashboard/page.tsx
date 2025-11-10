import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserSession } from "@/lib/action/getSession";
import {
  IconChartTrending,
  IconDotsHorizontal,
  IconMoneybag,
  IconPersonAdd,
} from "@intentui/icons";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mediconnect | Dashboard",
  description: "Manage your appointments, view patient information",
};

export default async function Page() {
  const session = await getUserSession();

  return (
    <section>
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, Dr. {session?.user.name}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm font-normal">
          Here is the latest update for your career. Check now
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Card className={"py-4"}>
          <CardHeader className={"mb-4 flex items-center justify-between px-3"}>
            <div className="flex items-center gap-3">
              <span className="border-border rounded-sm border px-1.5 py-1">
                <IconMoneybag className="size-5" />
              </span>

              <span className="text-muted-foreground text-sm font-semibold">
                Total Consultations
              </span>
            </div>
            <div>
              <Button size="icon-sm" variant={"ghost"}>
                <IconDotsHorizontal />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <div>
              <h1 className="text-[32px] font-bold">$225.00</h1>
              <p className="text-xs font-medium">
                Gross earnings from completed consultations. Excludes fees,
                taxes, and deductions. May differ from final pay.
              </p>
            </div>
            <div className="mt-4">
              <div
                className="h-2 rounded-full bg-green-600"
                style={{
                  width: `100%`,
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className={"py-4"}>
          <CardHeader className={"mb-4 flex items-center justify-between px-3"}>
            <div className="flex items-center gap-3">
              <span className="border-border rounded-sm border px-1.5 py-1">
                <IconChartTrending className="size-5" />
              </span>

              <span className="text-muted-foreground text-sm font-semibold">
                Total Consultations
              </span>
            </div>
            <div>
              <Button size="icon-sm" variant={"ghost"}>
                <IconDotsHorizontal />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <div>
              <h1 className="text-[32px] font-bold">0</h1>
              <p className="text-xs font-medium">
                Data obtained for the last 7 days from 0 Visitors to 0 Visitors.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `75%`,
                }}
              />
              <span className="text-muted-foreground block text-xs font-normal">
                0 today
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className={"py-4"}>
          <CardHeader className={"mb-4 flex items-center justify-between px-3"}>
            <div className="flex items-center gap-3">
              <span className="border-border rounded-sm border px-1.5 py-1">
                <IconPersonAdd className="size-5" />
              </span>

              <span className="text-muted-foreground text-sm font-semibold">
                Total Patient
              </span>
            </div>
            <div>
              <Button size="icon-sm" variant={"ghost"}>
                <IconDotsHorizontal />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <div>
              <h1 className="text-3xl font-bold">1</h1>
            </div>
            <div className="mt-4 flex items-center gap-x-5">
              <div>
                <svg
                  width="110"
                  height="55"
                  viewBox="0 0 110 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="30" width="8" height="25" rx="4" fill="#B2F2D8" />
                  <rect
                    x="17"
                    y="20"
                    width="8"
                    height="35"
                    rx="4"
                    fill="#B2F2D8"
                  />
                  <rect x="34" width="8" height="55" rx="4" fill="#82D8BE" />
                  <rect
                    x="51"
                    y="20"
                    width="8"
                    height="35"
                    rx="4"
                    fill="#82D8BE"
                  />
                  <rect
                    x="68"
                    y="5"
                    width="8"
                    height="50"
                    rx="4"
                    fill="#59B29F"
                  />
                  <rect
                    x="85"
                    y="20"
                    width="8"
                    height="35"
                    rx="4"
                    fill="#59B29F"
                  />
                  <rect
                    x="102"
                    y="5"
                    width="8"
                    height="50"
                    rx="4"
                    fill="#59B29F"
                  />
                </svg>
              </div>
              <span className="text-muted-foreground text-xs font-normal">
                Increase in data by 0 patients in the last 7 days
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className={"py-4"}>
          <CardHeader className={"mb-4 flex items-center justify-between px-3"}>
            <div className="flex items-center gap-3">
              <span className="border-border rounded-sm border px-1.5 py-1">
                <IconChartTrending className="size-5" />
              </span>

              <span className="text-muted-foreground text-sm font-semibold">
                Total Consultations
              </span>
            </div>
            <div>
              <Button size="icon-sm" variant={"ghost"}>
                <IconDotsHorizontal />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <div>
              <h1 className="text-[32px] font-bold">0</h1>
              <p className="text-xs font-medium">
                Data obtained for the last 7 days from 0 Visitors to 0 Visitors.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `75%`,
                }}
              />
              <span className="text-muted-foreground block text-xs font-normal">
                0 today
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="py-10">
        <div>
          <h1 className="text-lg font-semibold">Patients</h1>
          <p className="text-muted-foreground text-sm font-normal">
            A list of 5 patients you have attended to. To see more, go to the
            <Link
              className="px-1 font-semibold underline"
              href={"/doctor/patients"}
            >
              patients page.
            </Link>
          </p>
          <div></div>
        </div>
        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>GenoType</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>iaOSt</TableCell>
                <TableCell>Lukas Flick</TableCell>
                <TableCell>Lukas@example.com</TableCell>
                <TableCell>A+</TableCell>
                <TableCell> male</TableCell>
                <TableCell>AA</TableCell>
                <TableCell>12/23/1990 </TableCell>
                <TableCell>truck driver</TableCell>
                <TableCell>08023563085</TableCell>
                <TableCell>no 60 mgbo street</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>iaOSt</TableCell>
                <TableCell>Lukas Flick</TableCell>
                <TableCell>Lukas@example.com</TableCell>
                <TableCell>A+</TableCell>
                <TableCell> male</TableCell>
                <TableCell>AA</TableCell>
                <TableCell>12/23/1990 </TableCell>
                <TableCell>truck driver</TableCell>
                <TableCell>08023563085</TableCell>
                <TableCell>no 60 mgbo street</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="py-10">
        <div>
          <h1 className="text-lg font-semibold">Appointments</h1>
          <p className="text-muted-foreground text-sm font-normal">
            A list of 5 appointments you have today. To see more, go to the
            <Link
              className="px-1 font-semibold underline"
              href={"/doctor/appointments"}
            >
              appointments page.
            </Link>
          </p>
          <div></div>
        </div>
        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment I D</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Patient Email</TableHead>
                <TableHead>BloodType</TableHead>
                <TableHead>Gender</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>iaOSt</TableCell>
                <TableCell>2:00 PM</TableCell>
                <TableCell>2:30 PM</TableCell>
                <TableCell>Lukas Flick</TableCell>
                <TableCell>Lukas@example.com</TableCell>
                <TableCell>0+</TableCell>
                <TableCell>Male </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
