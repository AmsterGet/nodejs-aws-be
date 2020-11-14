import { Client } from 'pg';
import { Product } from '../models';
import { DB_CONFIG } from '../configs';

const newProductQueryString = 'INSERT INTO products(title, description, price) VALUES ($1, $2, $3) RETURNING id';
const newStockQueryString = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)';

export const createNewProduct = async ({ title, description, price, count }: Omit<Product, 'id'>): Promise<string> => {
    console.log('Connecting to DB...');
    const DBClient = new Client(DB_CONFIG);
    await DBClient.connect();
    console.log('Successfully connected to DB!');
    let newProductId: string;

    try {
        console.log('Start transaction.');
        await DBClient.query('BEGIN');

        console.log('Execute query on DB to create new product..');
        const {
            rows: [{ id }],
        } = await DBClient.query<Product>(newProductQueryString, [
            title,
            description,
            price,
        ]);
        newProductId = id;
        console.log('Product created! Product id: ', newProductId);


        console.log('Execute query on DB to create stock for just created product..');
        await DBClient.query<Product>(newStockQueryString, [
            newProductId,
            count,
        ]);
        console.log('Stock successfully created!');
        console.log('Finish transaction.');
        await DBClient.query('COMMIT');
    } catch (error) {
        console.error('Error during database request executing: ', error);

        console.log('Rollback transaction.');
        await DBClient.query('ROLLBACK');

        throw error;
    } finally {
        console.log('Close DB connection.');
        DBClient.end();
    }

    return newProductId;
};
