import db from "../config/database.js";

//declaração de funções para acesso ao banco de dados usando promises para facilitar o uso com async/await

function runAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
        });
    });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}


// declaração de funções específicas para operações relacionadas a pedidos


export async function createOrderWithItems(orderData) {
    // extrai os dados do pedido
    const { numeroPedido, valorTotal, dataCriacao, items } = orderData;

    try {

        // inicia uma transação para garantir a atomicidade da operação
        await runAsync("BEGIN TRANSACTION");

        // insere o pedido na tabela de pedidos com seus itens relacionados na tabela de itens
        await runAsync(
          `INSERT INTO orders (orderId, value, creationDate)
          VALUES (?, ?, ?)`,
          [numeroPedido, valorTotal, dataCriacao]
        );

        for (const item of items) {

          await runAsync(
              `INSERT INTO items (orderId, productId, quantity, price)
              VALUES (?, ?, ?, ?)`,
              [
              numeroPedido,
              item.idItem,
              item.quantidadeItem,
              item.valorItem
              ]
          );
        }

        await runAsync("COMMIT");

        return orderData;

    } catch (error) {
        // em caso de erro, realiza o rollback da transação
        await runAsync("ROLLBACK");
        throw new Error("Erro ao criar o pedido no banco de dados");
    }
}

export async function getOrderById(orderId) {

    try {
        // busca o pedido no banco de dados com o devido ID
        const order = await getAsync(
          `SELECT orderId, value, creationDate
          FROM orders
          WHERE orderId = ?`,
          [orderId]
        );

        // se o pedido não for encontrado, retorna null
        if (!order) {
          return null;
        }

        // busca os itens relacionados ao pedido encontrado
        const items = await allAsync(
          `SELECT productId, quantity, price
          FROM items
          WHERE orderId = ?`,
          [orderId]
        );

        // organização dos dados do pedido e seus itens para retorno
        return {
          orderId: order.orderId,
          value: order.value,
          creationDate: order.creationDate,
          items: items
        };

    } catch (error) {
        throw new Error("Erro ao buscar o pedido no banco de dados");
    }
}

export async function getOrders() {

    try {
        // busca todos os pedidos e seus itens no banco de dados
        const orders = await allAsync(`
          SELECT orderId, value, creationDate
          FROM orders
        `);

        const items = await allAsync(`
          SELECT orderId, productId, quantity, price
          FROM items
        `);

        // organização dos pedidos e seus itens para retorno, agrupando os itens pelo ID do pedido
        const ordersMap = {};

        for (const order of orders) {
          ordersMap[order.orderId] = {
              orderId: order.orderId,
              value: order.value,
              creationDate: order.creationDate,
              items: []
          };
        }

        // se o item pertencer a um pedido existente, adiciona o item à lista de itens do pedido correspondente
        for (const item of items) {
            if (ordersMap[item.orderId]) {
                ordersMap[item.orderId].items.push({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.price
                });
            }
        }

        return Object.values(ordersMap);

    } catch (error) {
        throw new Error("Erro ao buscar os pedidos no banco de dados");
    }
}

export async function deleteOrderById(orderId) {

  try {
    // deleta o pedido e seus itens relacionados no banco de dados usando o ID do pedido
    const result = await runAsync(
      `DELETE FROM orders
       WHERE orderId = ?`,
      [orderId]
    );

    return result.changes > 0;

  } catch (error) {
    throw new Error("Erro ao deletar o pedido no banco de dados");
  }
}