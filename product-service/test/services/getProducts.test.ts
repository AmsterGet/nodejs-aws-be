import { getProducts } from '../../src/services';

describe('Get products service', () => {
    test('Should return all products in array', async () => {
        const products = await getProducts();

        expect(products).toBeInstanceOf(Array);
    });
});
