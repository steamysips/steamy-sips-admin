export interface Product {
  product_id: number;
  name: string;
  calories: number;
  img_url: string;
  img_alt_text: string;
  category: string;
  price: number;
  description: string;
  created_date: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}
