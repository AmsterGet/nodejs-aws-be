import { createApiResponse } from '../../src/utils';
import { headers } from '../../src/constants';

describe('createApiResponse', () => {
    test('should create entity with stringified body, status code and constraint headers', () => {
        const body = { message: 'success' };
        const statusCode = 200;

        expect(createApiResponse(body, statusCode)).toEqual({
            headers,
            statusCode,
            body: JSON.stringify(body),
        });
    });
});
