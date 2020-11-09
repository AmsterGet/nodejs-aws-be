import { Client } from 'pg';
import { DB_CONFIG } from '../configs';
import { Product } from '../models';

const queryString = `SELECT products.*, stocks.count FROM products LEFT JOIN stocks ON products.id=stocks.product_id;`;

export const getProducts = async (): Promise<Product[]> => {
  console.log('Connecting to DB...');
  const DBClient = new Client(DB_CONFIG);
  await DBClient.connect();
  console.log('Successfully connected to DB!');
  let products: Product[];

  try {
    console.log('Execute query on DB to get products..');
    const { rows } = await DBClient.query(queryString);
    products = rows;
    console.log('Products successfully received: ', products);
  } catch (error) {
    console.log('Error during database request executing: ', error);
    throw error;
  } finally {
    console.log('Close DB connection.');
    DBClient.end();
  }

  return products;
};
