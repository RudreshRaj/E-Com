interface Rating {
  rate: number;
  count: number;
}

export interface ProductInfo {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  cart_id?: number;
}
