import { APIGatewayProxyHandler, APIGatewayProxyEvent, ProxyResult } from 'aws-lambda';
import { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import { createNewProduct } from '../services';
import { ErrorMessages } from '../constants';
import { createApiResponse, isNewProductValid } from '../utils';

export const createProduct: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<ProxyResult> => {
    console.log('Lambda invocation with event: ', event);

    try {
        const data = JSON.parse(event.body);

        console.log('Validating product data...');
        if (!isNewProductValid(data)) {
            console.error('Request data is invalid.');
            return createApiResponse({ message: ErrorMessages.BAD_REQUEST }, BAD_REQUEST);
        }

        console.log('Creating new product..');
        const newProductId = await createNewProduct(data);
        console.log('Product successfully created!');

        return createApiResponse({ id: newProductId }, CREATED);
    } catch (error) {
        console.error('Error: ', error);
        return createApiResponse({ message: error }, INTERNAL_SERVER_ERROR);
    }
};
