"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PatientBookings, PatientBookingsTypes } from "@/lib/types";
import { DURATIONS } from "@/utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCalendarPlus } from "@intentui/icons";
import { ChevronDownIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { TimeField, DateInput, DateSegment } from "react-aria-components";
import { Textarea } from "../ui/textarea";
export function PatientBookingsForm({
  doctorId,
  name,
}: {
  doctorId: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<PatientBookingsTypes>({
    resolver: zodResolver(PatientBookings),
    defaultValues: {
      doctorId: doctorId,
      appointmentDate: "",
      appointmentDuration: "",
      appointmentTime: "",
      reasonForVisit: "",
    },
  });

  async function handleDoctorBooking(data: PatientBookingsTypes) {
    console.log(data);
  }

  const appointmentDate = watch("appointmentDate");

  return (
    <Dialog>
      <>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="text-secondary flex cursor-pointer items-center gap-2 px-5"
          >
            <span>
              <IconCalendarPlus />
            </span>
            <span>Book Appointment</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription>
              Book your next appointment quickly and easily. Choose a date,
              time, and service that works best for you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleDoctorBooking)}>
            <FieldGroup className="gap-3">
              <Controller
                name="doctorId"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Doctor ID</FieldLabel>
                    <Input
                      {...field}
                      value={field.value || ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      disabled={true}
                      type="text"
                    />
                    <FieldDescription>
                      A unique identifier for Dr.{" "}
                      <span className="capitalize">{name}</span>
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex w-full items-center gap-2">
                <div className="flex-2">
                  <Controller
                    name="appointmentDate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor={field.name}>
                          Appointment Date
                        </FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id={field.name}
                              type="button"
                              disabled={isSubmitting}
                              aria-invalid={fieldState.invalid}
                              className="w-48 justify-between font-normal"
                            >
                              {appointmentDate
                                ? new Date(appointmentDate).toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                appointmentDate
                                  ? new Date(appointmentDate)
                                  : undefined
                              }
                              captionLayout="dropdown"
                              disabled={(date) => {
                                return date < today;
                              }}
                              onSelect={(date) => {
                                if (date) {
                                  setValue(
                                    "appointmentDate",
                                    date.toISOString(),
                                    {
                                      shouldValidate: true,
                                    },
                                  );
                                }
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="appointmentTime"
                    control={control}
                    render={({ field: { onChange, name }, fieldState }) => (
                      <Field>
                        <FieldLabel id="time-label" htmlFor={name}>
                          Appointment Time
                        </FieldLabel>

                        <TimeField
                          aria-label="Appointment Time"
                          id={name}
                          isDisabled={isSubmitting}
                          onChange={(val) => {
                            const formattedTime = val
                              ? `${val.hour.toString().padStart(2, "0")}:${val.minute.toString().padStart(2, "0")}`
                              : "";
                            onChange(formattedTime);
                          }}
                        >
                          <DateInput className="border-border bg-background flex gap-1 rounded border p-1.5 sm:p-2">
                            {(segment) => (
                              <DateSegment
                                segment={segment}
                                className="focus:bg-primary rounded text-sm tabular-nums focus:text-white focus:outline-none sm:text-base md:px-px"
                              />
                            )}
                          </DateInput>
                        </TimeField>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
              <Controller
                name="appointmentDuration"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Appointment duration
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        className="w-[180px]"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {DURATIONS.map((duration, index) => (
                            <SelectItem key={index} value={duration}>
                              {duration} minutes
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="reasonForVisit"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Reason for visit
                    </FieldLabel>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </>
    </Dialog>
  );
}
