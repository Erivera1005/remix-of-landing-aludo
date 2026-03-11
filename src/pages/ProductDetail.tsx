import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { createProductSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Nfc, Leaf, Heart, Droplet, Shield, Ruler, Package, Plus, Minus } from "lucide-react";
import collarDarkGrey from "@/assets/collar-dark-grey.jpeg";
import collarDarkGrey2 from "@/assets/collar-darkgrey-2.jpeg";
import collarDarkGrey3 from "@/assets/collar-darkgrey-3.jpeg";
import collarDarkGreyLifestyle from "@/assets/collar-darkgrey-lifestyle.png";
import collarRosewood from "@/assets/collar-rosewood.jpeg";
import collarRosewood2 from "@/assets/collar-rosewood-2.jpeg";
import collarRosewood3 from "@/assets/collar-rosewood-3.jpeg";
import collarRosewoodLifestyle from "@/assets/collar-rosewood-lifestyle.png";

const products = [
  {
    id: 1,
    name: "Collar Inteligente ALUDO",
    price: 89900,
    originalPrice: 119900,
    discount: 25,
    image: collarDarkGrey,
    images: [collarDarkGrey, collarDarkGrey2, collarDarkGrey3, collarDarkGreyLifestyle],
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
    price: 89900,
    originalPrice: 119900,
    discount: 25,
    image: collarRosewood,
    images: [collarRosewood, collarRosewood2, collarRosewood3, collarRosewoodLifestyle],
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
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const currentProduct = products.find(p => p.id === Number(id)) || products[0];
  
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
      <SEOHead
        title={`Collar Inteligente ALUDO ${currentProduct.colorName} | Collar con IA para Perros Colombia`}
        description={`Compra el Collar Inteligente ALUDO ${currentProduct.colorName}. IA integrada, cuero vegano premium, talla ajustable 30-60cm. $${currentProduct.price.toLocaleString('es-CO')} COP. Envío a toda Colombia.`}
        path={`/product/${currentProduct.id}`}
        type="product"
        jsonLd={[
          createProductSchema({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            description: currentProduct.description,
            image: currentProduct.image,
            color: currentProduct.colorName,
          }),
          createBreadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Tienda", url: "/shop" },
            { name: `Collar ALUDO ${currentProduct.colorName}`, url: `/product/${currentProduct.id}` },
          ]),
        ]}
      />
      <Header />
      
      <main className="container mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/shop")}
          className="mb-6 md:mb-8 hover:bg-primary/10 transition-all duration-300"
        >
          ← Volver a la tienda
        </Button>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Product Image */}
          <div className="space-y-3 md:space-y-4 animate-fade-in">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-card/50">
              <img
                src={currentProduct.images[selectedImage]}
                alt={`Collar inteligente ALUDO ${currentProduct.colorName} para perros - Vista ${selectedImage + 1}`}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            {currentProduct.images.length > 1 && (
              <div className="flex gap-2 md:gap-3">
                {currentProduct.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-primary scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-primary">
                {currentProduct.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                {currentProduct.discount && (
                  <span className="inline-flex items-center rounded-full bg-destructive px-2.5 py-1 text-xs md:text-sm font-bold text-destructive-foreground">
                    {currentProduct.discount}% OFF
                  </span>
                )}
                {currentProduct.originalPrice && (
                  <span className="text-base md:text-lg text-muted-foreground line-through">
                    ${currentProduct.originalPrice.toLocaleString('es-CO')} COP
                  </span>
                )}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">
                ${currentProduct.price.toLocaleString('es-CO')} COP
              </p>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Color Info */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2 text-primary">Color</h3>
              <p className="text-foreground/70 text-base md:text-lg">{currentProduct.colorName}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">Cantidad</h3>
              <div className="flex items-center gap-3 md:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 md:h-12 md:w-12 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Minus className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <span className="text-xl md:text-2xl font-bold w-10 md:w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 md:h-12 md:w-12 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 md:gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-12 md:h-14 text-base md:text-lg transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Añadir al carrito
              </Button>
              <Button 
                variant="outline" 
                className="h-12 md:h-14 px-4 md:px-6 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Key Features Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
              <div className="p-3 md:p-4 rounded-xl bg-card/50 border border-border/50">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary mb-1.5 md:mb-2" />
                <p className="text-xs md:text-sm font-medium text-primary">Materiales Ecológicos</p>
                <p className="text-[10px] md:text-xs text-foreground/60 mt-0.5 md:mt-1">Cuero vegano premium</p>
              </div>
              <div className="p-3 md:p-4 rounded-xl bg-card/50 border border-border/50">
                <Droplet className="w-5 h-5 md:w-6 md:h-6 text-primary mb-1.5 md:mb-2" />
                <p className="text-xs md:text-sm font-medium text-primary">Resistente al Agua</p>
                <p className="text-[10px] md:text-xs text-foreground/60 mt-0.5 md:mt-1">Lluvia y salpicaduras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 md:space-y-12">
          {/* Technology Section */}
          <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                <Nfc className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-1.5 md:mb-2 text-primary">
                  {currentProduct.techSpecs.title}
                </h2>
                <p className="text-sm md:text-lg text-foreground/70">
                  {currentProduct.techSpecs.description}
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3 mt-4 md:mt-6">
              {currentProduct.techSpecs.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2.5 md:gap-3 text-sm md:text-base text-foreground/80">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Materials Section */}
          <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                <Leaf className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-primary">
                {currentProduct.materials.title}
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
              {currentProduct.materials.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2.5 md:gap-3 text-sm md:text-base text-foreground/80">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing and Water Resistance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Sizing */}
            <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <Ruler className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-primary">
                  {currentProduct.sizing.title}
                </h2>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-1.5 md:mb-2">
                {currentProduct.sizing.range}
              </p>
              <p className="text-sm md:text-base text-foreground/70">
                {currentProduct.sizing.description}
              </p>
            </div>

            {/* Water Resistance */}
            <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <Droplet className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-primary">
                  {currentProduct.waterResistance.title}
                </h2>
              </div>
              <p className="text-sm md:text-base text-foreground/70">
                {currentProduct.waterResistance.description}
              </p>
            </div>
          </div>

          {/* Scan Info */}
          <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-primary">
                {currentProduct.scanInfo.title}
              </h2>
            </div>
            <ul className="space-y-2.5 md:space-y-3">
              {currentProduct.scanInfo.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2.5 md:gap-3 text-sm md:text-base text-foreground/80">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Packaging and Social Commitment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <Package className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-primary">
                  Empaque Ecológico
                </h2>
              </div>
              <p className="text-sm md:text-base text-foreground/70">
                Cada collar se entrega en una bolsa ecológica reciclable, alineada a los valores de sostenibilidad de ALUDO.
              </p>
            </div>

            <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-primary">
                  Compromiso Social
                </h2>
              </div>
              <p className="text-sm md:text-base text-foreground/70">
                Por cada collar vendido, ALUDO dona <span className="font-bold text-primary">$2.000 COP</span> a fundaciones que rescatan y cuidan perros en situación vulnerable.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="bg-card/30 rounded-2xl p-5 md:p-8 border border-border/50 animate-fade-in-up">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-primary">
              Características Clave
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {currentProduct.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2.5 md:gap-3 text-sm md:text-base text-foreground/80">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0" />
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
