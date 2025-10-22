"use client";
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
import { LoginSchema, TLoginSchema } from "@/lib/types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import Link from "next/link";
import { Login } from "@/lib/action/authAction";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      remember: false,
    },
  });
  async function handleLogin(data: TLoginSchema) {
    const result = await Login(data);
    if (result.success) {
      alert(result.message);
      router.push("/");
    } else {
      alert(result.message);
    }
  }
  return (
    <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email?.message && (
              <FieldError className="pl-1 text-sm text-destructive">
                {errors.email.message}
              </FieldError>
            )}
          </Field>
          <Field>
            <div className="flex justify-between items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href={"/forgetpassword"}
                className="text-sm underline text-primary"
              >
                {" "}
                Forgetpassword?
              </Link>
            </div>
            <InputGroup>
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showPassword ? "Hid password" : "Show password"}</p>
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
          <FieldGroup>
            <Field orientation={"horizontal"}>
              <Controller
                control={control}
                name="remember"
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                )}
              />

              <FieldLabel id="remember">Remember me</FieldLabel>
              {errors.remember?.message && (
                <FieldError className="pl-1 text-sm text-destructive">
                  {errors.remember.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
          <Field className="mt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? <Spinner /> : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
