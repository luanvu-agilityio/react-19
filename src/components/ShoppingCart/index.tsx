import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui';
import Badge from '../Badge';
import Button from '../Button';

import {
  CheckCircle,
  XCircle,
  ShoppingCart as ShoppingCartIcon,
} from 'lucide-react';

import { CartItem } from '@/types';
import { cn } from '@/lib/utils';

type ShoppingCartProps = {
  readonly cartItems: readonly CartItem[];
  readonly onRemoveItem: (id: string | number) => void;
  readonly className?: string;
};

function ShoppingCart({
  cartItems,
  onRemoveItem,
  className,
}: ShoppingCartProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.cartQuantity, 0);

  return (
    <Card className={cn('sticky top-4 bg-white', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-quaternary">
          <ShoppingCartIcon className="h-5 w-5" />
          Shopping Cart
          {itemCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {itemCount} items
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCartIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cartItems.map(({ id, image, name, price, cartQuantity }) => (
              <div
                key={id}
                className="flex items-center gap-4 p-4 border border-neutral-light rounded-lg bg-muted-background"
              >
                <img
                  src={image}
                  alt={name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm text-quaternary">
                    {name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    ${price.toFixed(2)} × {cartQuantity}
                  </p>
                  <p className="font-medium text-accent">
                    ${(price * cartQuantity).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(id)}
                  className="text-destructive hover:text-destructive-foreground"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {cartItems.length > 0 && (
        <CardFooter className="flex-col space-y-4">
          <hr className="w-full border-neutral-light" />
          <div className="flex justify-between items-center w-full text-lg font-semibold text-quaternary">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            size="lg"
            className="w-full bg-success-foreground text-white hover:bg-success-background"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
export default ShoppingCart;
