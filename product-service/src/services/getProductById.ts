import { getProducts } from './getProducts';

export const getProductById = async (id) => {
    const products = await getProducts();

    return products.find((product) => product.id === id);
};
