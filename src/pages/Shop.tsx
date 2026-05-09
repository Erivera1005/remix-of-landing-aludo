import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead, { createBreadcrumbSchema, createProductSchema } from "@/components/SEOHead";
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
    price: 139900,
    originalPrice: 199900,
    discount: 30,
    image: collarDarkGrey,
    hoverImage: collarDarkGreyLifestyle,
    color: "Dark Grey",
    description: "Collar inteligente con IA integrada. Cuero vegano premium, herrajes reciclables. Talla ajustable 28-57cm. Fabricado en Colombia.",
  },
  {
    id: 2,
    name: "Collar Inteligente ALUDO - Rosewood",
    price: 139900,
    originalPrice: 199900,
    discount: 30,
    image: collarRosewood,
    hoverImage: collarRosewoodLifestyle,
    color: "Rosewood",
    description: "Collar inteligente con IA integrada. Cuero vegano premium, herrajes reciclables. Talla ajustable 28-57cm. Fabricado en Colombia.",
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
      <SEOHead
        title="Comprar Collar Inteligente para Perros con IA | Tienda ALUDO Colombia"
        description="Compra collares inteligentes con IA para perros. Cuero vegano premium, chip NFC integrado, talla ajustable 28-57cm. Envío a toda Colombia. Desde $139.900 COP."
        path="/shop"
        type="website"
        jsonLd={[
          createBreadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Tienda", url: "/shop" },
          ]),
          ...products.map((p) =>
            createProductSchema({
              id: p.id,
              name: p.name,
              price: p.price,
              description: p.description,
              image: p.image,
              color: p.color,
            })
          ),
        ]}
      />
      <Header />
      
      <main className="container mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h1 className="text-[1.85rem] sm:text-4xl md:text-6xl font-bold mb-5 md:mb-6 text-primary leading-tight">
            Collar Inteligente ALUDO
          </h1>
          <p className="text-[1.1rem] md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Collares con Inteligencia Artificial integrada. Fabricados en Colombia con materiales ecológicos. 
            Un porcentaje de cada compra es donado a fundaciones de rescate animal.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12 animate-fade-in-up">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-base px-5 py-5" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-base px-5 py-5"
            }
          >
            Todos
          </Button>
          <Button
            variant={filter === "darkgrey" ? "default" : "outline"}
            onClick={() => setFilter("darkgrey")}
            className={filter === "darkgrey" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-base px-5 py-5" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-base px-5 py-5"
            }
          >
            Dark Grey
          </Button>
          <Button
            variant={filter === "rosewood" ? "default" : "outline"}
            onClick={() => setFilter("rosewood")}
            className={filter === "rosewood" 
              ? "bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-base px-5 py-5" 
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-base px-5 py-5"
            }
          >
            Rosewood
          </Button>
        </div>

        {/* Products Grid */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
        </ScrollReveal>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <p className="text-lg md:text-xl text-foreground/70">
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
