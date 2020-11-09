import { Client } from 'pg';
import { Product } from '../models';
import { DB_CONFIG } from '../configs';

const queryString = `SELECT id, count, price, title, description FROM products INNER JOIN stocks ON id=product_id WHERE id=$id`;

export const getProductById = async (id: string): Promise<Product> => {
    console.log('Connecting to DB...');
    const DBClient = new Client(DB_CONFIG);
    await DBClient.connect();
    console.log('Successfully connected to DB!');
    let product: Product = null;

    try {
        console.log('Execute query on DB to find product by id..');
        const { rows: [foundProduct] } = await DBClient.query(queryString, [id]);

        if (foundProduct) {
            product = foundProduct;
            console.log('Product successfully found: ', product);
        }

    } catch (error) {
        console.error('Error during database request executing: ', error);
        throw error;
    } finally {
        console.log('Close DB connection.');
        DBClient.end();
    }

    return product;
};
