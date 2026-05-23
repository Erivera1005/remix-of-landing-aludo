import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";
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
  const [showUnmute, setShowUnmute] = useState(true);

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
          // iOS/Safari requirement: autoplay only works when muted
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.playVideo();
            } catch {}
          },
          onStateChange: (e: any) => {
            try {
              if (e.target.isMuted && !e.target.isMuted()) {
                setShowUnmute(false);
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QR;
