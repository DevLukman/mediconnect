"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { specialists } from "@/utils/constant";
import { Filter } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import type { TimeValue } from "react-aria-components";
import { DateInput, DateSegment, TimeField } from "react-aria-components";
import { NumberField } from "../NumberInput";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export default function DoctorFilter() {
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter size={10} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-3">
          <SheetTitle className="text-xl font-semibold">Filter</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Form action={"/patient/doctors"}>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="specialty">Specialty</FieldLabel>
                <Select name="specialty" defaultValue="All">
                  <SelectTrigger className="w-full" id="specialty">
                    <SelectValue placeholder="Select a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="All">All</SelectItem>
                      {specialists.map((specialty, index) => (
                        <SelectItem
                          className="capitalize"
                          key={index}
                          value={specialty}
                        >
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <NumberField
                  name="minExperience"
                  id="min-experience"
                  label="Minimum Years of Experience"
                  placeholder="Minimum Years of Experience"
                  minValue={1}
                />
              </Field>
              <Field>
                <NumberField
                  name="maxExperience"
                  id="max-experience"
                  label="Maximum Years of Experience"
                  placeholder="Maximum Years of Experience"
                  minValue={1}
                />
              </Field>
              <Field orientation={"horizontal"}>
                <div>
                  <Field>
                    <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
                    <TimeField
                      id="startTime"
                      onChange={(val) => setStartTime(val)}
                    >
                      <DateInput className="border-border flex gap-1 rounded border p-1.5 sm:p-2">
                        {(segment) => (
                          <DateSegment
                            segment={segment}
                            className="focus:bg-primary rounded text-sm tabular-nums focus:text-white focus:outline-none sm:text-base md:px-px"
                          />
                        )}
                      </DateInput>
                    </TimeField>
                    <input
                      type="hidden"
                      name="startTime"
                      value={
                        startTime
                          ? `${startTime.hour.toString().padStart(2, "0")}:${startTime.minute.toString().padStart(2, "0")}`
                          : ""
                      }
                    />
                  </Field>
                </div>
                <div>
                  <Field>
                    <FieldLabel htmlFor="endTime">End Time</FieldLabel>
                    <TimeField id="endTime" onChange={(val) => setEndTime(val)}>
                      <DateInput className="border-border flex gap-1 rounded border p-1.5 sm:p-2">
                        {(segment) => (
                          <DateSegment
                            segment={segment}
                            className="focus:bg-primary rounded text-sm tabular-nums focus:text-white focus:outline-none sm:text-base md:px-px"
                          />
                        )}
                      </DateInput>
                    </TimeField>
                    <input
                      type="hidden"
                      name="endTime"
                      value={
                        endTime
                          ? `${endTime.hour.toString().padStart(2, "0")}:${endTime.minute.toString().padStart(2, "0")}`
                          : ""
                      }
                    />
                  </Field>
                </div>
              </Field>
            </FieldGroup>
            <SheetFooter
              className={cn(
                "border-border mt-4 flex w-full flex-row gap-4 border-t",
              )}
            >
              <SheetClose asChild>
                <Button variant="outline" type="button" className="flex-1">
                  Close
                </Button>
              </SheetClose>
              <Button type="submit" className="flex-1">
                Apply Filter
              </Button>
            </SheetFooter>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
