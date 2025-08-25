// Component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/ui/card';
import Button from '../Button';
import Label from '../Label';
import { Input } from '../Input';
import Badge from '../Badge';

// Icons
import { Loader2, ShoppingCartIcon, Star } from 'lucide-react';

// Types
import { Product } from '@/types';

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart: (product: Product, quantity: number) => void;
  readonly isAddingToCart: () => boolean;
}

function ProductCard({
  product,
  onAddToCart,
  isAddingToCart,
}: ProductCardProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const quantity = Number(formData.get('quantity')) || 1;
    onAddToCart(product, quantity);
  };

  const { id, name, description, category, image, price, stock, rating } =
    product;

  const isDisabled = isAddingToCart() || stock === 0;

  let buttonContent: React.ReactNode;
  if (isAddingToCart()) {
    buttonContent = (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Adding...
      </>
    );
  } else if (stock === 0) {
    buttonContent = 'Out of Stock';
  } else {
    buttonContent = (
      <>
        <ShoppingCartIcon className="mr-2 h-4 w-4" />
        Add to Cart
      </>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <div className="relative overflow-hidden rounded-t-xl">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {stock === 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
        {rating && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 flex items-center gap-1"
          >
            <Star className="h-3 w-3 fill-current text-warning" />
            {rating}
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-2 mb-4">
          <CardTitle className="text-lg text-quaternary">{name}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
          <Badge variant="outline" className="w-fit">
            {category}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-accent">
            ${price.toFixed(2)}
          </span>
          <Badge variant={stock > 0 ? 'default' : 'secondary'}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input type="hidden" name="productId" value={id} />

          <div className="flex items-center space-x-2">
            <Label htmlFor={`quantity-${id}`} className="text-sm">
              Quantity:
            </Label>
            <Input
              id={`quantity-${id}`}
              name="quantity"
              type="number"
              min="1"
              max={stock}
              defaultValue="1"
              className="w-20"
              disabled={product.stock === 0}
            />
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full"
            size="lg"
          >
            {buttonContent}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
