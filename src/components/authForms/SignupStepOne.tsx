"use client";
import { StepOneFormData, stepOneSchema } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

interface StepOneProps {
  onComplete: (data: StepOneFormData) => void;
}

export default function StepOneForm({ onComplete }: StepOneProps) {
  const [showPassword, setShowPassword] = useState(false);
  const getRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7); // Random seed
    // Choose a style: avataaars, bottts, identicon, initials, etc.
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  };
  const avatar: string = getRandomAvatar();

  const getUserTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };
  const timeZone = getUserTimezone();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      image: avatar,
      timeZone,
      country: "",
    },
  });

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setValue("country", data.country_name);
      } catch (error) {
        console.error("Failed to fetch country:", error);
        // Fallback: try to guess from timezone
        const locale = Intl.DateTimeFormat().resolvedOptions().locale;
        const countryCode = locale.split("-")[1];
        if (countryCode) {
          setValue("country", countryCode);
        }
      }
    }

    fetchCountry();
  }, [setValue]);

  function onSubmit(data: StepOneFormData) {
    onComplete(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <>
        <FieldSet className="flex flex-col gap-3">
          <FieldGroup>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="name" {...register("name")} />
              {errors.name?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.name.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password")}
                />
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        className="border cursor-pointer"
                        variant="ghost"
                        aria-label="Info"
                        size="icon-xs"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{showPassword ? "Hide password" : "Show password"}</p>
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
              {errors.password?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field className="gap-1.5">
              <Label htmlFor="genotype">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]" id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PATIENT">Patient</SelectItem>
                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.role.message}
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
                {isSubmitting ? <Spinner /> : " Next"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </>
    </form>
  );
}
