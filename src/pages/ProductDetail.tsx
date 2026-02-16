import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Nfc, Leaf, Heart, Droplet, Shield, Ruler, Package, Plus, Minus } from "lucide-react";
import collarDarkGrey from "@/assets/collar-dark-grey.jpeg";
import collarRosewood from "@/assets/collar-rosewood.jpeg";

// Productos oficiales de ALUDO
const products = [
  {
    id: 1,
    name: "Collar Inteligente ALUDO",
    price: 109900,
    image: collarDarkGrey,
    color: "Dark Grey",
    colorName: "Dark Grey",
    description: "El Collar Inteligente ALUDO combina Inteligencia Artificial de última generación con materiales sostenibles de primera calidad. Diseñado y fabricado en Colombia para ofrecer identificación instantánea, protección y estilo a tu mascota.",
    features: [
      "IA integrada con garantía de 9 años",
      "Perfil digital actualizable en tiempo real",
      "Sin batería, sin GPS, sin aplicaciones",
      "Cuero vegano premium certificado",
      "Herrajes metálicos 100% reciclables",
      "Costuras reforzadas para máxima durabilidad",
      "Chip protegido en módulo interno",
      "Diseño cómodo y ligero",
      "Producción local en Colombia"
    ],
    techSpecs: {
      title: "Inteligencia Artificial Integrada",
      description: "Cada collar incluye tecnología de IA que puede ser leída por cualquier celular compatible. La información se muestra inmediatamente al acercar el dispositivo.",
      highlights: [
        "No necesita batería",
        "No usa GPS",
        "No requiere aplicaciones",
        "Garantía del chip: 9 años"
      ]
    },
    materials: {
      title: "Materiales Sostenibles",
      items: [
        "Cuero vegano premium",
        "Herrajes metálicos reciclables",
        "Costuras reforzadas",
        "Chip NFC protegido"
      ]
    },
    sizing: {
      title: "Talla Única Ajustable",
      range: "30 cm - 60 cm",
      description: "Equivalente desde S hasta XL. Sirve para perros pequeños, medianos y grandes."
    },
    waterResistance: {
      title: "Resistencia al Agua",
      description: "Resistente a lluvia, salpicaduras y humedad. No sumergible (no debe usarse para nadar en piscina, río o playa)."
    },
    scanInfo: {
      title: "¿Qué puede ver el usuario al escanear?",
      items: [
        "Información pública de la mascota",
        "Datos de contacto del dueño",
        "Detalles médicos importantes (alergias, vacunación, observaciones)"
      ]
    }
  },
  {
    id: 2,
    name: "Collar Inteligente ALUDO",
    price: 109900,
    image: collarRosewood,
    color: "Rosewood",
    colorName: "Rosewood",
    description: "El Collar Inteligente ALUDO combina Inteligencia Artificial de última generación con materiales sostenibles de primera calidad. Diseñado y fabricado en Colombia para ofrecer identificación instantánea, protección y estilo a tu mascota.",
    features: [
      "IA integrada con garantía de 9 años",
      "Perfil digital actualizable en tiempo real",
      "Sin batería, sin GPS, sin aplicaciones",
      "Cuero vegano premium certificado",
      "Herrajes metálicos 100% reciclables",
      "Costuras reforzadas para máxima durabilidad",
      "Chip protegido en módulo interno",
      "Diseño cómodo y ligero",
      "Producción local en Colombia"
    ],
    techSpecs: {
      title: "Inteligencia Artificial Integrada",
      description: "Cada collar incluye tecnología de IA que puede ser leída por cualquier celular compatible. La información se muestra inmediatamente al acercar el dispositivo.",
      highlights: [
        "No necesita batería",
        "No usa GPS",
        "No requiere aplicaciones",
        "Garantía del chip: 9 años"
      ]
    },
    materials: {
      title: "Materiales Sostenibles",
      items: [
        "Cuero vegano premium",
        "Herrajes metálicos reciclables",
        "Costuras reforzadas",
        "Chip NFC protegido"
      ]
    },
    sizing: {
      title: "Talla Única Ajustable",
      range: "30 cm - 60 cm",
      description: "Equivalente desde S hasta XL. Sirve para perros pequeños, medianos y grandes."
    },
    waterResistance: {
      title: "Resistencia al Agua",
      description: "Resistente a lluvia, salpicaduras y humedad. No sumergible (no debe usarse para nadar en piscina, río o playa)."
    },
    scanInfo: {
      title: "¿Qué puede ver el usuario al escanear?",
      items: [
        "Información pública de la mascota",
        "Datos de contacto del dueño",
        "Detalles médicos importantes (alergias, vacunación, observaciones)"
      ]
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>("Dark Grey");
  const [quantity, setQuantity] = useState<number>(1);

  // Encontrar el producto actual basado en el color seleccionado
  const currentProduct = products.find(p => p.colorName === selectedColor) || products[0];
  
  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart({
        id: currentProduct.id,
        name: `${currentProduct.name} - ${currentProduct.colorName}`,
        price: currentProduct.price,
        image: currentProduct.image,
        color: currentProduct.colorName,
      }, quantity);
      setQuantity(1);
    }
  };

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-foreground/70">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/shop")}
          className="mb-8 hover:bg-primary/10 transition-all duration-300"
        >
          ← Volver a la tienda
        </Button>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-card/50 animate-fade-in">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                {currentProduct.name}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ${currentProduct.price.toLocaleString('es-CO')} COP
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Selecciona el color</h3>
              <div className="flex gap-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedColor(product.colorName)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedColor === product.colorName
                        ? "border-primary scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.colorName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/0 hover:bg-background/10 transition-colors duration-300" />
                  </button>
                ))}
              </div>
              <p className="text-sm text-foreground/60 mt-2">
                Color seleccionado: <span className="font-medium text-primary">{selectedColor}</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Cantidad</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-12 w-12 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-14 text-lg transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Añadir al carrito
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-6 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Key Features Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                <Leaf className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm font-medium text-primary">Materiales Ecológicos</p>
                <p className="text-xs text-foreground/60 mt-1">Cuero vegano premium</p>
              </div>
              <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                <Droplet className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm font-medium text-primary">Resistente al Agua</p>
                <p className="text-xs text-foreground/60 mt-1">Lluvia y salpicaduras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Technology Section */}
          <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Nfc className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 text-primary">
                  {currentProduct.techSpecs.title}
                </h2>
                <p className="text-foreground/70 text-lg">
                  {currentProduct.techSpecs.description}
                </p>
              </div>
            </div>
            <ul className="grid md:grid-cols-2 gap-3 mt-6">
              {currentProduct.techSpecs.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Materials Section */}
          <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">
                {currentProduct.materials.title}
              </h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {currentProduct.materials.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing and Water Resistance */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sizing */}
            <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Ruler className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {currentProduct.sizing.title}
                </h2>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">
                {currentProduct.sizing.range}
              </p>
              <p className="text-foreground/70">
                {currentProduct.sizing.description}
              </p>
            </div>

            {/* Water Resistance */}
            <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Droplet className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {currentProduct.waterResistance.title}
                </h2>
              </div>
              <p className="text-foreground/70">
                {currentProduct.waterResistance.description}
              </p>
            </div>
          </div>

          {/* Scan Info */}
          <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">
                {currentProduct.scanInfo.title}
              </h2>
            </div>
            <ul className="space-y-3">
              {currentProduct.scanInfo.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Packaging and Social Commitment */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eco Packaging */}
            <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  Empaque Ecológico
                </h2>
              </div>
              <p className="text-foreground/70">
                Cada collar se entrega en una bolsa ecológica reciclable, alineada a los valores de sostenibilidad de ALUDO.
              </p>
            </div>

            {/* Social Commitment */}
            <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  Compromiso Social
                </h2>
              </div>
              <p className="text-foreground/70">
                Por cada collar vendido, ALUDO dona <span className="font-bold text-primary">$2.000 COP</span> a fundaciones que rescatan y cuidan perros en situación vulnerable.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="bg-card/30 rounded-2xl p-8 border border-border/50 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Características Clave
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {currentProduct.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
