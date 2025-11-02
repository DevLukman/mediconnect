import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarPlus2,
  EllipsisVertical,
  PlusCircle,
  SearchIcon,
} from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export default function PatientAppointmentContent() {
  return (
    <div>
      <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="mb-2 text-xl font-semibold">Appointments</h1>
          <p className="text-muted-foreground mt-2 text-sm font-normal">
            View and manage your past and upcoming appointments.
          </p>
          <p className="text-muted-foreground text-sm font-normal">
            Schedule new appointments or reschedule existing ones with ease.
          </p>
        </div>
        <div>
          <Link href={"/patient/doctors"}>
            <Button
              type="button"
              className="text-secondary flex w-full cursor-pointer items-center gap-2 px-5"
            >
              <span>
                <PlusCircle />
              </span>
              <span>Add Appointment</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="border-border rounded-sm border px-2 py-2">
          <CalendarPlus2 className="size-4" />
        </span>
        <span className="text-muted-foreground text-sm">Appointments</span>
      </div>
      <div className="mt-6 flex w-full flex-col gap-4 md:flex-row md:gap-8">
        <Form
          action={"/patient/appointments"}
          className="flex w-full flex-1 items-center gap-2"
        >
          <InputGroup className="py-5">
            <InputGroupInput placeholder="Search appointments by doctor's name or specialization" />

            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Button>
            <SearchIcon />
          </Button>
        </Form>

        <Select defaultValue="All">
          <SelectTrigger className="w-full py-5 md:w-[200px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Past">Past</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="border-border mt-4 overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timing</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>iaOStm-RQQgTqJ_hPxmHH</TableCell>
              <TableCell>October 17, 2025 at 1:00 PM</TableCell>
              <TableCell>October 17, 2025 at 2:00 PM</TableCell>
              <TableCell>Dr. danilm danilm</TableCell>
              <TableCell className="capitalize">dermatology</TableCell>
              <TableCell>
                <Badge variant={"success"}>Confirmed</Badge>
              </TableCell>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
