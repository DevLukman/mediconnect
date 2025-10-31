"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ForgetPassword } from "@/lib/action/authAction";
import { ForgetPasswordSchema, TForgetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
export default function ForgetPasswordForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
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
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              {...field}
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={fieldState.invalid}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="w-full mt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full"
        >
          {isSubmitting ? <Spinner /> : "Send Reset link"}
        </Button>
      </div>
    </form>
  );
}
