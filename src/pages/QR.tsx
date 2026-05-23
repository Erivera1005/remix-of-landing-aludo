import { useEffect, useRef, useState } from "react";
import { VolumeX, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const VIDEO_ID = "5o64YYoDB68";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const QR = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [showUnmute, setShowUnmute] = useState(false);

  useEffect(() => {
    const createPlayer = () => {
      if (!containerRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: VIDEO_ID,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.unMute();
              e.target.setVolume(100);
              e.target.playVideo();
            } catch {}
          },
          onStateChange: (e: any) => {
            try {
              const state = e.data;
              // If still not playing shortly after ready, browser blocked it
              if (state === window.YT.PlayerState.PLAYING) {
                if (e.target.isMuted && e.target.isMuted()) {
                  setShowUnmute(true);
                } else {
                  setShowUnmute(false);
                }
              } else if (state === window.YT.PlayerState.UNSTARTED || state === -1) {
                // Try muted fallback so at least it plays
                setTimeout(() => {
                  try {
                    if (playerRef.current?.getPlayerState?.() !== window.YT.PlayerState.PLAYING) {
                      playerRef.current?.mute?.();
                      playerRef.current?.playVideo?.();
                      setShowUnmute(true);
                    }
                  } catch {}
                }, 1200);
              }
            } catch {}
          },
        },
      });
    };


    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => {
      try {
        playerRef.current?.destroy?.();
      } catch {}
    };
  }, []);

  const handleUnmute = () => {
    try {
      playerRef.current?.unMute?.();
      playerRef.current?.setVolume?.(100);
      playerRef.current?.playVideo?.();
      setShowUnmute(false);
    } catch {}
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

          <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-lg bg-black mx-auto w-full max-w-[400px] aspect-[9/16]">
            <div ref={containerRef} className="w-full h-full" />

            {showUnmute && (
              <button
                onClick={handleUnmute}
                className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-primary/90 transition-all z-10"
                aria-label="Activar sonido"
              >
                <VolumeX className="w-4 h-4" />
                <span className="text-sm font-medium">Activar sonido</span>
              </button>
            )}
          </div>

          {/* Instructivo de timestamps */}
          <div className="mt-12 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">
              Guía rápida del video
            </h2>
            <div className="space-y-3 max-w-xl mx-auto">
              {[
                { time: "00:00", label: "Introducción" },
                { time: "00:07", label: "¿Qué tecnología usa el collar ALUDO?" },
                { time: "00:23", label: "Compatibilidad NFC en iPhone" },
                { time: "00:30", label: "Compatibilidad NFC en Android" },
                { time: "00:54", label: "Cómo escanear el collar en iPhone" },
                { time: "01:23", label: "Diferentes formas de escanear el collar" },
                { time: "01:49", label: "Cómo escanear el collar en Android" },
                { time: "01:57", label: "¿No puedes escanearlo? Métodos de ayuda y soporte" },
                { time: "02:07", label: "Primera configuración del collar ALUDO" },
                { time: "02:20", label: "Cómo funciona la interfaz y la IA" },
                { time: "02:39", label: "Demo completa del collar en caso de pérdida" },
                { time: "03:08", label: "Final del video" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    try {
                      const parts = item.time.split(":").map(Number);
                      const seconds = parts[0] * 60 + parts[1];
                      playerRef.current?.seekTo?.(seconds, true);
                      playerRef.current?.playVideo?.();
                    } catch {}
                  }}
                  className="w-full flex items-center gap-4 rounded-xl border border-primary/10 bg-white/50 px-4 py-3 text-left transition hover:bg-primary/5 hover:border-primary/30"
                >
                  <span className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                  <span className="text-sm sm:text-base text-foreground/90 font-medium leading-snug">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Botón de WhatsApp */}
          <div className="mt-12 text-center">
            <p className="text-foreground/70 text-sm sm:text-base mb-4 max-w-md mx-auto">
              ¿No pudiste escanear el collar? Escríbenos y te ayudamos.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=573128642686&text=Hola%20no%20pudimos%20usar%20el%20collar&type=phone_number&app_absent=0&utm_source=chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-3.5 text-white font-semibold shadow-lg hover:bg-[#1ebe5a] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QR;
