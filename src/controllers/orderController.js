import * as orderService from '../services/orderService.js';

export async function createOrder(req, res) {
    try {
        // extrai os dados do corpo da requisição
        const orderData = req.body;

        // processamento do pedido usando o serviço
        const order = await orderService.createOrder(orderData);

        res.status(201).json({
        message: "Pedido criado com sucesso",
        data: order
        });

    //em caso de erro, captura e retorna uma resposta de erro
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro: " + error.message });
    }
}

export async function getOrderById(req, res) {

    try {
        // extrai o ID do pedido da rota
        const orderId = req.params.id;

        // busca o pedido usando o serviço
        const order = await orderService.getOrderById(orderId);

        // se o pedido não for encontrado, retorna um erro 404
        if (!order) {
        return res.status(404).json({
            error: "Pedido não encontrado"
        });
        }

        res.status(200).json({ data: order });

    // em caso de erro, captura e retorna uma resposta de erro
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro: " + error.message});
    }
}

export async function getOrders(req, res) {
    try {
        // busca todos os pedidos usando o serviço
        const orders = await orderService.getOrders();

        res.status(200).json({ data: orders });

    // em caso de erro, captura e retorna uma resposta de erro
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro ao buscar pedidos: " + error.message});
    }
}

export async function deleteOrderById(req, res) {

    try {
        // extrai o ID do pedido da rota
        const orderId = req.params.id;

        // deleta o pedido usando o serviço
        const deleted = await orderService.deleteOrderById(orderId);

        if (!deleted) {
        return res.status(404).json({
            error: "Pedido não encontrado"
        });
        }

        res.status(200).json({
        message: "Pedido deletado com sucesso"
        });

    // em caso de erro, captura e retorna uma resposta de erro
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro: " + error.message});
    }

}