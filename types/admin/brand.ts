import * as y from "yup";

export const CreateBrandSchema = y.object({
  name: y.string().required(),
});

export const UpdateBrandSchema = y.object({
  brandId: y.number().notRequired(),
  name: y.string().required(),
});

export type ReqCreateBrandType = y.InferType<typeof CreateBrandSchema>;
export type ReqUpdateBrandType = y.InferType<typeof UpdateBrandSchema>;

export type ResBrandType = {
  id: number;
  name: string;
  created_at: string;
  brandRelatedProducts: number;
};
