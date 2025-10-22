// "use client";
// interface PatientStepTwoProps {
//   onComplete: (data: PatientStepTwoFormData) => void;
//   onBack: () => void;
// }

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PatientStepTwoFormData, patientStepTwoSchema } from "@/lib/types";
// export default function PatientStepTwo({
//   onComplete,
//   onBack,
// }: PatientStepTwoProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<PatientStepTwoFormData>({
//     resolver: zodResolver(patientStepTwoSchema),
//     defaultValues: {
//       gender: "PREFER_NOT_TO_SAY",
//     },
//   });
//   const onSubmit = (data: PatientStepTwoFormData) => {
//     onComplete(data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 bg-white p-8 rounded-lg shadow"
//     >
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">
//         Patient Information
//       </h3>

//       {/* Phone Number */}
//       <div>
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Phone Number *
//         </label>
//         <input
//           id="phone"
//           type="tel"
//           {...register("phone")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="+234 800 000 0000"
//         />
//         {errors.phone && (
//           <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
//         )}
//       </div>

//       {/* Date of Birth */}
//       <div>
//         <label
//           htmlFor="dateOfBirth"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Date of Birth *
//         </label>
//         <input
//           id="dateOfBirth"
//           type="date"
//           {...register("dateOfBirth")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//         {errors.dateOfBirth && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.dateOfBirth.message}
//           </p>
//         )}
//       </div>

//       {/* Gender */}
//       <div>
//         <label
//           htmlFor="gender"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Gender
//         </label>
//         <select
//           id="gender"
//           {...register("gender")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//           <option value="OTHER">Other</option>
//           <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
//         </select>
//         {errors.gender && (
//           <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
//         )}
//       </div>

//       {/* Address (Optional) */}
//       <div>
//         <label
//           htmlFor="address"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Address
//         </label>
//         <input
//           id="address"
//           type="text"
//           {...register("address")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="123 Main Street"
//         />
//       </div>

//       {/* City and State (Side by Side) */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="city"
//             className="block text-sm font-medium text-gray-700"
//           >
//             City *
//           </label>
//           <input
//             id="city"
//             type="text"
//             {...register("city")}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Lagos"
//           />
//           {errors.city && (
//             <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
//           )}
//         </div>
//         <div>
//           <label
//             htmlFor="state"
//             className="block text-sm font-medium text-gray-700"
//           >
//             State *
//           </label>
//           <input
//             id="state"
//             type="text"
//             {...register("state")}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Lagos"
//           />
//           {errors.state && (
//             <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Blood Group (Optional) */}
//       <div>
//         <label
//           htmlFor="bloodGroup"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Blood Group
//         </label>
//         <select
//           id="bloodGroup"
//           {...register("bloodGroup")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">Select blood group</option>
//           <option value="A+">A+</option>
//           <option value="A-">A-</option>
//           <option value="B+">B+</option>
//           <option value="B-">B-</option>
//           <option value="AB+">AB+</option>
//           <option value="AB-">AB-</option>
//           <option value="O+">O+</option>
//           <option value="O-">O-</option>
//         </select>
//       </div>

//       {/* Allergies (Optional) */}
//       <div>
//         <label
//           htmlFor="allergies"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Allergies (if any)
//         </label>
//         <textarea
//           id="allergies"
//           rows={3}
//           {...register("allergies")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="List any known allergies..."
//         />
//       </div>

//       {/* Emergency Contact Name (Optional) */}
//       <div>
//         <label
//           htmlFor="emergencyContact"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Emergency Contact Name
//         </label>
//         <input
//           id="emergencyContact"
//           type="text"
//           {...register("emergencyContact")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Jane Doe"
//         />
//       </div>

//       {/* Emergency Contact Phone (Optional) */}
//       <div>
//         <label
//           htmlFor="emergencyPhone"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Emergency Contact Phone
//         </label>
//         <input
//           id="emergencyPhone"
//           type="tel"
//           {...register("emergencyPhone")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="+234 800 000 0000"
//         />
//       </div>

//       {/* Action Buttons (Back and Submit) */}
//       <div className="flex gap-4">
//         <button
//           type="button"
//           onClick={onBack}
//           className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           ← Back
//         </button>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? "Creating Account..." : "Complete Signup"}
//         </button>
//       </div>
//     </form>
//   );
// }

//next

"use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { DoctorStepTwoFormData, doctorStepTwoSchema } from "@/lib/types";

// interface DoctorStepTwoProps {
//   onComplete: (data: DoctorStepTwoFormData) => void;
//   onBack: () => void;
// }

