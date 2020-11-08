import { APIGatewayProxyResult } from 'aws-lambda';
import { headers } from '../constants';

export const createApiResponse = (body, statusCode: number): APIGatewayProxyResult => ({
    headers,
    statusCode,
    body: JSON.stringify(body),
});
