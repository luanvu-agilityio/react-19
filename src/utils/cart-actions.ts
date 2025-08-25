import { CartItem } from '@/types';

export type CartAction =
  | { type: 'add'; payload: { product: CartItem; quantity: number } }
  | { type: 'remove'; payload: { id: string | number } }
  | { type: 'reset-success' }
  | { type: 'reset-error' };

export interface CartState {
  data: CartItem[];
  success?: boolean;
  error?: string | undefined;
}

export async function cartReducer(
  prevState: CartState,
  action: CartAction
): Promise<CartState> {
  switch (action.type) {
    case 'add': {
      const { product, quantity } = action.payload;
      const existing = prevState.data.find((item) => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prevState.data.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        updatedCart = [
          ...prevState.data,
          { ...product, cartQuantity: quantity },
        ];
      }
      return {
        ...prevState,
        data: updatedCart,
        success: true,
        error: undefined,
      };
    }
    case 'remove': {
      const updatedCart = prevState.data.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...prevState,
        data: updatedCart,
        success: true,
        error: undefined,
      };
    }
    case 'reset-success':
      return { ...prevState, success: false };

    case 'reset-error':
      return { ...prevState, error: undefined };
    default:
      return prevState;
  }
}
