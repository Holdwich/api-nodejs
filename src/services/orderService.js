import * as orderRepository from "../repositories/orderRepository.js";

export async function createOrder(orderData) {

    // impede a criação de pedidos com campos obrigatórios faltando
    if (!orderData.numeroPedido || !orderData.valorTotal || !orderData.dataCriacao || !orderData.items) {
        throw new Error("Pedido com campos obrigatórios faltando");
    }

    // impede a criação de pedidos com id "list"
    if (orderData.numeroPedido && (orderData.numeroPedido).toLowerCase() === "list") {
        throw new Error("ID de pedido inválido");
    }

    // validação do valor total do pedido
    if (typeof orderData.valorTotal !== "number") {
        throw new Error("Valor total deve ser um número");
    }

    // impede a criação de pedidos sem itens
    if (!orderData.items || orderData.items.length === 0) {
        throw new Error("Um pedido deve conter pelo menos um item");
    }
    

    // validação dos dados dos itens do pedido
    for (const item of orderData.items) {

        if (!item.idItem || !item.quantidadeItem || !item.valorItem) {
            throw new Error(`Item do pedido com campos obrigatórios faltando`);
        }

        let idItem = Number(item.idItem);

        if (!Number.isInteger(item.quantidadeItem) || item.quantidadeItem <= 0) {
            throw new Error(`Quantidade do item ${item.idItem} deve ser um número inteiro positivo`);
        }

        if (!Number.isInteger(idItem) || idItem <= 0) {
            throw new Error(`ID do item ${item.idItem} deve ser um número inteiro positivo`);
        }

        if (typeof item.valorItem !== "number" || item.valorItem <= 0) {
            throw new Error(`Valor do item ${item.idItem} deve ser um número positivo`);
        }
    }

    // delegação da criação do pedido para o repositório
    return await orderRepository.createOrderWithItems(orderData);
}

export async function getOrderById(orderId) {
    // delegação da consulta do pedido para o repositório
    return await orderRepository.getOrderById(orderId);
}

export async function getOrders() {
    // delegação da consulta de todos os pedidos para o repositório
    return await orderRepository.getOrders();
}

export async function deleteOrderById(orderId) {
    // delegação da exclusão do pedido para o repositório
    return await orderRepository.deleteOrderById(orderId);
}