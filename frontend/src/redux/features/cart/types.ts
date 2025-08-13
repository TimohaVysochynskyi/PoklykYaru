import { ProductType } from '../../../types/Product.types';

// Cart item variation
export interface CartItemVariation {
  size: string[];
  color: string[];
}

// Basic cart item
export interface CartItem {
  _id?: string;
  product: string;
  variation: CartItemVariation;
  quantity: number;
  price: number;
  newVariation?: CartItemVariation;
}

// Cart item with product data
export interface CartProduct extends CartItem {
  productData: ProductType;
}

// Update cart item request
export interface UpdateCartItemRequest extends CartProduct {
  action: string;
}

// Cart state interface
export interface CartState {
  items: CartProduct[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

// API response types
export interface CartResponse {
  data: CartProduct[];
  message?: string;
}