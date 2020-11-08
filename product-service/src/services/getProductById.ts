import { getProducts } from './getProducts';
import { Product } from '../models';

export const getProductById = async (id): Promise<Product> => {
    const products: Product[] = await getProducts();

    return products.find((product) => product.id === id);
};
