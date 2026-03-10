import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import collarDarkGrey from "@/assets/collar-dark-grey.jpeg";
import collarDarkGreyLifestyle from "@/assets/collar-darkgrey-lifestyle.png";
import collarRosewood from "@/assets/collar-rosewood.jpeg";
import collarRosewoodLifestyle from "@/assets/collar-rosewood-lifestyle.png";

// Productos oficiales de ALUDO
const products: Product[] = [
  {
    id: 1,
    name: "Collar Inteligente ALUDO - Dark Grey",
    price: 89900,
    originalPrice: 119900,
    discount: 25,
    image: collarDarkGrey,
    hoverImage: collarDarkGreyLifestyle,
    color: "Dark Grey",
    description: "Collar inteligente con IA integrada. Cuero vegano premium, herrajes reciclables. Talla ajustable 30-60cm. Fabricado en Colombia.",
  },
  {
    id: 2,
    name: "Collar Inteligente ALUDO - Rosewood",
    price: 89900,
    originalPrice: 119900,
    discount: 25,
    image: collarRosewood,
    color: "Rosewood",
    description: "Collar inteligente con IA integrada. Cuero vegano premium, herrajes reciclables. Talla ajustable 30-60cm. Fabricado en Colombia.",
  },
];

const Shop = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState("all");

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.color.toLowerCase().replace(" ", "") === filter);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-primary">
            Collar Inteligente ALUDO
          </h1>
          <p className="text-base md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Collares con Inteligencia Artificial integrada. Fabricados en Colombia con materiales ecológicos. 
            Cada compra dona $2.000 COP a fundaciones de rescate animal.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in-up">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-300" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            }
          >
            Todos
          </Button>
          <Button
            variant={filter === "darkgrey" ? "default" : "outline"}
            onClick={() => setFilter("darkgrey")}
            className={filter === "darkgrey" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-300" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            }
          >
            Dark Grey
          </Button>
          <Button
            variant={filter === "rosewood" ? "default" : "outline"}
            onClick={() => setFilter("rosewood")}
            className={filter === "rosewood" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-300" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            }
          >
            Rosewood
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 animate-fade-in-up">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(product) => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  color: product.color,
                });
              }}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <p className="text-base md:text-xl text-foreground/70">
              No hay productos disponibles con este filtro.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
