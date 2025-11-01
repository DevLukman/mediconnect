import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CalendarPlus2, EllipsisVertical } from "lucide-react";
import DatePicker from "./DatePicker";
import { DoctorBookingsForm } from "./DoctorBookingsForm";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function DoctorAppointmentContent() {
  return (
    <div>
      <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="mb-2 text-xl font-semibold">Appointments</h1>
          <p className="text-muted-foreground mt-2 text-sm font-normal">
            Manage your appointments and schedules with ease.
          </p>
        </div>
        <div>
          <DoctorBookingsForm />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="border-border rounded-sm border px-2 py-2">
            <CalendarPlus2 className="size-4" />
          </span>
          <span className="text-muted-foreground text-sm">Appointments</span>
        </div>
        <div>
          <DatePicker defaultValue={new Date()} />
        </div>
      </div>

      <div className="border-border mt-8 overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Birth Date</TableHead>
              <TableHead>Timing</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>iaOStm-RQQgTqJ_hPxmHH</TableCell>
              <TableCell>Hecofag Hecofag</TableCell>
              <TableCell>
                <Badge variant={"success"}>Confirmed</Badge>
              </TableCell>
              <TableCell>Oct 16, 2025</TableCell>
              <TableCell>2:00 PM - 2:30 PM </TableCell>
              <TableCell className="capitalize"> male</TableCell>
              <TableCell> A+</TableCell>
              <TableCell> Dec 23, 1990</TableCell>
              <TableCell>
                <Badge variant={"outline"}>Past</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open appointment actions menu"
                  className="size-6 cursor-pointer"
                >
                  <EllipsisVertical size={14} />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>iaOStm-RQQgTqJ_hPxmHH</TableCell>
              <TableCell>Hecofag Hecofag</TableCell>
              <TableCell>
                <Badge variant={"success"}>Confirmed</Badge>
              </TableCell>
              <TableCell>Oct 16, 2025</TableCell>
              <TableCell>2:00 PM - 2:30 PM </TableCell>
              <TableCell className="capitalize"> male</TableCell>
              <TableCell> A+</TableCell>
              <TableCell> Dec 23, 1990</TableCell>
              <TableCell>
                <Badge variant={"outline"}>Past</Badge>
              </TableCell>
              <TableCell>
                <EllipsisVertical size={14} cursor={"pointer"} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
