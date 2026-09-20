import * as y from "yup";

// Define constraints
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const UploadMediaSchema = y.object({
  files: y
    .mixed<File>()
    .required("A file upload is required")
    .test(
      "fileSize",
      "The file is too large. Maximum size allowed is 2MB.",
      (value) => !value || (value && value.size <= MAX_FILE_SIZE),
    )
    .test(
      "fileFormat",
      "Unsupported file format. Please upload a JPEG, PNG, or JPG.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)),
    ),
});

export type ReqUploadMediaType = y.InferType<typeof UploadMediaSchema>;

export type ResUploadMediaType = {
  id: number;
  name?: string;
  url?: string;
}[];
