import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Sparkles, Shield, Heart } from "lucide-react";
import collarsImage from "@/assets/collars-product.jpeg";

// Sample product data (same as in Shop)
const products = [
  {
    id: 1,
    name: "Collar ALUDO Classic Grey",
    price: 89.99,
    image: collarsImage,
    color: "Grey",
    description: "Collar inteligente con IA integrada para el monitoreo completo de la salud de tu mascota. Fabricado con materiales 100% ecosostenibles y tecnología de última generación.",
    features: [
      "Monitoreo de salud 24/7 con sensores biométricos",
      "IA predictiva para detectar problemas de salud",
      "GPS integrado con geofencing inteligente",
      "Batería de larga duración (30 días)",
      "Materiales ecológicos certificados",
      "Resistente al agua IP67",
    ],
  },
  {
    id: 2,
    name: "Collar ALUDO Premium Rose",
    price: 99.99,
    image: collarsImage,
    color: "Rose",
    description: "Edición premium con acabado rosado y funciones avanzadas de IA. Diseñado para mascotas que merecen lo mejor.",
    features: [
      "Todo lo del Classic Grey +",
      "Análisis de comportamiento avanzado",
      "Notificaciones inteligentes personalizadas",
      "Acabado premium en cuero vegano",
      "App exclusiva con funciones Pro",
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id)) || products[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <Button 
          variant="outline" 
          onClick={() => navigate("/shop")}
          className="mb-8 border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
        >
          ← Volver a la tienda
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 glass-effect">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover animate-scale-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[hsl(195,100%,50%)]">
                €{product.price}
              </p>
            </div>

            <p className="text-lg text-foreground/80">
              {product.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[hsl(195,100%,50%)]">
                Características:
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start space-x-3 text-foreground/70 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Sparkles className="w-5 h-5 text-[hsl(195,100%,50%)] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)] text-lg py-6 hover:scale-105 transition-all duration-300 tech-glow"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Añadir al Carrito
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[hsl(280,100%,70%)] text-[hsl(280,100%,70%)] hover:bg-[hsl(280,100%,70%)]/10 py-6"
              >
                <Heart className="w-5 h-5 mr-2" />
                Favorito
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover-lift">
                <Shield className="w-8 h-8 text-[hsl(195,100%,50%)]" />
                <div>
                  <p className="font-semibold text-sm">Garantía 2 años</p>
                  <p className="text-xs text-foreground/60">Calidad asegurada</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover-lift">
                <Sparkles className="w-8 h-8 text-[hsl(280,100%,70%)]" />
                <div>
                  <p className="font-semibold text-sm">Envío gratis</p>
                  <p className="text-xs text-foreground/60">En 24-48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
