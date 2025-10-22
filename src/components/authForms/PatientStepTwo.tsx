"use client";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PatientStepTwoFormData, patientStepTwoSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

interface PatientStepTwoProps {
  onComplete: (data: PatientStepTwoFormData) => void;
  isSubmitting: boolean;
}

export default function PatientStepTwo({
  onComplete,
  isSubmitting,
}: PatientStepTwoProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientStepTwoFormData>({
    resolver: zodResolver(patientStepTwoSchema),
  });

  const dateOfBirth = watch("dateOfBirth");

  function onSubmit(data: PatientStepTwoFormData) {
    onComplete(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <FieldSet className="flex flex-col gap-3">
        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-[180px]" id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="PREFER_NOT_TO_SAY">
                        Prefer not to say
                      </SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.gender.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="genotype">Genotype</FieldLabel>
            <Controller
              name="genotype"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-[180px]" id="genotype">
                    <SelectValue placeholder="Select genotype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="AA">AA</SelectItem>
                      <SelectItem value="AS">AS</SelectItem>
                      <SelectItem value="SS">SS</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.genotype?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.genotype.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="bloodtype">Blood Group</FieldLabel>
            <Controller
              name="bloodtype"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-[180px]" id="bloodtype">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bloodtype?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.bloodtype.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="dateOfBirth">Date of birth</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="dateOfBirth"
                  type="button"
                  disabled={isSubmitting}
                  className="w-48 justify-between font-normal"
                >
                  {dateOfBirth
                    ? new Date(dateOfBirth).toLocaleDateString()
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
                  selected={dateOfBirth ? new Date(dateOfBirth) : undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) {
                      setValue("dateOfBirth", date.toISOString(), {
                        shouldValidate: true,
                      });
                    }
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors.dateOfBirth?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.dateOfBirth.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
            <Input
              id="occupation"
              type="text"
              disabled={isSubmitting}
              {...register("occupation")}
            />
            {errors.occupation?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.occupation.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="phone">Mobile Number</FieldLabel>
            <Input
              id="phone"
              type="tel"
              disabled={isSubmitting}
              {...register("phone")}
            />
            {errors.phone?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.phone.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              type="text"
              disabled={isSubmitting}
              {...register("address")}
            />
            {errors.address?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.address.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="mt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? <Spinner /> : "Sign up"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
