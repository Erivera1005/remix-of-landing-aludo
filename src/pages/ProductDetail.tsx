import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { createProductSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Nfc, Leaf, Heart, Droplet, Shield, Ruler, Package, Plus, Minus } from "lucide-react";
import collarDarkGrey from "@/assets/collar-dark-grey.jpeg";
import collarDarkGreyNew1 from "@/assets/collar-darkgrey-opt-1.jpg";
import collarDarkGreyNew2 from "@/assets/collar-darkgrey-opt-2.jpg";
import collarDarkGreyNew3 from "@/assets/collar-darkgrey-opt-3.jpg";
import collarDarkGreyNew4 from "@/assets/collar-darkgrey-opt-4.jpg";
import collarDarkGreyVideo from "@/assets/collar-darkgrey-video.mp4";
import collarRosewood from "@/assets/collar-rosewood.jpeg";
import collarRosewoodNew1 from "@/assets/collar-rosewood-opt-1.jpg";
import collarRosewoodNew2 from "@/assets/collar-rosewood-opt-2.jpg";
import collarRosewoodNew3 from "@/assets/collar-rosewood-opt-3.jpg";
import collarRosewoodNew4 from "@/assets/collar-rosewood-opt-4.jpg";
import collarRosewoodVideo from "@/assets/collar-rosewood-video.mp4";
import guiaTallas from "@/assets/guia-tallas.png";

type MediaItem = { type: "video" | "image"; src: string; poster?: string };

