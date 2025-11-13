import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Nfc, Leaf, Heart, Droplet } from "lucide-react";
import collarsImage from "@/assets/collars-product.jpeg";

// Productos reales de ALUDO
const products = [
  {
    id: 1,
    name: "Collar ALUDO Classic Gris",
    price: 129900,
    image: collarsImage,
    color: "Gris",
    description: "Collar inteligente con tecnología NFC integrada. Fabricado con cuero vegano premium y herrajes metálicos reciclables. Diseñado en Colombia para el bienestar de tu mascota con materiales 100% ecológicos.",
    features: [
      "Chip NFC integrado (sin batería)",
      "Perfil digital actualizable en tiempo real",
      "Cuero vegano premium certificado",
      "Herrajes metálicos reciclables",
      "Talla única ajustable: 30cm - 60cm (S a XL)",
      "Resistente al agua (lluvia y salpicaduras)",
      "Costuras reforzadas de alta durabilidad",
      "Fabricado en Colombia",
    ],
  },
  {
    id: 2,
    name: "Collar ALUDO Classic Negro",
    price: 129900,
    image: collarsImage,
    color: "Negro",
    description: "Diseño elegante en negro con tecnología NFC. Perfecto para mascotas que necesitan identificación confiable y estilo.",
    features: [
      "Chip NFC integrado (sin batería)",
      "Perfil digital actualizable en tiempo real",
      "Cuero vegano premium certificado",
      "Herrajes metálicos reciclables",
      "Talla única ajustable: 30cm - 60cm (S a XL)",
      "Resistente al agua (lluvia y salpicaduras)",
      "Costuras reforzadas de alta durabilidad",
      "Fabricado en Colombia",
    ],
  },
  {
    id: 3,
    name: "Collar ALUDO Classic Café",
    price: 129900,
    image: collarsImage,
    color: "Café",
    description: "Tono clásico café con acabado premium. Tecnología NFC para identificación instantánea de tu mascota.",
    features: [
      "Chip NFC integrado (sin batería)",
      "Perfil digital actualizable en tiempo real",
      "Cuero vegano premium certificado",
      "Herrajes metálicos reciclables",
      "Talla única ajustable: 30cm - 60cm (S a XL)",
      "Resistente al agua (lluvia y salpicaduras)",
      "Costuras reforzadas de alta durabilidad",
      "Fabricado en Colombia",
    ],
  },
  {
    id: 4,
    name: "Collar ALUDO Classic Rosado",
    price: 129900,
    image: collarsImage,
    color: "Rosado",
    description: "Diseño moderno en rosado. Chip NFC integrado y materiales sostenibles para el cuidado de tu compañero.",
    features: [
      "Chip NFC integrado (sin batería)",
      "Perfil digital actualizable en tiempo real",
      "Cuero vegano premium certificado",
      "Herrajes metálicos reciclables",
      "Talla única ajustable: 30cm - 60cm (S a XL)",
      "Resistente al agua (lluvia y salpicaduras)",
      "Costuras reforzadas de alta durabilidad",
      "Fabricado en Colombia",
    ],
  },
  {
    id: 5,
    name: "Collar ALUDO Classic Azul",
    price: 129900,
    image: collarsImage,
    color: "Azul",
    description: "Collar con tecnología NFC en tono azul. Materiales ecológicos y diseño colombiano de calidad.",
    features: [
      "Chip NFC integrado (sin batería)",
      "Perfil digital actualizable en tiempo real",
      "Cuero vegano premium certificado",
      "Herrajes metálicos reciclables",
      "Talla única ajustable: 30cm - 60cm (S a XL)",
      "Resistente al agua (lluvia y salpicaduras)",
      "Costuras reforzadas de alta durabilidad",
      "Fabricado en Colombia",
    ],
  },
  {
    id: 6,
    name: "Collar ALUDO Classic Verde",
    price: 129900,
    image: collarsImage,
    color: "Verde",
    description: "Diseño eco en tono verde. Cuero vegano, herrajes reciclables y tecnología NFC sin batería.",
    features: [
      "Chip NFC integrado (sin batería)",
      "Perfil digital actualizable en tiempo real",
      "Cuero vegano premium certificado",
      "Herrajes metálicos reciclables",
      "Talla única ajustable: 30cm - 60cm (S a XL)",
      "Resistente al agua (lluvia y salpicaduras)",
      "Costuras reforzadas de alta durabilidad",
      "Fabricado en Colombia",
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
          className="mb-8 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500"
        >
          ← Volver a la tienda
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-primary/10 glass-effect">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary/80">
                ${product.price.toLocaleString('es-CO')} COP
              </p>
            </div>

            <p className="text-lg text-foreground/70">
              {product.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                Características:
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start space-x-3 text-foreground/70 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Nfc className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-lg py-6 hover:scale-105 transition-all duration-500 tech-glow group"
              >
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-500" />
                Añadir al Carrito
              </Button>
              <Button 
                variant="outline"
                onClick={handleAddToCart}
                className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 py-6 transition-all duration-500"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              <div className="glass-effect p-6 rounded-xl border border-primary/10 hover-lift">
                <Leaf className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2 text-primary">100% Ecológico</h4>
                <p className="text-sm text-foreground/70">
                  Cuero vegano y herrajes reciclables
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl border border-primary/10 hover-lift">
                <Droplet className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2 text-primary">Resistente al Agua</h4>
                <p className="text-sm text-foreground/70">
                  Protegido contra lluvia y salpicaduras
                </p>
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
