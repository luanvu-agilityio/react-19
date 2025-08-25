import { useActionState, useEffect } from 'react';

// Components
import ProductCard from '../ProductCard';
import ShoppingCart from '../ShoppingCart';
import { toast } from '../Toast';

// Icons
import { AlertCircle, CheckCircle } from 'lucide-react';

// Types
import { CartItem, Product } from '@/types';

// Mock
import { mockProducts } from '@/mock';

// Utils
import { cartReducer } from '@/utils';

function ECommerceApp() {
  const [cartState, cartDispatch, isAddingToCart] = useActionState(
    cartReducer,
    { data: [], success: false, error: undefined }
  );

  const handleAddToCart = (product: Product, quantity: number) => {
    const cartItem: CartItem = { ...product, cartQuantity: quantity };
    cartDispatch({ type: 'add', payload: { product: cartItem, quantity } });
  };

  const handleRemoveFromCart = (id: string | number) => {
    cartDispatch({ type: 'remove', payload: { id } });
  };

  useEffect(() => {
    if (cartState.success) {
      toast({
        title: 'Success!',
        description: 'Item added to cart successfully!',
        variant: 'success',
        icon: <CheckCircle className="h-4 w-4 text-success" />,
        hasCloseIcon: true,
        duration: 2000,
      });
      cartDispatch({ type: 'reset-success' });
    }
    if (cartState.error) {
      toast({
        title: 'Error',
        description: cartState.error,
        variant: 'error',
        icon: <AlertCircle className="h-4 w-4 text-destructive" />,
        hasCloseIcon: true,
        duration: 3000,
      });
      cartDispatch({ type: 'reset-error' });
    }
  }, [cartState.success, cartState.error, cartDispatch]);

  return (
    <div className="container mx-auto px-4 py-8 bg-tertiary text-quaternary">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-quaternary">
          Our Products
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover our latest collection of premium tech products
        </p>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isAddingToCart={() => isAddingToCart}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <ShoppingCart
            cartItems={cartState.data || []}
            onRemoveItem={handleRemoveFromCart}
          />
        </div>
      </div>
    </div>
  );
}
export default ECommerceApp;
