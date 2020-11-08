import { Client } from 'pg';
import { DB_CONFIG } from '../configs';

export const getProducts = async () => {
  console.log('Connecting to DB...');
  const client = new Client(DB_CONFIG);
  await client.connect();
  console.log('Successfully connected to DB!');
  let products;

  try {
    console.log('Execute query on DB to get products..');
    const { rows } = await client.query(
        `SELECT products.*, stocks.count FROM products LEFT JOIN stocks ON products.id=stocks.product_id;`
    );
    products = rows;
    console.log('Products successfully received: ', products);
  } catch (error) {
    console.log('Error during database request executing:', error);
    throw error;
  } finally {
    console.log('Close DB connection.');
    client.end();
  }

  return products;
};
