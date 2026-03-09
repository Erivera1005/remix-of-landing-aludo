import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/573128642686"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#000637] rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in group gpu-accel"
      style={{
        animation: "fade-in 0.3s ease-out, breathing 3s ease-in-out infinite"
      }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-110" />
    </a>
  );
};

export default WhatsAppButton;
