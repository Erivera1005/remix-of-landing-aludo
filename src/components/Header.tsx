import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <img 
              src={logo} 
              alt="ALUDO Logo" 
              className="h-10 w-auto transition-all duration-300 hover:scale-105 hover:brightness-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground/70 hover:text-primary transition-colors duration-400 font-medium"
            >
              Inicio
            </Link>
            <Link 
              to="/shop" 
              className="text-foreground/70 hover:text-primary transition-colors duration-400 font-medium"
            >
              Tienda
            </Link>
            <Link 
              to="/cart" 
              className="relative"
            >
              <Button 
                variant="outline" 
                size="icon"
                className="relative border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-500"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-scale-in">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-foreground/70 hover:text-primary transition-colors duration-200 font-medium"
            >
              Inicio
            </Link>
            <Link 
              to="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-foreground/70 hover:text-primary transition-colors duration-200 font-medium"
            >
              Tienda
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-foreground/70 hover:text-primary transition-colors duration-200 font-medium"
            >
              Carrito ({cartItemsCount})
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
