import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { getProducts } from '../services';
import { createApiResponse } from '../utils';
import { Product } from "../models";

export const getProductList: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    _context: Context,
): Promise< APIGatewayProxyResult> => {
    console.log('Lambda invocation with event: ', event);

    try {
        console.log('Get all products from service..');
        const products: Product[] = await getProducts();
        console.log('Products received: ', products);

        return createApiResponse(products, OK);
    } catch (error) {
        console.error('Error: ', error);
        return createApiResponse({ message: error }, INTERNAL_SERVER_ERROR);
    }
};
