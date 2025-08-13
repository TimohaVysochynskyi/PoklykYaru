import axios from 'axios';
import './index'
import { CategoryType, ProductType } from '../../types/Product.types';
import { setAuthHeader } from './index';
import { apiUrl } from "../../utils/constants";

const URL = apiUrl('/merch');

export const fetchAllProducts = async () => {
    const response = await axios.get(`${URL}/products`);

    return response.data;
};
export const fetchProductWithId = async (id: string) => {
    const response = await axios.get(`${URL}/products/${id}`);

    return response.data;
};
export const addProduct = async (payload: ProductType, accessToken: string) => {
    setAuthHeader(accessToken);
    const response = await axios.post(`${URL}/products/`, payload);

    return response.data;
};
export const updateProductWithId = async (id: string, payload: ProductType, accessToken: string) => {
    setAuthHeader(accessToken);
    const response = await axios.put(`${URL}/products/${id}`, payload);

    return response.data;
};
export const fetchAllCategories = async () => {
    const response = await axios.get(`${URL}/categories`);

    return response.data;
}
export const addCategory = async (payload: CategoryType, accessToken: string) => {
    setAuthHeader(accessToken);
    const response = await axios.post(`${URL}/categories`, payload);

    return response.data;
};