-- tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    orderId TEXT PRIMARY KEY,
    value REAL NOT NULL,
    creationDate TEXT NOT NULL
);

-- tabela de itens do pedido
CREATE TABLE IF NOT EXISTS items (
    orderId TEXT NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,

    PRIMARY KEY (orderId, productId),

    FOREIGN KEY (orderId)
        REFERENCES orders(orderId)
        ON DELETE CASCADE
);