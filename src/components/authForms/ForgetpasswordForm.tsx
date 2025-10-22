"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ForgetPassword } from "@/lib/action/authAction";
import { ForgetPasswordSchema, TForgetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    const result = await ForgetPassword(data);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleForgetPassword)} className="mt-6">
      <Field>
        <FieldLabel htmlFor="email">Email address</FieldLabel>
        <Input id="email" type="email" {...register("email")} />
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
