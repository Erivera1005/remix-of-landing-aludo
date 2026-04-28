import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const QR = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play().catch(() => {
      // Browser blocked autoplay with sound, fallback to muted
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });
  }, []);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video.play().catch(() => {});
  };

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

          <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-lg bg-black">
            <video
              ref={videoRef}
              src="/videos/tuto_aludo.mov"
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-auto"
            >
              Tu navegador no soporta el video.
            </video>

            {isMuted && (
              <button
                onClick={handleUnmute}
                className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-primary/90 transition-all"
                aria-label="Activar sonido"
              >
                <VolumeX className="w-4 h-4" />
                <span className="text-sm font-medium">Activar sonido</span>
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QR;
