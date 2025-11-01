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
import { DoctorBookings, DoctorBookingsTypes } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, PlusCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DURATIONS } from "@/utils/constant";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Spinner } from "./ui/spinner";

export function DoctorBookingsForm() {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<DoctorBookingsTypes>({
    resolver: zodResolver(DoctorBookings),
    defaultValues: {
      patientId: undefined,
      appointmentDate: undefined,
      appointmentDuration: undefined,
      appointmentTime: undefined,
      reasonForVisit: undefined,
    },
  });

  async function handleDoctorBooking(data: DoctorBookingsTypes) {
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
              <PlusCircle />
            </span>
            <span>Add Appointment</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription>
              Book your next appointment quickly and easily. Choose a date and
              time that works best for you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleDoctorBooking)}>
            <FieldGroup className="gap-3">
              <Controller
                name="patientId"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Patient ID</FieldLabel>
                    <Input
                      {...field}
                      value={field.value || ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                      type="text"
                    />
                    <FieldDescription>
                      A 6-digit number used for identifying patients
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
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
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
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Appointment Time
                        </FieldLabel>
                        <Input
                          {...field}
                          value={field.value || ""}
                          aria-invalid={fieldState.invalid}
                          type="time"
                          id={field.name}
                          disabled={isSubmitting}
                          step="1"
                          className="bg-background mt-1 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
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
                    <Input
                      {...field}
                      value={field.value || ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="text"
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
