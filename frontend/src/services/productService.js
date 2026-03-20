import api from './api';

export const getProducts = async () => {
    try {
        const response = await api.get("products/");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        throw error;
    }
};

export const getProduct = async (id) => {
    try {
        const response = await api.get(`products/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar produto ${id}: `, error);
        throw error;
    }
};