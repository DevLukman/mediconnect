"use client";

import { useFileSelect } from "@/hooks/useFileSelect";
import { UpdateDoctorProfile } from "@/lib/action/getDoctorProfile";
import { DoctorProfileFormData, DoctorProfileSchema } from "@/lib/types";
import { specialists } from "@/utils/constant";
import { countries } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPaperclip } from "@intentui/icons";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CountrySelect } from "./CountrySelect";
import { NumberField } from "./NumberInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
type DoctorSettingFormProps = {
  doctorData: DoctorProfileFormData | null;
};
export default function DoctorSettingForm({
  doctorData,
}: DoctorSettingFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<DoctorProfileFormData>({
    resolver: zodResolver(DoctorProfileSchema),
    defaultValues: {
      ...doctorData,
    },
  });

  const imageValue = watch("image") || "";
  const { handleFileSelect, isUploading } = useFileSelect(setValue, {
    fieldName: "image",
  });

  async function handleProfileUpdate(data: DoctorProfileFormData) {
    const result = await UpdateDoctorProfile(data);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form className="mt-6 pb-6" onSubmit={handleSubmit(handleProfileUpdate)}>
      <FieldGroup className="gap-5">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={true}
              />
            </Field>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={true}
              />
            </Field>
          )}
        />
        <Separator />
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Separator />
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
                  <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
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
          name="country"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Country</FieldLabel>
              <CountrySelect
                countries={countries}
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
                placeholder="Select country..."
                className="w-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="timeZone"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Timezone</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              <FieldDescription>
                This was automatically set based on your location. You can
                change it if the need arise.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Separator />
        <div>
          <div className="pb-3">
            <h3>Your Photo </h3>
            <p className="text-foreground/50 text-sm font-normal">
              This will be displayed on your profile.
            </p>
            <Avatar className="mt-4 size-14">
              <AvatarImage
                src={imageValue}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl uppercase">
                {doctorData?.email.split("")[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <Field className="w-fit">
            <FieldLabel>Profile Image</FieldLabel>
            <label htmlFor="imageUpload" className="cursor-pointer">
              <Button
                type="button"
                disabled={isUploading || isSubmitting}
                className="border-border text-primary hover:bg-main flex w-fit cursor-pointer items-center gap-2 border bg-transparent p-5 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                asChild
              >
                <div>
                  {isUploading ? (
                    <>
                      <Spinner className="text-subPrimary" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <IconPaperclip className="text-subPrimary rotate-45" />
                      <span>Click to upload</span>
                    </>
                  )}
                </div>
              </Button>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileSelect(files);
                e.target.value = "";
              }}
              className="hidden"
              disabled={isUploading || isSubmitting}
              aria-label="Upload profile image"
            />
          </Field>
        </div>
        <Separator />
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-1.5">
              <FieldContent>
                <FieldLabel htmlFor={field.name}>About</FieldLabel>
                <FieldDescription>Write a short introduction</FieldDescription>
              </FieldContent>
              <Textarea
                {...field}
                id={field.name}
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                className="min-h-28 w-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-6 flex items-center gap-6">
        <Button
          type="reset"
          variant={"ghost"}
          className="max-w-full flex-1 cursor-pointer"
          disabled={isSubmitting}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Update"}
        </Button>
      </div>
    </form>
  );
}
