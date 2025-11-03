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
import { specialists } from "@/utils/constant";
import { Filter } from "lucide-react";
import Form from "next/form";
import { NumberField } from "./NumberInput";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function DoctorFilter() {
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
                <FieldLabel htmlFor="speciality">Speciality</FieldLabel>
                <Select name="specialty" defaultValue="All">
                  <SelectTrigger className="w-full" id="speciality">
                    <SelectValue placeholder="Select a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="All">All</SelectItem>
                      {specialists.map((specialty, index) => (
                        <SelectItem key={index} value={specialty}>
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
                    <Input
                      name="startTime"
                      type="time"
                      id="startTime"
                      step="1"
                      className="bg-background mt-1 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </Field>
                </div>
                <div>
                  <Field>
                    <FieldLabel htmlFor="endTime">End Time</FieldLabel>
                    <Input
                      name="endTime"
                      type="time"
                      id="endTime"
                      step="1"
                      className="bg-background mt-1 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </Field>
                </div>
              </Field>
            </FieldGroup>
            <SheetFooter
              className={cn(
                "border-border flex w-full flex-row gap-4 border-t",
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
