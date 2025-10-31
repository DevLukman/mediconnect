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
import { bloodTypes, genders, genotypes } from "@/utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
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
  const { handleSubmit, control, setValue, watch } =
    useForm<PatientStepTwoFormData>({
      resolver: zodResolver(patientStepTwoSchema),
      defaultValues: {
        gender: undefined,
        genotype: undefined,
        bloodType: undefined,
        dateOfBirth: "",
        occupation: "",
        phone: "",
        address: "",
      },
    });

  const dateOfBirth = watch("dateOfBirth");

  function onSubmit(data: PatientStepTwoFormData) {
    onComplete(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex flex-col gap-3">
        <FieldGroup>
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className="w-[180px]"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {genders.map((gender, index) => (
                        <SelectItem key={index} value={gender}>
                          {gender}
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
            name="genotype"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Genotype</FieldLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className="w-[180px]"
                    id="genotype"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select genotype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {genotypes.map((genotype, index) => (
                        <SelectItem key={index} value={genotype}>
                          {genotype}
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
            name="bloodType"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>BloodType</FieldLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className="w-[180px]"
                    id="bloodtype"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {bloodTypes.map((blood, index) => (
                        <SelectItem value={blood} key={index}>
                          {blood}
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
            name="dateOfBirth"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="occupation"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor={field.name}>Occupation</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor={field.name}>Mobile number</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          {isSubmitting ? <Spinner /> : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
