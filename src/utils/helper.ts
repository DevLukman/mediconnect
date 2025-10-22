// //Middleware
// import { auth } from "@/lib/auth";
// import { betterFetch } from "@better-fetch/fetch";
// import { NextRequest, NextResponse } from "next/server";

// type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";
// type Session = typeof auth.$Infer.Session;
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const publicRoutes = [
//     "/login",
//     "/signup",
//     "/forgetpassword",
//     "/resetpassword",
//   ];

//   if (publicRoutes.includes(pathname)) {
//     console.log("✅ Public route, allowing access:", pathname);
//     return NextResponse.next();
//   }

//   const { data: session } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: request.nextUrl.origin,
//       headers: {
//         cookie: request.headers.get("cookie") || "",
//       },
//     }
//   );

//   if (!session?.user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   console.log("✅ Session found for user:", session.user.id);

//   const userRole = session.user.role as UserRole;

//   if (!userRole) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const roleRoutes: Record<UserRole, string> = {
//     ADMIN: "/admin",
//     PATIENT: "/patient",
//     DOCTOR: "/doctor",
//   };
//   for (const [role, basePath] of Object.entries(roleRoutes)) {
//     if (pathname.startsWith(basePath)) {
//       if (userRole !== role) {
//         const correctDashboard = roleRoutes[userRole];
//         return NextResponse.redirect(
//           new URL(`${correctDashboard}/dashboard`, request.url)
//         );
//       }
//       return NextResponse.next();
//     }
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// // login form
// "use client";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton,
//   InputGroupInput,
// } from "@/components/ui/input-group";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff } from "lucide-react";

// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldSet,
// } from "@/components/ui/field";
// import { LoginSchema, TLoginSchema } from "@/lib/types";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Button } from "../ui/button";
// import { Checkbox } from "../ui/checkbox";
// import { Input } from "../ui/input";
// import Link from "next/link";
// import { Login } from "@/lib/action/authAction";
// import { useRouter } from "next/navigation";
// import { Spinner } from "../ui/spinner";
// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm<TLoginSchema>({
//     resolver: zodResolver(LoginSchema),
//     defaultValues: {
//       remember: false,
//     },
//   });
//   async function handleLogin(data: TLoginSchema) {
//     const result = await Login(data);
//     if (result.success) {
//       alert(result.message);
//       router.push("/");
//     } else {
//       alert(result.message);
//     }
//   }
//   return (
//     <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
//       <FieldSet>
//         <FieldGroup>
//           <Field>
//             <FieldLabel htmlFor="email">Email address</FieldLabel>
//             <Input
//               id="email"
//               type="email"
//               {...register("email")}
//               disabled={isSubmitting}
//             />
//             {errors.email?.message && (
//               <FieldError className="pl-1 text-sm text-destructive">
//                 {errors.email.message}
//               </FieldError>
//             )}
//           </Field>
//           <Field>
//             <div className="flex justify-between items-center">
//               <FieldLabel htmlFor="password">Password</FieldLabel>
//               <Link
//                 href={"/forgetpassword"}
//                 className="text-sm underline text-primary"
//               >
//                 {" "}
//                 Forgetpassword?
//               </Link>
//             </div>
//             <InputGroup>
//               <InputGroupInput
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 {...register("password")}
//                 disabled={isSubmitting}
//               />
//               <InputGroupAddon align="inline-end">
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <InputGroupButton
//                       className="border cursor-pointer"
//                       variant="ghost"
//                       aria-label="Info"
//                       size="icon-xs"
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       disabled={isSubmitting}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </InputGroupButton>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>{showPassword ? "Hid password" : "Show password"}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </InputGroupAddon>
//             </InputGroup>
//             {errors.password?.message && (
//               <FieldError className="pl-1 text-sm text-destructive">
//                 {errors.password.message}
//               </FieldError>
//             )}
//           </Field>
//           <FieldGroup>
//             <Field orientation={"horizontal"}>
//               <Controller
//                 control={control}
//                 name="remember"
//                 render={({ field }) => (
//                   <Checkbox
//                     id="remember"
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                     disabled={isSubmitting}
//                   />
//                 )}
//               />

//               <FieldLabel id="remember">Remember me</FieldLabel>
//               {errors.remember?.message && (
//                 <FieldError className="pl-1 text-sm text-destructive">
//                   {errors.remember.message}
//                 </FieldError>
//               )}
//             </Field>
//           </FieldGroup>
//           <Field className="mt-2">
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="cursor-pointer"
//             >
//               {isSubmitting ? <Spinner /> : "Login"}
//             </Button>
//           </Field>
//         </FieldGroup>
//       </FieldSet>
//     </form>
//   );
// }

// //Sign up form
// "use client";
// import {
//   DoctorStepTwoFormData,
//   PatientStepTwoFormData,
//   StepOneFormData,
// } from "@/lib/types";

// import { signUp } from "@/lib/action/authAction";
// import { ArrowBigRight, Check } from "lucide-react";
// import Link from "next/link";
// import { useState, useTransition } from "react";
// import DoctorStepTwo from "./DoctorStepTwo";
// import PatientStepTwo from "./PatientStepTwo";
// import StepOneForm from "./SignupStepOne";
// import { useRouter } from "next/navigation";

// export default function SignupForm() {
//   const [currentStep, setCurrentStep] = useState<1 | 2>(1);
//   const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   function handleStepOneComplete(data: StepOneFormData) {
//     setStepOneData(data);
//     setCurrentStep(2);
//   }

//   function handlePatientComplete(patientData: PatientStepTwoFormData) {
//     const data = {
//       ...stepOneData,
//       ...patientData,
//     };

//     const main = {
//       name: data.name!,
//       email: data.email!,
//       password: data.password!,
//     };

//     startTransition(async () => {
//       const result = await signUp(main);
//       if (result.success) {
//         alert(result.message);
//         router.push("/");
//       } else {
//         alert(result.message);
//       }
//     });
//   }

//   function handleDoctorComplete(doctorData: DoctorStepTwoFormData) {
//     const data = {
//       ...stepOneData,
//       ...doctorData,
//     };
//     const main = {
//       name: data.name!,
//       email: data.email!,
//       password: data.password!,
//     };

//     startTransition(async () => {
//       const result = await signUp(main);
//       if (result.success) {
//         alert(result.message);
//         router.push("/");
//       } else {
//         alert(result.message);
//       }
//     });
//   }

//   function handleBack() {
//     setCurrentStep(1);
//     setStepOneData(null);
//   }
//   return (
//     <>
//       <div className="flex items-center justify-center gap-5 mt-4">
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={handleBack}
//         >
//           {stepOneData !== null ? (
//             <span
//               className={`text-sm border rounded-full bg-green-600 px-1.5 py-1.5 items-center`}
//             >
//               <Check size={14} className="text-secondary" />
//             </span>
//           ) : (
//             <span
//               className={`text-sm border rounded-full px-2.5 py-0.5 items-center`}
//             >
//               1
//             </span>
//           )}
//           <span className="text-sm">Personal info</span>
//         </div>
//         <span>
//           <ArrowBigRight size={16} />
//         </span>
//         <div className="flex items-center gap-2">
//           <span
//             className={`text-sm border rounded-full  px-2.5 py-0.5 items-center`}
//           >
//             2
//           </span>
//           <span className="text-sm">Additional info</span>
//         </div>
//       </div>
//       {currentStep === 1 && <StepOneForm onComplete={handleStepOneComplete} />}
//       {currentStep === 2 && stepOneData?.role === "PATIENT" && (
//         <PatientStepTwo
//           onComplete={handlePatientComplete}
//           isSubmitting={isPending}
//         />
//       )}
//       {currentStep === 2 && stepOneData?.role === "DOCTOR" && (
//         <DoctorStepTwo
//           onComplete={handleDoctorComplete}
//           isSubmitting={isPending}
//         />
//       )}

//       <div className="py-4 ">
//         <p className="flex items-center justify-center gap-2 text-sm mt-3">
//           <span> Already have an account?</span>
//           <Link href={"/login"} className="text-primary">
//             Login
//           </Link>
//         </p>
//       </div>
//     </>
//   );
// }

// // server action for auth
// "use server";
// import { headers } from "next/headers";
// import { auth } from "../auth";
// import {
//   ForgetPasswordSchema,
//   LoginSchema,
//   SignupSchema,
//   TForgetPasswordSchema,
//   TLoginSchema,
//   TSignUpSchema,
// } from "../types";

// export async function Login(data: TLoginSchema) {
//   const validation = LoginSchema.safeParse(data);
//   if (!validation.success) throw new Error("Not a valid Information");

//   try {
//     await auth.api.signInEmail({
//       body: {
//         ...validation.data,
//       },
//     });
//     return { success: true, message: "Login successfully" };
//   } catch (error) {
//     const e = error as Error;
//     return {
//       success: false,
//       message: e.message || "Please check your information",
//     };
//   }
// }

// export async function signUp(data: TSignUpSchema) {
//   const validation = SignupSchema.safeParse(data);
//   if (!validation.success) throw new Error("Not a valid information");
//   try {
//     await auth.api.signUpEmail({
//       body: {
//         ...validation.data,
//         role: "PATIENT",
//       },
//     });
//     return { success: true, message: "Signup successful" };
//   } catch (error) {
//     const e = error as Error;
//     return {
//       success: false,
//       message: e.message || "There was an error with Signup",
//     };
//   }
// }

// export async function logout() {
//   try {
//     await auth.api.signOut({ headers: await headers() });
//     return { success: true, message: "Log out successful" };
//   } catch (error) {
//     const e = error as Error;
//     return { success: false, message: e.message || "Failed to Log out" };
//   }
// }

// export async function ForgetPassword(data: TForgetPasswordSchema) {
//   const validation = ForgetPasswordSchema.safeParse(data);
//   if (!validation.success) throw new Error("Not a valid email");

//   try {
//     await auth.api.forgetPassword({
//       body: {
//         ...validation.data,
//         redirectTo: "/resetpassword",
//       },
//     });
//     return { success: true, message: "Password reset email sent" };
//   } catch (error) {
//     const e = error as Error;
//     return { success: false, message: e.message || "There was an error" };
//   }
// }

// export async function ResetPassword(newPassword: string, token: string) {
//   try {
//     await auth.api.resetPassword({
//       body: {
//         newPassword,
//         token,
//       },
//     });
//     return { success: true, message: "Password reset successfully" };
//   } catch (error) {
//     const e = error as Error;
//     return { success: false, message: e || "Password reset not successful" };
//   }
// }

// //Reset password form:
// "use client";
// import { Field, FieldError, FieldLabel } from "@/components/ui/field";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton,
//   InputGroupInput,
// } from "@/components/ui/input-group";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { ResetPasswordSchema, TResetPasswordSchema } from "@/lib/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "../ui/button";
// import { FieldGroup } from "../ui/field";
// import { ResetPassword } from "@/lib/action/authAction";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Spinner } from "../ui/spinner";

// export default function ResetPasswordForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token") as string;
//   const [showPassword, setShowPassword] = useState(false);
//   const [confirmPassword, setConfrmPassword] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<TResetPasswordSchema>({
//     resolver: zodResolver(ResetPasswordSchema),
//   });
//   async function handleResetPassword(data: TResetPasswordSchema) {
//     const result = await ResetPassword(data.password, token);
//     if (result?.success) {
//       alert(result.message);
//       router.push("/login");
//     } else {
//       alert(result.message);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(handleResetPassword)} className="mt-6">
//       <FieldGroup>
//         <Field>
//           <FieldLabel htmlFor="password">Password</FieldLabel>
//           <InputGroup>
//             <InputGroupInput
//               id="password"
//               disabled={isSubmitting}
//               type={showPassword ? "text" : "password"}
//               {...register("password")}
//             />
//             <InputGroupAddon align="inline-end">
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <InputGroupButton
//                     variant="ghost"
//                     aria-label="Info"
//                     size="icon-xs"
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </InputGroupButton>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{showPassword ? "Hid password" : "Show password"}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </InputGroupAddon>
//           </InputGroup>
//           {errors.password?.message && (
//             <FieldError className="pl-1 text-sm text-destructive">
//               {errors.password.message}
//             </FieldError>
//           )}
//         </Field>
//         <Field>
//           <FieldLabel htmlFor="confirmpassword"> Confirm Password</FieldLabel>
//           <InputGroup>
//             <InputGroupInput
//               id="confirmpassword"
//               type={confirmPassword ? "text" : "password"}
//               {...register("confirmPassword")}
//               disabled={isSubmitting}
//             />
//             <InputGroupAddon align="inline-end">
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <InputGroupButton
//                     variant="ghost"
//                     aria-label="Info"
//                     size="icon-xs"
//                     type="button"
//                     onClick={() => setConfrmPassword(!confirmPassword)}
//                   >
//                     {confirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </InputGroupButton>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{showPassword ? "Hid password" : "Show password"}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </InputGroupAddon>
//           </InputGroup>
//           {errors.confirmPassword?.message && (
//             <FieldError className="pl-1 text-sm text-destructive">
//               {errors.confirmPassword.message}
//             </FieldError>
//           )}
//         </Field>
//         <Field className="mt-2">
//           <Button type="submit" className="cursor-pointer">
//             {isSubmitting ? <Spinner /> : "Reset password"}
//           </Button>
//         </Field>
//       </FieldGroup>
//     </form>
//   );
// }

// // forget password form:

// "use client";
// import { Field, FieldError, FieldLabel } from "@/components/ui/field";
// import { ForgetPassword } from "@/lib/action/authAction";
// import { ForgetPasswordSchema, TForgetPasswordSchema } from "@/lib/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Spinner } from "../ui/spinner";
// export default function ForgetPasswordForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<TForgetPasswordSchema>({
//     resolver: zodResolver(ForgetPasswordSchema),
//   });
//   async function handleForgetPassword(data: TForgetPasswordSchema) {
//     const result = await ForgetPassword(data);
//     if (result.success) {
//       alert(result.message);
//     } else {
//       alert(result.message);
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit(handleForgetPassword)} className="mt-6">
//       <Field>
//         <FieldLabel htmlFor="email">Email address</FieldLabel>
//         <Input id="email" type="email" {...register("email")} />
//         {errors.email?.message && (
//           <FieldError className="pl-1 text-sm text-destructive">
//             {errors.email.message}
//           </FieldError>
//         )}
//         <Field className="mt-2">
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="cursor-pointer"
//           >
//             {isSubmitting ? <Spinner /> : "Send Reset link"}
//           </Button>
//         </Field>
//       </Field>
//     </form>
//   );
// }
