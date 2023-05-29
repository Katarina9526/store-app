import { Product } from '@/types/product';

export const getProducts = async () => {
	const res = await fetch('https://fakestoreapi.com/products');
	return res.json() as Promise<Product[]>;
};

export const getProductById = async (id: number) => {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);
	return res.json() as Promise<Product>;
};
