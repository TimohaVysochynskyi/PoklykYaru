import axios from 'axios';
import { apiUrl } from '../../utils/constants';

export type AdminOrderItem = {
    product: string;
    variation: { size?: string[]; color?: string[] };
    quantity: number;
    price: number; // UAH or kop normalized by backend
};

export type AdminOrder = {
    _id: string;
    customer: string;
    items: AdminOrderItem[];
    totalPrice: number;
    status: 'pending' | 'paid' | 'failed' | 'expired' | 'canceled';
    invoiceId?: string;
    invoiceUrl?: string;
    reference?: string;
    payment?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
};

export async function fetchAllOrders() {
    const res = await axios.get(apiUrl('/merch/payments/all'));
    return res.data.data as AdminOrder[];
}
