INSERT INTO products (title, description, price) VALUES
('Recycle bucket (small)', 'Small bucket for one type of rubbish', 50),
('Recycle bucket (medium)', 'Medium bucket for one type of rubbish', 70),
('Recycle bucket (large)', 'Large bucket for one type of rubbish', 100),
('Recycle buckets set', 'The set of 3 medium buckets', 200),
('Recycle bucket (extra large)', 'Giant bucket for one type of rubbish', 120)

INSERT INTO stocks (product_id, count) VALUES
((SELECT id from products WHERE title='Recycle bucket (small)' AND price=50), 4),
((SELECT id from products WHERE title='Recycle bucket (medium)' AND price=70), 6),
((SELECT id from products WHERE title='Recycle bucket (large)' AND price=100), 7),
((SELECT id from products WHERE title='Recycle buckets set' AND price=200), 12),
((SELECT id from products WHERE title='Recycle bucket (extra large)' AND price=120), 7)
