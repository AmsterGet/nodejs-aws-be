import { APIGatewayProxyHandler, APIGatewayProxyEvent, ProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { BUCKET, ALLOWED_FILE_CONTENT_TYPE } from '../constants';
import { createApiResponse } from '../utils';

export const importProductsFile: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<ProxyResult> => {
    console.log('Lambda invocation with event: ', event);

    try {
        const { name } = event.queryStringParameters;
        const path = `uploaded/${name}`;
        const s3 = new S3({ region: 'eu-west-1' });
        const params = {
            Bucket: BUCKET,
            Key: path,
            Expires: 60,
            ContentType: ALLOWED_FILE_CONTENT_TYPE,
        };

        console.log('Getting signet URL from S3...');

        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        console.log('URL for upload received: ', signedUrl);

        return createApiResponse(signedUrl, OK);
    } catch (error) {
        console.error('Error: ', error);
        return createApiResponse({ message: error }, INTERNAL_SERVER_ERROR);
    }
};
