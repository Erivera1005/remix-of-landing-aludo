import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-primary/10 bg-card/80 hover-lift cursor-pointer content-contain">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t" />
        </div>
      </Link>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors duration-500">
              {product.name}
            </h3>
          </Link>
          <p className="text-foreground/70 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            €{product.price}
          </span>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="transition-transform duration-300 hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Añadir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
