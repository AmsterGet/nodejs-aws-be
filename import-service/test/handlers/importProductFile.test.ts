import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWSMock from 'aws-sdk-mock';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { importProductsFile } from '../../src/handlers';

const fileName = 'file.csv';

describe('importProductsFile handler', () => {
    const event = {
        queryStringParameters: {
            name: fileName,
        }
    };

    beforeEach(() => {
        AWSMock.restore();
    });

    test('should return response with signedUrl', async () => {
        const mockedUrl = 'https://file.csv?bla=blabla';
        await AWSMock.mock('S3', 'getSignedUrl', (_, __, callback) => {
            callback(null, mockedUrl);
        });
        const data = await importProductsFile(event as unknown as APIGatewayProxyEvent, {} as Context, null) as APIGatewayProxyResult;

        expect(data.statusCode).toBe(OK);
        expect(data.body).toEqual(JSON.stringify(mockedUrl));
    });

    test('should return response with INTERNAL_SERVER_ERROR code in case of error during execution', async () => {
        const error = new Error('error');
        await AWSMock.mock('S3', 'getSignedUrl', () => {
            throw error;
        });

        const data = await importProductsFile(event as unknown as APIGatewayProxyEvent, {} as Context, null) as APIGatewayProxyResult;

        expect(data.statusCode).toBe(INTERNAL_SERVER_ERROR);
        expect(data.body).toEqual(JSON.stringify({ message: error }));
    });
});
