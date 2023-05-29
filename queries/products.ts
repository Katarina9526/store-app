import { Product } from '@/types/product';

export const getProducts = async () => {
	const res = await fetch('https://fakestoreapi.com/products');
	return res.json() as Promise<Product[]>;
};
