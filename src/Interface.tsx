export interface productListType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface filtersProps {
  handleClear: () => void;
  handleRunReport: () => void;
  handleCategoryChange: (event: any) => void;
  handleProductChange: (event: any) => void;
  category: string;
  categoryList: string[];
  product: string[];
  productList: productListType[];
}
