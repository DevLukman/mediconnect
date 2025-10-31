import * as z from "zod";

//Signup
export const stepOneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.url("image is required"),
  country: z.string().min(2, "Country is required"),
  timeZone: z.string().min(1, "Timezone is required"),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"], {
    error: "Please select a role",
  }),
});
export const patientStepTwoSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"], {
    error: "Gender is required",
  }),
  genotype: z.enum(["AA", "AS", "SS"], { error: "Select a genotype" }),
  address: z.string().min(2, "Address is required"),
  bloodType: z.string().min(2, "Blood type is required"),
  occupation: z.string().min(2, "Occupation is required"),
});

export const doctorStepTwoSchema = z.object({
  specialty: z.string("Specialty is required").min(1),
  yearsOfExperience: z
    .number("Years of experience is required")
    .min(0, "Years of experience must be 0 or greater")
    .max(40, "we don't accept experience more than 40"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  consultationFee: z
    .number("Consultation fee is required")
    .min(10, "Price must at least 10")
    .nonnegative("Consultation fee must be positive"),
  startTime: z.string("Start time is required"),
  endTime: z.string("End time is required"),
});

//Login types
export const LoginSchema = z.object({
  email: z.email("Please enter a valid email").max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
  remember: z.boolean(),
});

//forgetpassword types
export const ForgetPasswordSchema = z.object({
  email: z.email("Please enter a valid email address").max(50),
});

//Reset password
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const DoctorProfileSchema = z.object({
  image: z.url("Invalid image URL"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  specialty: z.string().min(2, "Specialty is required"),
  consultationFee: z
    .number("Consultation fee is required")
    .min(10, "Price must at least 10")
    .nonnegative("Consultation fee must be positive"),
  startTime: z.string("Start time is required"),
  endTime: z.string("End time is required"),
  country: z.string().min(2, "Country is required"),
  timeZone: z.string().min(1, "Timezone is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

export const PatientProfileSchema = z.object({
  image: z.url("Invalid image URL"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  country: z.string().min(2, "Country is required"),
  timeZone: z.string().min(1, "Timezone is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string(),
  genotype: z.string(),
  address: z.string().min(2, "Address is required"),
  bloodType: z.string().min(2, "Blood type is required"),
  occupation: z.string().min(2, "Occupation is required"),
});

// TypeScript types derived from Zod schemas
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TForgetPasswordSchema = z.infer<typeof ForgetPasswordSchema>;
export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type PatientStepTwoFormData = z.infer<typeof patientStepTwoSchema>;
export type DoctorStepTwoFormData = z.infer<typeof doctorStepTwoSchema>;
export type PatientProfileFormData = z.infer<typeof PatientProfileSchema>;
export const CombinedPatientSchema = stepOneSchema.and(patientStepTwoSchema);
export const CombinedDoctorSchema = stepOneSchema.and(doctorStepTwoSchema);
export type CombinedPatientType = z.infer<typeof CombinedPatientSchema>;
export type CombinedDoctorType = z.infer<typeof CombinedDoctorSchema>;
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
export type DoctorProfileFormData = z.infer<typeof DoctorProfileSchema>;
