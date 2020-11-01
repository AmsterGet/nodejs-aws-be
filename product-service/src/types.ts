import { ProxyResult } from 'aws-lambda';

export interface IApiResponse extends ProxyResult {
    headers: {
        'Content-Type': string;
        'Access-Control-Allow-Methods': string;
        'Access-Control-Allow-Origin': string;
    };
    statusCode: number;
    body: string;
}

