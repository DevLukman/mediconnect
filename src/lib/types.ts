import * as z from "zod";

//Auth types

//Login types
export const LoginSchema = z.object({
  email: z.email("Please enter a valid email").max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
  remember: z.boolean(),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;

//forgetpassword types
export const ForgetPasswordSchema = z.object({
  email: z.email("Please enter a valid email address").max(50),
});
export type TForgetPasswordSchema = z.infer<typeof ForgetPasswordSchema>;

//Sign up types
export const SignupSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.email("Invalid email format").max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"], "Please select a role"),
});

export type TSignUpSchema = z.infer<typeof SignupSchema>;

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

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

//Signup

export const stepOneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"], "Please select a role"),
});

export const patientStepTwoSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(
    ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"],
    "gender is required"
  ),
  genotype: z.enum(["AA", "AS", "SS"], "select a genotype"),
  address: z.string().min(2, "Address is required"),
  bloodtype: z.string().min(2, "Blood type is required"),
  occupation: z.string().min(2, "occupation is required"),
});

export const doctorStepTwoSchema = z.object({
  specialization: z.string().min(1, "Specialty is required"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience must be 0 or greater")
    .max(30, "we don't accept experience more than 30"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  price: z.number().min(0, "Price must be positive"),
  startTime: z.string(),
  endTime: z.string(),
});

// TypeScript types derived from Zod schemas
export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type PatientStepTwoFormData = z.infer<typeof patientStepTwoSchema>;
export type DoctorStepTwoFormData = z.infer<typeof doctorStepTwoSchema>;
