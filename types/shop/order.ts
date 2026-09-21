import { ProductType } from "./product";

export type OrderItemType = {
  id: number;
  price: number;
  product: ProductType;
  quantity: number;
};

export type OrderType = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  order_items: OrderItemType[];
};
