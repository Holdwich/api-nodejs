import express from 'express';

const app = express();
const router = express.Router();

// declaração de rotas

router.post('/order', (req, res) => {
    console.log("Criação de pedido");
    res.status(201).json({ message: "Pedido criado com sucesso!" });
});

router.get('/order/:id', (req, res) => {
    const orderId = req.params.id;
    console.log(`Consulta de pedido ${orderId}`);
    res.status(200).json({ id: orderId, item: "Produto Exemplo", quantity: 1, value: 100.00 });
});

router.get('/order/list', (req, res) => {
    console.log("Listagem de todos os pedidos");
    res.status(200).json([
        { id: 1, item: "Produto Exemplo", quantity: 1, value: 100.00 },
        { id: 2, item: "Outro Produto", quantity: 2, value: 200.00 }
    ]);
});

router.delete('/order/:id', (req, res) => {
    const orderId = req.params.id;
    console.log(`Exclusão de pedido ${orderId}`);
    res.status(200).json({ message: `Pedido ${orderId} excluído com sucesso!` });
});

export default router;