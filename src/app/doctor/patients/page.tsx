import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarPlus2, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import Form from "next/form";

export const metadata: Metadata = {
  title: "Mediconnect | Patients",
  description: "View patient information",
};

export default function Page() {
  return (
    <section>
      <div>
        <div>
          <h1 className="mb-2 text-xl font-semibold">Patients</h1>
          <p className="text-muted-foreground mt-2 text-sm font-normal">
            This is the list of all the patients you have attended to
          </p>
        </div>
        <div className="mt-6 flex w-full flex-col gap-3 md:flex-row md:justify-between md:gap-6">
          <div className="flex items-center gap-2">
            <span className="border-border rounded-sm border px-2 py-2">
              <CalendarPlus2 className="size-4" />
            </span>
            <span className="text-muted-foreground text-base">
              Appointments
            </span>
          </div>
          <Form
            action={"/patient/appointments"}
            className="flex w-full flex-1 items-center gap-2"
          >
            <InputGroup className="py-5">
              <InputGroupInput placeholder="Search for patient..." />

              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <Button>
              <SearchIcon />
            </Button>
          </Form>
        </div>
        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Patient Since</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Lukas Flick</TableCell>
                <TableCell>Male</TableCell>
                <TableCell>A+</TableCell>
                <TableCell>12/23/1990</TableCell>
                <TableCell>Lukas@example.com</TableCell>
                <TableCell>10/16/2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lukas Flick</TableCell>
                <TableCell>Male</TableCell>
                <TableCell>A+</TableCell>
                <TableCell>12/23/1990</TableCell>
                <TableCell>Lukas@example.com</TableCell>
                <TableCell>10/16/2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lukas Flick</TableCell>
                <TableCell>Male</TableCell>
                <TableCell>A+</TableCell>
                <TableCell>12/23/1990</TableCell>
                <TableCell>Lukas@example.com</TableCell>
                <TableCell>10/16/2025</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
