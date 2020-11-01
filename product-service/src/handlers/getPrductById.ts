import { APIGatewayProxyHandler, APIGatewayProxyEvent, ProxyResult } from 'aws-lambda';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { getProductById as getProductByIdService } from '../services';
import { createApiResponse } from '../utils';

export const getProductById: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<ProxyResult> => {
    console.log('Lambda invocation with event: ', event);

    try {
        const { pathParameters: { productId } } = event;
        console.log('Product id to find: ', productId);

        const product = await getProductByIdService(productId);
        console.log('Product found: ', product);

        return createApiResponse(product, OK);
    } catch (error) {
        console.error('Error: ', error);
        return createApiResponse({ message: error }, INTERNAL_SERVER_ERROR);
    }
};
