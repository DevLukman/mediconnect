"use client";
import { CalendarPlus2 } from "lucide-react";
import { TableCell, TableRow } from "./ui/table";
import { DoctorBookingsForm } from "./DoctorBookingsForm";
import { GridPatterns } from "./GridPatterns";
import { useTheme } from "next-themes";

export function EmptyState({ colSpan = 10 }) {
  const { theme } = useTheme();
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center">
        <div className="relative flex h-full flex-col items-center justify-center py-4">
          {theme === "dark" && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
              <GridPatterns />
            </div>
          )}
          <div className="relative z-10">
            <CalendarPlus2 className="text-muted-foreground mx-auto mb-4 size-12" />
            <h3 className="mb-2 text-lg font-semibold">
              No appointments scheduled
            </h3>
            <p className="text-muted-foreground text-sm">
              You can add a new appointment or wait for patient bookings.
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center pt-3 pb-6">
          <DoctorBookingsForm />
        </div>
      </TableCell>
    </TableRow>
  );
}
