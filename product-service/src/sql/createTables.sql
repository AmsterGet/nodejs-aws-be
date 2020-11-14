CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  title text NOT NULL,
  description text,
  price integer
);

CREATE TABLE IF NOT EXISTS stocks (
  product_id uuid,
  count integer,
  foreign key ("product_id") references "products" ("id")
);
