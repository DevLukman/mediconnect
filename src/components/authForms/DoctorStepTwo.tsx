"use client";
import { DoctorStepTwoFormData, doctorStepTwoSchema } from "@/lib/types";
import { specialists } from "@/utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NumberField } from "../NumberInput";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import { Textarea } from "../ui/textarea";

interface DoctorStepTwoProps {
  onComplete: (data: DoctorStepTwoFormData) => void;
  isSubmitting: boolean;
}

export default function DoctorStepTwo({
  onComplete,
  isSubmitting,
}: DoctorStepTwoProps) {
  const { handleSubmit, control } = useForm<DoctorStepTwoFormData>({
    resolver: zodResolver(doctorStepTwoSchema),
    defaultValues: {
      specialty: undefined,
      yearsOfExperience: undefined,
      consultationFee: undefined,
      startTime: "09:00:00",
      endTime: "16:00:00",
      bio: "",
    },
  });

  function onSubmit(data: DoctorStepTwoFormData) {
    onComplete(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex flex-col gap-3">
        <FieldGroup>
          <Controller
            name="specialty"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Specialty</FieldLabel>
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
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {specialists.map((specialty, index) => (
                        <SelectItem key={index} value={specialty}>
                          {specialty}
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
            control={control}
            name="yearsOfExperience"
            render={({ field, fieldState }) => (
              <Field>
                <NumberField
                  {...field}
                  id={field.name}
                  label="Years of Experience"
                  minValue={1}
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  isDisabled={isSubmitting}
                  isInvalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="consultationFee"
            render={({ field, fieldState }) => (
              <Field>
                <NumberField
                  {...field}
                  id="price"
                  minValue={10}
                  label="Consultation Fee"
                  isDisabled={isSubmitting}
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  formatOptions={{
                    style: "currency",
                    currency: "USD",
                  }}
                />
                <FieldDescription>
                  You can always make changes to the fee
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field orientation={"horizontal"}>
            <div>
              <Controller
                name="startTime"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                    <Input
                      {...field}
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
            <div>
              <Controller
                name="endTime"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                    <Input
                      {...field}
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
          </Field>

          <Controller
            name="bio"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor={field.name}>About</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="min-h-28 w-full"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="mt-2 w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : "Sign up"}
          </Button>
        </div>
      </div>
    </form>
  );
}
