import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showAlt, setShowAlt] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    if (isMobile && product.hoverImage) {
      e.preventDefault();
      if (showAlt) {
        // Second tap navigates
        navigate(`/product/${product.id}`);
      } else {
        setShowAlt(true);
      }
    }
  };

  return (
    <Card className="group overflow-hidden border-primary/10 bg-card/80 hover-lift cursor-pointer content-contain flex flex-col">
      <Link
        to={`/product/${product.id}`}
        onClick={isMobile && product.hoverImage ? (e) => e.preventDefault() : undefined}
      >
        <div
          className="relative aspect-square overflow-hidden"
          onClick={handleImageClick}
        >
          <img
            src={product.image}
            alt={`Collar inteligente ALUDO ${product.color} para perros Colombia`}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isMobile
                ? showAlt ? 'opacity-0' : 'opacity-100'
                : product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-300'
            }`}
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} lifestyle`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isMobile
                  ? showAlt ? 'opacity-100' : 'opacity-0'
                  : 'opacity-0 group-hover:opacity-100'
              }`}
            />
          )}
          <div className="absolute inset-0 from-background/80 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t" />
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
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {product.discount && (
                <span className="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs md:text-xs font-bold text-destructive-foreground">
                  {product.discount}% OFF
                </span>
              )}
              {product.originalPrice && (
                <span className="text-sm md:text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString('es-CO')}
                </span>
              )}
            </div>
            <span className="text-2xl md:text-2xl font-bold text-primary">
              ${product.price.toLocaleString('es-CO')}
            </span>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="transition-transform duration-200 hover:scale-105 text-sm md:text-sm px-4 py-2.5"
          >
            <ShoppingCart className="w-4 h-4 md:w-4 md:h-4 mr-2" />
            Añadir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
