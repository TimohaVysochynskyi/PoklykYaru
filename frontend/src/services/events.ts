import axios from 'axios';
import { apiUrl } from '../utils/constants';
import { setAuthHeader } from './merch';

const URL = apiUrl('/event-management/events');

export const fetchAllEvents = async () => {
    const response = await axios.get(`${URL}/`);
    return response.data;
};

export const fetchEventById = async (id: string) => {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
};

export const fetchEventByPath = async (path: string) => {
    const response = await axios.get(`${URL}/by-path/${path}`);
    return response.data;
};

export const createEvent = async (formData: FormData, accessToken: string) => {
    setAuthHeader(accessToken);
    const response = await axios.post(`${URL}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateEvent = async (
    id: string,
    formData: FormData,
    accessToken: string
) => {
    setAuthHeader(accessToken);
    const response = await axios.put(`${URL}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteEvent = async (id: string, accessToken: string) => {
    setAuthHeader(accessToken);
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
};
