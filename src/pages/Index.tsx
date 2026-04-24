import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead, { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trackWhatsAppInitiateCheckout } from "@/lib/metaPixel";
import { Smartphone, Leaf, HeartHandshake, Heart, ChevronRight, Nfc, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-dog.png";
import dogsGroup from "@/assets/dogs-group.png";
import collarsImage from "@/assets/collars-product.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEOHead
        title="Collar Inteligente para Perros con IA | ALUDO Colombia"
        description="Collares inteligentes con IA para perros. Identificación digital instantánea, cuero vegano premium y fabricación colombiana. Sin batería, sin app. Envío a todo Colombia."
        path="/"
        jsonLd={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/8 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "5s" }}
          />
        </div>

        <div className="container mx-auto px-5 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-primary/20 animate-glow-pulse">
                <Sparkles className="w-4 h-4 md:w-4 md:h-4 text-primary" />
                <span className="text-sm md:text-sm text-primary/80">Tecnología de IA - Hecho en Colombia</span>
              </div>

              <h1 className="text-[2.75rem] sm:text-5xl md:text-7xl font-bold leading-[1.1]">
                El Futuro del Cuidado para tu Mascota
              </h1>

              <p className="text-[1.15rem] md:text-xl text-foreground/70 leading-relaxed">
                Collares inteligentes con Inteligencia Artificial que permiten identificar y proteger a tu mascota al
                instante. Ecológicos, elegantes y sin batería.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg md:text-lg px-8 md:px-8 py-6 md:py-6 hover:scale-105 transition-all duration-500 tech-glow group"
                  >
                    Ver Productos
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
                <a
                  href="https://www.instagram.com/reel/DXePXbMEWv4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 text-lg md:text-lg px-8 md:px-8 py-6 md:py-6 transition-all duration-500"
                  >
                    Cómo Funciona
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
                <div className="text-center space-y-1">
                  <p className="text-3xl md:text-3xl font-bold text-primary">IA</p>
                  <p className="text-sm md:text-sm text-foreground/60">Sin batería</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-3xl md:text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm md:text-sm text-foreground/60">Ecológico</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-3xl md:text-3xl font-bold text-primary">$2K</p>
                  <p className="text-sm md:text-sm text-foreground/60">Donación COP</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl animate-glow-pulse" />
                <img
                  src={heroImage}
                  alt="Collar inteligente ALUDO con IA para perros - Identificación digital instantánea Colombia"
                  className="relative rounded-3xl shadow-2xl w-full md:animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-5 sm:px-6">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl font-bold mb-5 md:mb-6 leading-tight">
              <span className="text-primary">Inteligencia Artificial</span> para el Bienestar Animal
            </h2>
            <p className="text-[1.1rem] md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Cada collar ALUDO integra tecnología de IA que almacena el perfil inteligente de tu mascota. Comunicación
              interactiva sin necesidad de baterías ni aplicaciones.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Nfc,
                title: "Chip NFC Integrado",
                description: "Lectura instantánea con cualquier celular. Toda la información en un toque.",
                delay: "0s",
              },
              {
                icon: HeartHandshake,
                title: "Bienestar Animal",
                description:
                  "Cualquier persona puede escanear el collar y ver el nombre, datos de la mascota e información de contacto del dueño en caso de pérdida.",
                delay: "0.1s",
              },
              {
                icon: Leaf,
                title: "Materiales Ecológicos",
                description: "Cuero vegano premium y herrajes reciclables. Sin batería, 100% sostenible.",
                delay: "0.2s",
              },
              {
                icon: Heart,
                title: "Compromiso Social",
                description: "$2.000 COP por collar donados a fundaciones que rescatan perros vulnerables.",
                delay: "0.3s",
              },
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={feature.delay}>
                <div className="glass-effect p-8 md:p-8 rounded-2xl border border-primary/10 hover-lift group h-full">
                  <feature.icon className="w-14 h-14 md:w-12 md:h-12 text-primary mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-[1.3rem] md:text-xl font-bold mb-3 text-primary group-hover:text-primary/80 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-[1.05rem] md:text-base text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-5 sm:px-6">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl font-bold mb-5 md:mb-6 text-primary leading-tight">
              Nuestra Colección
            </h2>
            <p className="text-[1.1rem] md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Diseños únicos fabricados en Colombia con materiales ecológicos e Inteligencia Artificial integrada
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
            <ScrollReveal>
              <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl glass-effect border border-primary/10 hover-lift">
                <img
                  src={collarsImage}
                  alt="Colección de collares inteligentes ALUDO premium para perros Colombia"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                  <h3 className="text-[1.6rem] md:text-3xl font-bold mb-2 md:mb-3 text-primary">Colección Premium</h3>
                  <p className="text-[1.05rem] md:text-base text-primary/70 mb-4">
                    Cuero vegano premium con IA integrada y herrajes reciclables
                  </p>
                  <Link to="/shop">
                    <Button className="bg-primary hover:bg-primary/90 text-white group transition-all duration-500 text-base px-6 py-5">
                      Ver Más
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="0.1s">
              <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl glass-effect border border-primary/10 hover-lift">
                <img
                  src={dogsGroup}
                  alt="Perros felices usando collares inteligentes ALUDO con IA - Talla única ajustable"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                  <h3 className="text-[1.6rem] md:text-3xl font-bold mb-2 md:mb-3 text-primary">
                    Talla Única Ajustable
                  </h3>
                  <p className="text-[1.05rem] md:text-base text-primary/70 mb-4">
                    De 28cm a 57cm. Se adapta desde perros pequeños hasta grandes
                  </p>
                  <Link to="/shop">
                    <Button className="bg-primary hover:bg-primary/90 text-white group transition-all duration-500 text-base px-6 py-5">
                      Explorar
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 text-lg md:text-lg px-8 md:px-12 py-6 md:py-6 hover:scale-105 transition-all duration-500"
              >
                Ver Toda la Colección
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
        </div>

        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 glass-effect p-8 sm:p-10 md:p-12 rounded-2xl md:rounded-3xl border border-primary/20">
              <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
                Protege a tu Mascota Hoy
              </h2>
              <p className="text-[1.1rem] md:text-xl text-foreground/70 leading-relaxed">
                Únete a los cientos de familias que ya confían en ALUDO para mantener a sus mascotas seguras e
                identificadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg md:text-lg px-8 md:px-12 py-6 md:py-6 hover:scale-105 transition-all duration-500 tech-glow"
                  >
                    Comprar Ahora
                  </Button>
                </Link>
                <a
                  href="https://wa.me/573128642686"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppInitiateCheckout}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 text-lg md:text-lg px-8 md:px-12 py-6 md:py-6 transition-all duration-500"
                  >
                    Conocer Más
                  </Button>
                </a>
                <Link to="/qr" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 text-lg md:text-lg px-8 md:px-12 py-6 md:py-6 transition-all duration-500"
                  >
                    QR Estructurado
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
