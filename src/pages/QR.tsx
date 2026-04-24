import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { trackWhatsAppInitiateCheckout } from "@/lib/metaPixel";

const QR = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="QR Estructurado | ALUDO"
        description="Aprende cómo funciona el QR estructurado de ALUDO y contáctanos por WhatsApp."
        path="/qr"
      />
      <Header />

      <main className="container mx-auto px-5 sm:px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
            QR Estructurado
          </h1>

          <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-lg bg-black">
            <video
              src="/videos/tuto_aludo.mov"
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            >
              Tu navegador no soporta el video.
            </video>
          </div>

          <div className="flex justify-center">
            <a
              href="https://wa.me/573128642686"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppInitiateCheckout}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg px-8 md:px-12 py-6 hover:scale-105 transition-all duration-500 tech-glow"
              >
                Contactar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QR;
