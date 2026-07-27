import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden border-primary/10 bg-card/80 hover-lift cursor-pointer content-contain flex flex-col">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-white">
          <img
            src={product.image}
            alt={`Collar inteligente ALUDO ${product.color} para perros Colombia`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-0 md:p-3 scale-125 md:scale-100 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors duration-500">
              {product.name}
            </h3>
          </Link>
          <p className="text-foreground/70 text-sm md:text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between gap-3 mt-4 md:mt-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl md:text-2xl font-bold text-primary leading-none">
              ${product.price.toLocaleString('es-CO')}
            </span>
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="text-sm md:text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString('es-CO')}
                </span>
              )}
              {product.discount && (
                <span className="inline-flex items-center rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/product/${product.id}`)}
            className="transition-transform duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground text-sm md:text-sm px-4 py-2.5 border-primary/30"
          >
            Ver producto
            <ArrowRight className="w-4 h-4 md:w-4 md:h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
