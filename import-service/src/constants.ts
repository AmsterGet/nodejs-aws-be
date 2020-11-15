export const headers = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
};

export enum ErrorMessages {
    NOT_FOUND = 'Product not found. Please try another product id',
    BAD_REQUEST = 'Request data is invalid. Please use the correct values.'
}

export const BUCKET = 'recycle-buckets-shop-files';

export const ALLOWED_FILE_CONTENT_TYPE = 'text/csv';
