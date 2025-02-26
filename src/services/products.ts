export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  return await res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  return await res.json();
}
