import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { cart, getWhatsAppMessage } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }
    const message = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://wa.me/573102031996?text=${message}`, "_blank");
    navigate("/cart");
  }, []);

  return null;
};

export default Checkout;
