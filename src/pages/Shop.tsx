import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import collarsImage from "@/assets/collars-product.jpeg";

// Productos reales de ALUDO
const products: Product[] = [
  {
    id: 1,
    name: "Collar ALUDO Classic Gris",
    price: 129900,
    image: collarsImage,
    color: "Grey",
    description: "Collar inteligente con chip NFC. Cuero vegano premium, herrajes reciclables. Talla ajustable 30-60cm.",
  },
  {
    id: 2,
    name: "Collar ALUDO Classic Negro",
    price: 129900,
    image: collarsImage,
    color: "Black",
    description: "Elegante diseño negro con tecnología NFC integrada. Resistente al agua y materiales ecológicos.",
  },
  {
    id: 3,
    name: "Collar ALUDO Classic Café",
    price: 129900,
    image: collarsImage,
    color: "Brown",
    description: "Estilo clásico en cuero vegano café. Chip NFC sin batería, perfecto para todas las razas.",
  },
  {
    id: 4,
    name: "Collar ALUDO Classic Rosado",
    price: 129900,
    image: collarsImage,
    color: "Rose",
    description: "Diseño moderno con acabado rosado. Tecnología NFC, materiales sostenibles y ajuste universal.",
  },
  {
    id: 5,
    name: "Collar ALUDO Classic Azul",
    price: 129900,
    image: collarsImage,
    color: "Blue",
    description: "Collar con chip NFC en tono azul. Fabricado en Colombia con materiales ecológicos certificados.",
  },
  {
    id: 6,
    name: "Collar ALUDO Classic Verde",
    price: 129900,
    image: collarsImage,
    color: "Green",
    description: "Diseño eco en tono verde. Cuero vegano, herrajes reciclables y tecnología NFC integrada.",
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            Nuestra Colección
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Collares inteligentes con tecnología NFC. Fabricados en Colombia con materiales ecológicos. Cada compra dona $2.000 COP a fundaciones de rescate animal.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-500" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500"
            }
          >
            Todos
          </Button>
          <Button
            variant={filter === "grey" ? "default" : "outline"}
            onClick={() => setFilter("grey")}
            className={filter === "grey" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-500" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500"
            }
          >
            Gris
          </Button>
          <Button
            variant={filter === "black" ? "default" : "outline"}
            onClick={() => setFilter("black")}
            className={filter === "black" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-500" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500"
            }
          >
            Negro
          </Button>
          <Button
            variant={filter === "brown" ? "default" : "outline"}
            onClick={() => setFilter("brown")}
            className={filter === "brown" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-500" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500"
            }
          >
            Café
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-xl text-foreground/70">
              No se encontraron productos con ese filtro
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
