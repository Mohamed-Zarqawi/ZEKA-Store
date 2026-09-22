import * as y from "yup";

export const CreateCategorySchema = y.object({
  name: y.string().required(),
});

export const UpdateCategorySchema = y.object({
  name: y.string().required(),
});

export type ReqCreateCategoryType = y.InferType<typeof CreateCategorySchema>;

export type ResCategoryType = {
  id: number;
  name: string;
  created_at: string;
  categoryRelatedProducts: number;
};
