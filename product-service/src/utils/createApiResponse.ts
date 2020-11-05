import { headers } from '../constants';
import { IApiResponse, } from '../types';

export const createApiResponse = (body, statusCode: number): IApiResponse => ({
    headers,
    statusCode,
    body: JSON.stringify(body),
});
