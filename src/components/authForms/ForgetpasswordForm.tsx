"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ForgetPassword } from "@/lib/action/authAction";
import { ForgetPasswordSchema, TForgetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordSchema),
  });
  async function handleForgetPassword(data: TForgetPasswordSchema) {
    const payload = { email: data.email.trim().toLowerCase() };

    try {
      const result = await ForgetPassword(payload);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message, { className: "bg-red-500" });
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "There was an error";
      toast.error(msg);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleForgetPassword)} className="mt-6">
      <Field>
        <FieldLabel htmlFor="email">Email address</FieldLabel>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email?.message && (
          <FieldError className="pl-1 text-sm text-destructive">
            {errors.email.message}
          </FieldError>
        )}
        <Field className="mt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : "Send Reset link"}
          </Button>
        </Field>
      </Field>
    </form>
  );
}
