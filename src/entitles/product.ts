type Product = {
  id: string | number;
  title: string;
  description: string;
  price: number | string;
  discountPercentage: number;
  rating: number | string;
  stock: number | string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
export default Product;