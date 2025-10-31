"use client";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/utils/constant";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { UseFormSetValue, Path, PathValue } from "react-hook-form";

type UseFileUploadOptions<T extends Record<string, unknown>> = {
  maxFileSize?: number;
  allowedFileTypes?: string[];
  fieldName: Path<T>;
  onSuccess?: (url: string) => void;
};

export function useFileSelect<T extends Record<string, unknown>>(
  setValue: UseFormSetValue<T>,
  options: UseFileUploadOptions<T>
) {
  const {
    maxFileSize = MAX_FILE_SIZE,
    allowedFileTypes = ALLOWED_FILE_TYPES,
    fieldName,
    onSuccess,
  } = options;

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.success("Image upload successful");
    },
    onUploadError: (error) => {
      toast.error(
        `There was error with file upload: ${error.message || "There was an error"}`
      );
    },
  });

  const handleFileSelect = async (files: File[]) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file size
    if (file.size > maxFileSize) {
      toast.error(`File is too large (max ${maxFileSize / (1024 * 1024)}MB)`);
      return;
    }

    // Validate file type
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Invalid format. Please use JPEG, PNG, or WebP.");
      return;
    }

    try {
      const uploadedImages = await startUpload([file]);
      if (uploadedImages && uploadedImages[0]) {
        const imageUrl = uploadedImages[0].ufsUrl;
        setValue(fieldName, imageUrl as PathValue<T, Path<T>>);

        // Call optional success callback
        if (onSuccess) {
          onSuccess(imageUrl);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  return {
    handleFileSelect,
    isUploading,
  };
}
