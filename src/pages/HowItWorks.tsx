import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Cómo Funciona el Collar Inteligente ALUDO | Video Demostración"
        description="Mira cómo funciona el Collar Inteligente ALUDO: IA integrada, escaneo desde cualquier celular, sin apps ni baterías."
        path="/como-funciona"
      />

      <header className="container mx-auto px-5 sm:px-6 pt-6 md:pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/product/1")}
          className="hover:bg-primary/10 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la tienda
        </Button>
      </header>

      <main className="flex-1 container mx-auto px-5 sm:px-6 py-6 md:py-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-primary text-center mb-6 md:mb-8">
          Cómo Funciona ALUDO
        </h1>

        <div className="w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/1KCReSMesO4?autoplay=1&rel=0&playsinline=1"
            title="Cómo funciona el Collar Inteligente ALUDO"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="mt-8 w-full max-w-[420px]">
          <Button
            onClick={() => navigate("/product/1")}
            className="cta-futuristic w-full h-12 md:h-14 text-base md:text-lg font-bold tracking-wide uppercase"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a la tienda
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;