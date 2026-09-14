import { AddressType } from "../profile/address";
import { OrderType } from "../shop/order";
import { ProductType } from "../shop/product";

export type User = {
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
  birthday?: string;
  gender?: "male" | "female";
  orders: OrderType[];
  addresses: AddressType[];
  role?: string;
};
