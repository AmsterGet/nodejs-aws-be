import { getProductById } from '../../src/services';
import { mockProducts } from '../mocks';

jest.mock('../../src/services/getProducts', () => ({
    getProducts: jest.fn(() => mockProducts),
}));

describe('Get product by id service', () => {
    test('Should return right product with corresponding id', async () => {
        const product = await getProductById(mockProducts[0].id);

        expect(product).toEqual(mockProducts[0]);
    });

    test('Should return undefined in case of unknown id', async () => {
        const product = await getProductById('123');

        expect(product).toBe(undefined);
    });
});
