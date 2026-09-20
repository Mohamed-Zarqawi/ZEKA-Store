import * as y from "yup";

export const CreateProductSchema = y.object({
  name: y.string().required(),
  description: y.string(),
  price: y.number().required(),
  stock: y.number().required(),
  category: y.string(),
  brand: y.string(),
});

export const UpdateProductSchema = y.object({
  name: y.string().notRequired(),
  description: y.string().notRequired(),
  price: y.number().notRequired(),
  stock: y.number().notRequired(),
  category_id: y.number().notRequired(),
  brand_id: y.number().notRequired(),
});

export type ReqCreateProductType = y.InferType<typeof CreateProductSchema>;

export type ResUpdateProductType = {
  data: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;

    images: string[];

    category: {
      id: number;
      name: string;
    };

    brand: {
      id: number;
      name: string;
    };

    featured: boolean;
    isFavorite: boolean;
    favoriteDocId: string | null;
  };
};
