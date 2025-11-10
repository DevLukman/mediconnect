import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserSession } from "@/lib/action/getSession";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Dashboard",
  description: "View your Dashboard",
};
export default async function Page() {
  const session = await getUserSession();
  return (
    <section>
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {session?.user.name}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm font-normal">
          Here is the latest update. Check now
        </p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardContent>
            <h2 className="mb-1 text-lg font-semibold">$300.00</h2>
            <p className="text-muted-foreground mt-2 text-sm font-normal">
              This is the total amount you&apos;ve spent on your appointments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="mb-1 text-lg font-semibold">1</h2>
            <p className="text-muted-foreground mt-2 text-sm font-normal">
              This is the total number of appointments you&apos;ve had
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="mb-1 text-lg font-semibold">1</h2>
            <p className="text-muted-foreground mt-2 text-sm font-normal">
              This is the number of upcoming appointments you have scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="mb-1 text-lg font-semibold">0</h2>
            <p className="text-muted-foreground mt-2 text-sm font-normal">
              This is the number of appointments you have cancelled
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Appointments</h3>
        <p className="text-muted-foreground text-sm font-normal">
          A list of your upcoming appointments (showing up to 5)
        </p>
      </div>
      <div className="border-border mt-6 overflow-hidden rounded-lg border pb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Speciality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>iaOSt</TableCell>
              <TableCell>Dr. Lukas Flick</TableCell>
              <TableCell>2:00 PM</TableCell>
              <TableCell>2:30 PM</TableCell>
              <TableCell>Dermatology</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
