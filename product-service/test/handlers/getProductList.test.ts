import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { getProductList } from '../../src/handlers';
import * as getProductsService from '../../src/services/getProducts';
import { mockProducts } from '../mocks';
import { IApiResponse } from '../../src/types';

describe('getProductList handler', () => {
    test('should return all products', async () => {
        jest.spyOn(getProductsService, 'getProducts').mockImplementationOnce(async () => mockProducts);

        const data = await getProductList({} as APIGatewayProxyEvent, {} as Context, null) as IApiResponse;

        expect(data.statusCode).toBe(OK);
        expect(data.body).toEqual(JSON.stringify(mockProducts));
    });

    test('should return response with INTERNAL_SERVER_ERROR code in case of error during execution', async () => {
        const error = new Error('error');
        jest.spyOn(getProductsService, 'getProducts').mockImplementationOnce(async () => {
            throw error;
        });

        const data = await getProductList({} as APIGatewayProxyEvent, {} as Context, null) as IApiResponse;

        expect(data.statusCode).toBe(INTERNAL_SERVER_ERROR);
        expect(data.body).toEqual(JSON.stringify({ message: error }));
    });

    afterAll(() => {
        jest.clearAllMocks();
    })
});
