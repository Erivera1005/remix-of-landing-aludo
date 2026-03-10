import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  hoverImage?: string;
  color: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-primary/10 bg-card/80 hover-lift cursor-pointer content-contain flex flex-col">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-500 ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-300'}`}
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} lifestyle`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          <div className="absolute inset-0 from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t" />
        </div>
      </Link>
      
      <CardContent className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base md:text-xl font-semibold mb-1.5 md:mb-2 text-primary group-hover:text-primary/80 transition-colors duration-500">
              {product.name}
            </h3>
          </Link>
          <p className="text-foreground/70 text-xs md:text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between gap-2 mt-3 md:mt-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {product.discount && (
                <span className="inline-flex items-center rounded-full bg-destructive px-2 py-0.5 text-[10px] md:text-xs font-bold text-destructive-foreground">
                  {product.discount}% OFF
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs md:text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString('es-CO')}
                </span>
              )}
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary">
              ${product.price.toLocaleString('es-CO')}
            </span>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            size="sm"
            className="transition-transform duration-200 hover:scale-105 text-xs md:text-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
            Añadir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
