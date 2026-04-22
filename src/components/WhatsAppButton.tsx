import whatsappIcon from "@/assets/whatsapp-icon.png";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/573128642686"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in group gpu-accel"
      style={{
        animation: "fade-in 0.3s ease-out, breathing 3s ease-in-out infinite"
      }}
      aria-label="Contactar por WhatsApp"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="w-14 h-14 transition-transform duration-200 group-hover:scale-110"
      />
    </a>
  );
};

export default WhatsAppButton;
