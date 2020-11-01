import { APIGatewayProxyHandler, APIGatewayProxyEvent, ProxyResult } from 'aws-lambda';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { getProducts } from '../services';
import { createApiResponse } from '../utils';

export const getProductList: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<ProxyResult> => {
    console.log('Lambda invocation with event: ', event);

    try {
        console.log('Get all products from service..');
        const products = await getProducts();
        console.log('Products received: ', products);

        return createApiResponse(products, OK);
    } catch (error) {
        console.error('Error: ', error);
        return createApiResponse({ message: error }, INTERNAL_SERVER_ERROR);
    }
};
