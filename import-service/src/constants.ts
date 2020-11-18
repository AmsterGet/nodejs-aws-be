export const headers = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
};

export const ALLOWED_FILE_CONTENT_TYPE = 'text/csv';

export const UPLOADED_FILES_DIR = 'uploaded';
export const PARSED_FILES_DIR = 'parsed';

export const { BUCKET, REGION } = process.env;
