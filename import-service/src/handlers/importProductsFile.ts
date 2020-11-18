import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { BUCKET, REGION, ALLOWED_FILE_CONTENT_TYPE, UPLOADED_FILES_DIR } from '../constants';
import { createApiResponse } from '../utils';

export const importProductsFile: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    console.log('Lambda invocation with event: ', event);

    try {
        const { name } = event.queryStringParameters;
        const path = `${UPLOADED_FILES_DIR}/${name}`;
        const s3 = new S3({ region: REGION });
        console.log('Using bucket: ', BUCKET);
        const params = {
            Bucket: BUCKET,
            Key: path,
            Expires: 60,
            ContentType: ALLOWED_FILE_CONTENT_TYPE,
        };

        console.log('Getting signet URL from S3..');

        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        console.log('URL for upload received: ', signedUrl);

        return createApiResponse(signedUrl, OK);
    } catch (error) {
        console.error('Error: ', error);
        return createApiResponse({ message: error }, INTERNAL_SERVER_ERROR);
    }
};
