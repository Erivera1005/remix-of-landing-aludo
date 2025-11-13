import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import collarsImage from "@/assets/collars-product.jpeg";

// Sample products
const products: Product[] = [
  {
    id: 1,
    name: "Collar ALUDO Classic Grey",
    price: 89.99,
    image: collarsImage,
    color: "Grey",
    description: "Collar inteligente con IA integrada. Monitoreo de salud 24/7 y materiales ecosostenibles.",
  },
  {
    id: 2,
    name: "Collar ALUDO Premium Rose",
    price: 99.99,
    image: collarsImage,
    color: "Rose",
    description: "Edición premium con acabado rosado. Tecnología de punta para el bienestar de tu mascota.",
  },
  {
    id: 3,
    name: "Collar ALUDO Pro Black",
    price: 109.99,
    image: collarsImage,
    color: "Black",
    description: "Versión Pro con funciones avanzadas de IA. Análisis predictivo de comportamiento.",
  },
  {
    id: 4,
    name: "Collar ALUDO Elite Brown",
    price: 94.99,
    image: collarsImage,
    color: "Brown",
    description: "Elegancia y tecnología en cuero ecológico. Perfecto para razas medianas y grandes.",
  },
  {
    id: 5,
    name: "Collar ALUDO Smart Silver",
    price: 89.99,
    image: collarsImage,
    color: "Silver",
    description: "Diseño futurista con acabado metálico. Resistente al agua y ultra duradero.",
  },
  {
    id: 6,
    name: "Collar ALUDO Eco Green",
    price: 84.99,
    image: collarsImage,
    color: "Green",
    description: "100% materiales reciclados. La opción más sostenible con IA completa.",
  },
];

const Shop = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState("all");

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.color.toLowerCase() === filter);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Nuestra Colección
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Explora nuestra línea completa de collares inteligentes con IA. Tecnología avanzada para el cuidado de tu mascota.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" 
              ? "bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)]" 
              : "border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
            }
          >
            Todos
          </Button>
          <Button
            variant={filter === "grey" ? "default" : "outline"}
            onClick={() => setFilter("grey")}
            className={filter === "grey" 
              ? "bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)]" 
              : "border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
            }
          >
            Gris
          </Button>
          <Button
            variant={filter === "rose" ? "default" : "outline"}
            onClick={() => setFilter("rose")}
            className={filter === "rose" 
              ? "bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)]" 
              : "border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
            }
          >
            Rosado
          </Button>
          <Button
            variant={filter === "black" ? "default" : "outline"}
            onClick={() => setFilter("black")}
            className={filter === "black" 
              ? "bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)]" 
              : "border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
            }
          >
            Negro
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
