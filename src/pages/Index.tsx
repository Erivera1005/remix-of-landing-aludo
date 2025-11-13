import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Zap, Heart, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-dog.png";
import dogsGroup from "@/assets/dogs-group.png";
import collarsImage from "@/assets/collars-product.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }} />
        </div>

        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-primary/20 animate-glow-pulse">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary/80">
                  Tecnología IA de Última Generación
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                El Futuro del
                <span className="block gradient-text mt-2">
                  Cuidado Canino
                </span>
              </h1>

              <p className="text-xl text-foreground/70 leading-relaxed">
                Collares inteligentes con IA que monitorizan la salud de tu mascota 24/7. 
                Sostenibles, elegantes y conectados al futuro.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 hover:scale-105 transition-all duration-500 tech-glow group"
                  >
                    Explorar Colección
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 text-lg px-8 py-6 transition-all duration-500"
                >
                  Ver Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center space-y-1">
                  <p className="text-3xl font-bold gradient-text">24/7</p>
                  <p className="text-sm text-foreground/60">Monitoreo</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-3xl font-bold gradient-text">100%</p>
                  <p className="text-sm text-foreground/60">Eco-friendly</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-3xl font-bold gradient-text">30d</p>
                  <p className="text-sm text-foreground/60">Batería</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl animate-glow-pulse" />
                <img
                  src={heroImage}
                  alt="ALUDO Smart Collar"
                  className="relative rounded-3xl shadow-2xl w-full animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Tecnología Avanzada</span> para tu Mascota
            </h2>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Cada collar ALUDO integra sensores de última generación y algoritmos de IA para garantizar el bienestar total de tu compañero
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "IA Predictiva",
                description: "Detecta problemas de salud antes de que aparezcan síntomas",
                delay: '0s',
              },
              {
                icon: Shield,
                title: "GPS Inteligente",
                description: "Geofencing y tracking en tiempo real con alertas instantáneas",
                delay: '0.1s',
              },
              {
                icon: Zap,
                title: "Batería Duradera",
                description: "Hasta 30 días de autonomía con carga rápida",
                delay: '0.2s',
              },
              {
                icon: Heart,
                title: "Ecosostenible",
                description: "Materiales reciclados y proceso de fabricación carbono neutral",
                delay: '0.3s',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-2xl border border-primary/10 hover-lift group animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-primary/80 transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-foreground/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Nuestra Colección
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Diseños únicos que combinan elegancia, tecnología y sostenibilidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative group overflow-hidden rounded-3xl glass-effect border border-primary/10 hover-lift animate-fade-in-up">
              <img
                src={collarsImage}
                alt="ALUDO Collars Collection"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold mb-3 text-primary">
                  Colección Premium
                </h3>
                <p className="text-primary/70 mb-4">
                  Descubre nuestros diseños más exclusivos con acabados de lujo
                </p>
                <Link to="/shop">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white group transition-all duration-500"
                  >
                    Ver Más
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl glass-effect border border-primary/10 hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <img
                src={dogsGroup}
                alt="Happy Dogs with ALUDO"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold mb-3 text-primary">
                  Para Todas las Razas
                </h3>
                <p className="text-primary/70 mb-4">
                  Tallas y diseños adaptados para cada tipo de mascota
                </p>
                <Link to="/shop">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white group transition-all duration-500"
                  >
                    Explorar
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button 
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 text-lg px-12 py-6 hover:scale-105 transition-all duration-500"
              >
                Ver Toda la Colección
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 glass-effect p-12 rounded-3xl border border-primary/20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Únete a la Revolución
            </h2>
            <p className="text-xl text-foreground/70">
              Miles de mascotas ya disfrutan de la tecnología ALUDO. 
              Descubre cómo podemos mejorar la vida de tu compañero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-6 hover:scale-105 transition-all duration-500 tech-glow"
                >
                  Comprar Ahora
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 text-lg px-12 py-6 transition-all duration-500"
              >
                Solicitar Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
