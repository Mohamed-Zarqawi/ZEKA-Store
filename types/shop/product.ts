export type ProductType = {
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

  category_id: number;

  brand_id: number;

  featured: boolean;
  isDeleted: boolean;
  ordersNumber: number;
  favoritesNumber: number;
};
