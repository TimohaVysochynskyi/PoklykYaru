import axios from 'axios';
import './index'

export const fetchAllProducts = async () => {
    const response = await axios.get(`/products`);

    const result = response.data;

    return result;
};
export const fetchProductWithId = async (id: string) => {
    const response = await axios.get(`/products/${id}`);

    const result = response.data;

    return result;
};