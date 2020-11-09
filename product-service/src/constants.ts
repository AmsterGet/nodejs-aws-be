export const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
};

export enum ErrorMessages {
    NOT_FOUND = 'Product not found. Please try another product id',
    BAD_REQUEST = 'Request data is invalid. Please use the correct values.'
}
