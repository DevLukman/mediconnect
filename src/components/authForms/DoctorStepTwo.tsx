"use client";
import { DoctorStepTwoFormData, doctorStepTwoSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NumberField } from "../NumberInput";
import { Button } from "../ui/button";
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
import { Textarea } from "../ui/textarea";

interface DoctorStepTwoProps {
  onComplete: (data: DoctorStepTwoFormData) => void;
  isSubmitting: boolean;
}

export default function DoctorStepTwo({
  onComplete,
  isSubmitting,
}: DoctorStepTwoProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DoctorStepTwoFormData>({
    resolver: zodResolver(doctorStepTwoSchema),
    defaultValues: {
       specialty : undefined,
      yearsOfExperience: undefined,
      consultationFee : undefined,
      startTime: "10:00:00",
      endTime: "18:00:00",
      bio: "",
    },
  });

  function onSubmit(data: DoctorStepTwoFormData) {
    onComplete(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <FieldSet className="flex flex-col gap-3">
        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="specialization">Specialization</FieldLabel>
            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-[180px]" id="specialization">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Therapists">Therapists</SelectItem>
                      <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="Dermatologist">
                        Dermatologist
                      </SelectItem>
                      <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                      <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                      <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                      <SelectItem value="Neurologist">Neurologist</SelectItem>
                      <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                      <SelectItem value="Ophthalmologist">
                        Ophthalmologist
                      </SelectItem>
                      <SelectItem value="ENT Specialist">
                        ENT Specialist
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.specialty ?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.specialty .message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <Controller
              control={control}
              name="yearsOfExperience"
              render={({ field }) => (
                <NumberField
                  id="yearsOfExperience"
                  label="Years of Experience"
                  minValue={1}
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  isDisabled={isSubmitting}
                />
              )}
            />
            {errors.yearsOfExperience?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.yearsOfExperience.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <Controller
              control={control}
              name="consultationFee"
              render={({ field }) => (
                <NumberField
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
              )}
            />
            {errors.consultationFee ?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.consultationFee .message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field orientation={"horizontal"}>
            <div>
              <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
              <Input
                {...register("startTime")}
                type="time"
                id="startTime"
                disabled={isSubmitting}
                step="1"
                className="bg-background appearance-none mt-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              {errors.startTime?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.startTime.message}
                </FieldError>
              )}
            </div>
            <div>
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <Input
                {...register("endTime")}
                type="time"
                id="endTime"
                disabled={isSubmitting}
                step="1"
                className="bg-background mt-1 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              {errors.endTime?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.endTime.message}
                </FieldError>
              )}
            </div>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="bio">About</FieldLabel>
            <Textarea id="bio" {...register("bio")} disabled={isSubmitting} />
            {errors.bio?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.bio.message}
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