// export default function DoctorStepTwo({
//   onComplete,
//   onBack,
// }: DoctorStepTwoProps) {
//   // Initialize React Hook Form with Zod validation
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<DoctorStepTwoFormData>({
//     resolver: zodResolver(doctorStepTwoSchema),
//   });

//   /**
//    * Form submission handler
//    * Only called if validation passes
//    */
//   const onSubmit = (data: DoctorStepTwoFormData) => {
//     onComplete(data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 bg-white p-8 rounded-lg shadow max-h-[600px] overflow-y-auto"
//     >
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">
//         Doctor Information
//       </h3>

//       {/* Phone Number */}
//       <div>
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Phone Number *
//         </label>
//         <input
//           id="phone"
//           type="tel"
//           {...register("phone")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="+234 800 000 0000"
//         />
//         {errors.phone && (
//           <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
//         )}
//       </div>

//       {/* Specialty */}
//       <div>
//         <label
//           htmlFor="specialty"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Specialty *
//         </label>
//         <select
//           id="specialty"
//           {...register("specialty")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         >
//   <option value="">Select specialty</option>
//   <option value="General Practitioner">General Practitioner</option>
//   <option value="Cardiologist">Cardiologist</option>
//   <option value="Dermatologist">Dermatologist</option>
//   <option value="Pediatrician">Pediatrician</option>
//   <option value="Psychiatrist">Psychiatrist</option>
//   <option value="Orthopedic">Orthopedic</option>
//   <option value="Neurologist">Neurologist</option>
//   <option value="Gynecologist">Gynecologist</option>
//   <option value="Ophthalmologist">Ophthalmologist</option>
//   <option value="ENT Specialist">ENT Specialist</option>
//   <option value="Other">Other</option>
//         </select>
//         {errors.specialty && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.specialty.message}
//           </p>
//         )}
//       </div>

//       {/* License Number */}
//       <div>
//         <label
//           htmlFor="licenseNumber"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Medical License Number *
//         </label>
//         <input
//           id="licenseNumber"
//           type="text"
//           {...register("licenseNumber")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="MED-12345678"
//         />
//         {errors.licenseNumber && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.licenseNumber.message}
//           </p>
//         )}
//       </div>

//       {/* Years of Experience */}
//       <div>
//         <label
//           htmlFor="yearsOfExperience"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Years of Experience *
//         </label>
//         <input
//           id="yearsOfExperience"
//           type="number"
//           min="0"
//           {...register("yearsOfExperience")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="5"
//         />
//         {errors.yearsOfExperience && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.yearsOfExperience.message}
//           </p>
//         )}
//       </div>

//       {/* Qualifications */}
//       <div>
//         <label
//           htmlFor="qualifications"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Qualifications *
//         </label>
//         <textarea
//           id="qualifications"
//           rows={3}
//           {...register("qualifications")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="e.g., MBBS, MD, Fellowship in Cardiology"
//         />
//         {errors.qualifications && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.qualifications.message}
//           </p>
//         )}
//       </div>

//       {/* Bio (Optional) */}
//       <div>
//         <label
//           htmlFor="bio"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Bio
//         </label>
//         <textarea
//           id="bio"
//           rows={4}
//           {...register("bio")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Tell patients about yourself and your practice..."
//         />
//       </div>

//       {/* Clinic Name (Optional) */}
//       <div>
//         <label
//           htmlFor="clinicName"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Clinic/Hospital Name
//         </label>
//         <input
//           id="clinicName"
//           type="text"
//           {...register("clinicName")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="City General Hospital"
//         />
//       </div>

//       {/* Clinic Address (Optional) */}
//       <div>
//         <label
//           htmlFor="clinicAddress"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Clinic/Hospital Address
//         </label>
//         <input
//           id="clinicAddress"
//           type="text"
//           {...register("clinicAddress")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="123 Medical Street"
//         />
//       </div>

//       {/* City and State (Side by Side) */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="city"
//             className="block text-sm font-medium text-gray-700"
//           >
//             City *
//           </label>
//           <input
//             id="city"
//             type="text"
//             {...register("city")}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Lagos"
//           />
//           {errors.city && (
//             <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
//           )}
//         </div>
//         <div>
//           <label
//             htmlFor="state"
//             className="block text-sm font-medium text-gray-700"
//           >
//             State *
//           </label>
//           <input
//             id="state"
//             type="text"
//             {...register("state")}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Lagos"
//           />
//           {errors.state && (
//             <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Consultation Fee */}
//       <div>
//         <label
//           htmlFor="consultationFee"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Consultation Fee (₦) *
//         </label>
//         <input
//           id="consultationFee"
//           type="number"
//           min="1"
//           step="0.01"
//           {...register("consultationFee")}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="5000"
//         />
//         {errors.consultationFee && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.consultationFee.message}
//           </p>
//         )}
//       </div>

//       {/* Info Message */}
//       <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//         <p className="text-sm text-blue-800">
//           <strong>Note:</strong> Your application will be reviewed by our admin
//           team. You`&apos;ll receive an email notification once your account is
//           approved.
//         </p>
//       </div>

//       {/* Action Buttons (Back and Submit) */}
//       <div className="flex gap-4 sticky bottom-0 bg-white pt-4">
//         <button
//           type="button"
//           onClick={onBack}
//           className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           ← Back
//         </button>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? "Submitting Application..." : "Submit Application"}
//         </button>
//       </div>
//     </form>
//   );
// }
