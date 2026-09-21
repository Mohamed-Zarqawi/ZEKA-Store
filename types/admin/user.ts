import { isValidPhoneNumber } from "libphonenumber-js";
import * as y from "yup";
import { AddressType } from "../profile/address";
import { FavoriteItem } from "../shop/favoriteItem";
import { OrderType } from "../shop/order";
import { ProductType } from "../shop/product";

export const CreateUserSchema = y.object({
  name: y.string().required(),
  description: y.string(),
  price: y.number().required(),
  stock: y.number().required(),
  category: y.string(),
  brand: y.string(),
});

export const UpdateUserSchema = y.object({
  first_name: y.string().required(),
  last_name: y.string().notRequired(),
  phoneNumber: y
    .string()
    .test(
      "is-valid-phone",
      "Invalid phone number for the selected country",
      function (value) {
        if (!value) return true;
        const { phoneCode } = this.parent;
        if (!phoneCode) return false;
        try {
          const fullPhoneNumber = `+${phoneCode}${value}`;
          return isValidPhoneNumber(fullPhoneNumber);
        } catch (error) {
          return false;
        }
      },
    ),
  gender: y.string().oneOf(["male", "female"]).notRequired(),
  birthday: y.string().notRequired(),
});

export type ReqCreateUserType = y.InferType<typeof CreateUserSchema>;

export type ResUpdateUserType = {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    phoneCode?: string;
    cart: {
      id: number;
      product: ProductType;
      quantity: number;
    }[];
    favorite: { productId: number }[];
    favorite_items: FavoriteItem[];
    birthday?: string;
    gender?: "male" | "female";
    orders: OrderType[];
    addresses: AddressType[];
    role?: string;
    is_blocked: boolean;
    orders_number: string;
    favorites_number: number;
    created_at: string;
  };
};