const products = [
  {
    id: 1,
    name: "Collar Inteligente ALUDO",
    price: 149900,
    originalPrice: 199900,
    discount: 25,
    image: collarDarkGrey,
    images: [collarDarkGrey, collarDarkGreyNew1, collarDarkGreyNew2, collarDarkGreyNew3, collarDarkGreyNew4, guiaTallas],
    media: [
      { type: "video", src: collarDarkGreyVideo, poster: collarDarkGrey },
      { type: "image", src: collarDarkGreyNew1 },
      { type: "image", src: collarDarkGreyNew2 },
      { type: "image", src: collarDarkGreyNew3 },
      { type: "image", src: collarDarkGreyNew4 },
      { type: "image", src: guiaTallas },
    ] as MediaItem[],
    color: "Dark Grey",
    colorName: "Dark Grey",
    description: "El Collar Inteligente ALUDO combina Inteligencia Artificial de última generación con materiales sostenibles de primera calidad. Diseñado y fabricado en Colombia para ofrecer comunicación interactiva, protección y estilo a tu mascota.",
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
      range: "28 cm - 57 cm",
      description: "Equivalente desde S hasta XL. Sirve para perros pequeños, medianos y grandes."
    },
    waterResistance: {
      title: "Resistencia al Agua",
      description: "Resistente a lluvia, salpicaduras y humedad. No sumergible (no debe usarse para nadar en piscina, río o playa)."
    },
    scanInfo: {
      title: "¿Qué puede ver cualquier persona al escanear?",
      items: [
        "Nombre de la mascota",
        "Datos públicos de la mascota (raza, edad, características)",
        "Información de contacto del dueño en caso de pérdida",
        "Detalles médicos importantes (alergias, vacunación, observaciones)",
        "Escaneo instantáneo desde cualquier celular, sin apps ni registro"
      ]
    }
  },
  {
    id: 2,
    name: "Collar Inteligente ALUDO",
    price: 149900,
    originalPrice: 199900,
    discount: 25,
    image: collarRosewood,
    images: [collarRosewood, collarRosewoodNew1, collarRosewoodNew2, collarRosewoodNew3, collarRosewoodNew4, guiaTallas],
    media: [
      { type: "video", src: collarRosewoodVideo, poster: collarRosewood },
      { type: "image", src: collarRosewoodNew1 },
      { type: "image", src: collarRosewoodNew2 },
      { type: "image", src: collarRosewoodNew3 },
      { type: "image", src: collarRosewoodNew4 },
      { type: "image", src: guiaTallas },
    ] as MediaItem[],
    color: "Rosewood",
    colorName: "Rosewood",
    description: "El Collar Inteligente ALUDO combina Inteligencia Artificial de última generación con materiales sostenibles de primera calidad. Diseñado y fabricado en Colombia para ofrecer comunicación interactiva, protección y estilo a tu mascota.",
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
      range: "28 cm - 57 cm",
      description: "Equivalente desde S hasta XL. Sirve para perros pequeños, medianos y grandes."
    },
    waterResistance: {
      title: "Resistencia al Agua",
      description: "Resistente a lluvia, salpicaduras y humedad. No sumergible (no debe usarse para nadar en piscina, río o playa)."
    },
    scanInfo: {
      title: "¿Qué puede ver cualquier persona al escanear?",
      items: [
        "Nombre de la mascota",
        "Datos públicos de la mascota (raza, edad, características)",
        "Información de contacto del dueño en caso de pérdida",
        "Detalles médicos importantes (alergias, vacunación, observaciones)",
        "Escaneo instantáneo desde cualquier celular, sin apps ni registro"
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
  const media: MediaItem[] = (currentProduct as { media?: MediaItem[] }).media
    ?? currentProduct.images.map((src) => ({ type: "image" as const, src }));

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
        description={`Compra el Collar Inteligente ALUDO ${currentProduct.colorName}. IA integrada, cuero vegano premium, talla ajustable 28-57cm. $${currentProduct.price.toLocaleString('es-CO')} COP. Envío a toda Colombia.`}
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
          <div id="product-image" className="space-y-3 md:space-y-4 animate-fade-in scroll-mt-24">
            <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-2xl bg-white">
              {media[selectedImage].type === "video" ? (
                <video
                  key={media[selectedImage].src}
                  ref={(el) => {
                    if (!el) return;
                    // Try playing with sound; if blocked, fall back to muted autoplay and unmute on first interaction
                    el.muted = false;
                    el.volume = 1;
                    const tryUnmuted = el.play();
                    if (tryUnmuted && typeof tryUnmuted.catch === "function") {
                      tryUnmuted.catch(() => {
                        el.muted = true;
                        el.play().catch(() => {});
                        const unmute = () => {
                          el.muted = false;
                          el.play().catch(() => {});
                          window.removeEventListener("pointerdown", unmute);
                          window.removeEventListener("touchstart", unmute);
                          window.removeEventListener("keydown", unmute);
                        };
                        window.addEventListener("pointerdown", unmute, { once: true });
                        window.addEventListener("touchstart", unmute, { once: true });
                        window.addEventListener("keydown", unmute, { once: true });
                      });
                    }
                  }}
                  src={media[selectedImage].src}
                  poster={media[selectedImage].poster}
                  autoPlay
                  loop
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate noremoteplayback"
                  preload="auto"
                  aria-label={`Video del collar inteligente ALUDO ${currentProduct.colorName}`}
                  onContextMenu={(event) => event.preventDefault()}
                  className="clean-product-video w-full h-full object-contain bg-white"
                />
              ) : (
                <img
                  src={media[selectedImage].src}
                  alt={`Collar inteligente ALUDO ${currentProduct.colorName} para perros - Vista ${selectedImage + 1}`}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-contain object-center scale-110"
                />
              )}
            </div>
            {media.length > 1 && (
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
                {media.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-primary scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover bg-white pointer-events-none"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-contain bg-white p-1"
                      />
                    )}
                    {item.type === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 drop-shadow"><path d="M8 5v14l11-7z"/></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div>
              <h1 className="text-[1.75rem] sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-primary leading-tight">
                {currentProduct.name}
              </h1>
              <div className="flex flex-nowrap items-center gap-2 sm:gap-3 mb-3 whitespace-nowrap">
                <span className="text-xl sm:text-2xl md:text-2xl font-bold text-primary tracking-tight">
                  ${currentProduct.price.toLocaleString('es-CO')}
                </span>
                {currentProduct.originalPrice && (
                  <span className="relative text-xs sm:text-sm md:text-base text-muted-foreground">
                    <span className="animate-price-strike">${currentProduct.originalPrice.toLocaleString('es-CO')}</span>
                  </span>
                )}
                {currentProduct.discount && (
                  <span className="relative inline-flex items-center rounded-full bg-destructive px-3 py-1 text-sm sm:text-base font-bold text-destructive-foreground animate-promo-pulse badge-shine">
                    {currentProduct.discount}% OFF
                  </span>
                )}
              </div>
              {currentProduct.originalPrice && (
                <div className="mb-4 md:mb-6 animate-savings-float">
                  <span className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-extrabold tracking-wide text-white badge-shine overflow-hidden"
                    style={{ background: "linear-gradient(110deg, #0a0f3d 0%, #1e3a8a 50%, #00d4ff 100%)", boxShadow: "0 6px 18px -4px hsl(220 90% 30% / 0.45)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
                    AHORRA ${(currentProduct.originalPrice - currentProduct.price).toLocaleString('es-CO')}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-4 md:mb-6 text-sm sm:text-base font-semibold text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                Envío GRATIS a todo Colombia
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 md:gap-4 mb-5 md:mb-6">
                <Button 
                  onClick={handleAddToCart}
                  className="cta-futuristic animate-cta-glow flex-1 h-12 md:h-14 text-base md:text-lg font-bold tracking-wide uppercase transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar ahora
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 md:h-14 px-4 md:px-6 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-foreground/70 text-[1.05rem] md:text-lg leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                Color: <span className="font-normal text-foreground/70">{currentProduct.colorName}</span>
              </h3>
              <div className="flex gap-3">
                {products.map((p) => {
                  const isActive = p.id === currentProduct.id;
                  const swatch = p.color === "Rosewood" ? "#b87862" : "#3a3a3a";
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (!isActive) {
                          setSelectedImage(0);
                          navigate(`/product/${p.id}`);
                        }
                      }}
                      aria-label={`Seleccionar color ${p.colorName}`}
                      title={p.colorName}
                      className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                        isActive ? "border-primary ring-2 ring-primary/30 ring-offset-2" : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: swatch }}
                    />
                  );
                })}
              </div>
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

            {/* Size Selector */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">Talla</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  className="px-5 py-2.5 rounded-lg border-2 border-primary bg-primary text-primary-foreground font-medium text-sm md:text-base transition-all duration-300 hover:scale-105"
                >
                  Estándar (ideal para la mayoría)
                </button>
                <button
                  disabled
                  aria-disabled="true"
                  title="Talla XS agotada"
                  className="px-5 py-2.5 rounded-lg border-2 border-border bg-muted text-muted-foreground font-medium text-sm md:text-base opacity-60 cursor-not-allowed line-through"
                >
                  XS — Agotada
                </button>
              </div>
              <button
                onClick={() => {
                  setSelectedImage(currentProduct.images.length - 1);
                  document.getElementById("product-image")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border-2 border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md active:scale-[0.97]"
              >
                <Ruler className="w-4 h-4" />
                Revisar tabla de tallas
              </button>
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
                Por cada collar vendido, ALUDO dona <span className="font-bold text-primary">un porcentaje</span> a fundaciones que rescatan y cuidan perros en situación vulnerable.
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
