export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingInterface;
  qty: number;
  subTotal: number;
}

interface RatingInterface {
  rate: number;
  count: number;
}
