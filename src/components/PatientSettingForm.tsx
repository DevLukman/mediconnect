"use client";

import { useFileSelect } from "@/hooks/useFileSelect";
import { PatientProfileFormData, PatientProfileSchema } from "@/lib/types";
import { bloodTypes, genders, genotypes } from "@/utils/constant";
import { countries } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPaperclip } from "@intentui/icons";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CountrySelect } from "./CountrySelect";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
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
import { UpdatePatientProfile } from "@/lib/action/getPatientProfile";
import { toast } from "sonner";

type PatientSettingFormProps = {
  patientData: PatientProfileFormData | null;
};

export default function PatientSettingForm({
  patientData,
}: PatientSettingFormProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<PatientProfileFormData>({
    resolver: zodResolver(PatientProfileSchema),
    defaultValues: {
      ...patientData,
    },
  });

  const imageValue = watch("image") || "";
  const dateOfBirth = watch("dateOfBirth");
  const { handleFileSelect, isUploading } = useFileSelect(setValue, {
    fieldName: "image",
  });

  async function handleProfileUpdate(data: PatientProfileFormData) {
    console.log(data);
    const result = await UpdatePatientProfile(data);
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Separator />

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
            <p className="text-sm font-normal text-foreground/50">
              This will be displayed on your profile.
            </p>
            <Avatar className="size-14 mt-4">
              <AvatarImage
                src={imageValue}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback className="uppercase text-2xl">
                {/* {doctorData?.email.split("")[0]} */}
                CN
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
      </FieldGroup>
      <div className="flex items-center gap-6 mt-6">
        <Button
          type="reset"
          variant={"ghost"}
          className="max-w-full cursor-pointer flex-1"
          disabled={isSubmitting}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="cursor-pointer flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Update"}
        </Button>
      </div>
    </form>
  );
}
