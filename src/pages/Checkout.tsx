import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { trackInitiateCheckout, trackLead } from "@/lib/metaPixel";

interface ShippingInfo {
  name: string;
  phone: string;
  document: string;
  city: string;
  address: string;
  additionalInfo?: string;
}

const Checkout = () => {
  const { cart, getWhatsAppMessage, getTotalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    const stored = sessionStorage.getItem("aludo_shipping");
    if (!stored) {
      navigate("/datos-envio");
      return;
    }

    let shipping: ShippingInfo;
    try {
      shipping = JSON.parse(stored);
    } catch {
      navigate("/datos-envio");
      return;
    }

    // Track checkout event
    trackInitiateCheckout(
      getTotalPrice(),
      cart.map(item => ({ id: item.id, quantity: item.quantity }))
    );

    // Track Lead conversion event with total value
    const totalValue = getTotalPrice();
    trackLead(totalValue);

    // Build WhatsApp message with shipping data
    const shippingLines = [
      `👤 Nombre: ${shipping.name}`,
      `📄 Cédula: ${shipping.document}`,
      `📞 Teléfono: ${shipping.phone}`,
      `🏙️ Ciudad: ${shipping.city}`,
      `📍 Dirección: ${shipping.address}`,
    ];

    if (shipping.additionalInfo?.trim()) {
      shippingLines.push(`🏢 Info adicional: ${shipping.additionalInfo}`);
    }

    const fullMessage = `🐾 *Nuevo pedido ALUDO* 🐾\n\n*Datos del cliente:*\n${shippingLines.join("\n")}\n\n${getWhatsAppMessage()}`;

    const message = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/573128642686?text=${message}`, "_blank");

    // Clean up shipping data
    sessionStorage.removeItem("aludo_shipping");
    navigate("/cart");
  }, []);

  return null;
};

export default Checkout;
