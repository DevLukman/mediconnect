"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
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
import { ResetPasswordSchema, TResetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";
import { ResetPassword } from "@/lib/action/authAction";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "../ui/spinner";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfrmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  async function handleResetPassword(data: TResetPasswordSchema) {
    const result = await ResetPassword(data.password, token);
    if (result?.success) {
      alert(result.message);
      router.push("/login");
    } else {
      alert(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleResetPassword)} className="mt-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              disabled={isSubmitting}
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
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
        <Field>
          <FieldLabel htmlFor="confirmpassword"> Confirm Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirmpassword"
              type={confirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              disabled={isSubmitting}
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="Info"
                    size="icon-xs"
                    type="button"
                    onClick={() => setConfrmPassword(!confirmPassword)}
                  >
                    {confirmPassword ? (
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
          {errors.confirmPassword?.message && (
            <FieldError className="pl-1 text-sm text-destructive">
              {errors.confirmPassword.message}
            </FieldError>
          )}
        </Field>
        <Field className="mt-2">
          <Button type="submit" className="cursor-pointer">
            {isSubmitting ? <Spinner /> : "Reset password"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
