import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";
import { useReducedMotionToggle } from "@/hooks/useReducedMotionToggle";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    cart
  } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const {
    reduced,
    toggle
  } = useReducedMotionToggle();
  return <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="ALUDO Logo" loading="eager" decoding="async" fetchPriority="high" className="h-10 w-auto transition-transform duration-200 hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
              Inicio
            </Link>
            <Link to="/shop" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
              Tienda
            </Link>
            
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground hover:text-primary transition-colors duration-200">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
              Inicio
            </Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
              Tienda
            </Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
              Carrito ({cartItemsCount})
            </Link>
          </nav>}
      </div>
    </header>;
};
export default Header;