import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import { getProductById } from '../../src/handlers';
import * as getProductsService from '../../src/services/getProducts';
import { mockProducts } from '../mocks';
import { ERROR_MESSAGES } from '../../src/constants';

describe('getProductsById handler', () => {
    test('should return right product with corresponding id', async () => {
        jest.spyOn(getProductsService, 'getProducts').mockImplementationOnce(async () => mockProducts);

        const data = await getProductById(
            { pathParameters: { productId: mockProducts[0].id } } as unknown as APIGatewayProxyEvent,
            {} as Context,
            null,
        ) as APIGatewayProxyResult;

        expect(data.statusCode).toBe(OK);
        expect(data.body).toEqual(JSON.stringify(mockProducts[0]));
    });

    test('should return response with NOT_FOUND code in case of unknown product', async () => {
        jest.spyOn(getProductsService, 'getProducts').mockImplementationOnce(async () => mockProducts);

        const data = await getProductById(
            { pathParameters: { productId: 'blaId' } } as unknown as APIGatewayProxyEvent,
            {} as Context,
            null,
        ) as APIGatewayProxyResult;

        expect(data.statusCode).toBe(NOT_FOUND);
        expect(data.body).toEqual(JSON.stringify({ message: ERROR_MESSAGES.NOT_FOUND }));
    });

    test('should return response with INTERNAL_SERVER_ERROR code in case of error during execution', async () => {
        const error = new Error('error');
        jest.spyOn(getProductsService, 'getProducts').mockImplementationOnce(async () => {
            throw error;
        });

        const data = await getProductById(
            { pathParameters: { productId: mockProducts[0].id } } as unknown as APIGatewayProxyEvent,
            {} as Context,
            null,
        ) as APIGatewayProxyResult;

        expect(data.statusCode).toBe(INTERNAL_SERVER_ERROR);
        expect(data.body).toEqual(JSON.stringify({ message: error }));
    });

    afterAll(() => {
        jest.clearAllMocks();
    })
});
