import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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
            className="flex items-center space-x-2 group"
          >
            <Sparkles className="w-8 h-8 text-[hsl(195,100%,50%)] animate-glow-pulse" />
            <span className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
              ALUDO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-[hsl(195,100%,50%)] transition-all duration-300 hover:scale-110"
            >
              Inicio
            </Link>
            <Link 
              to="/shop" 
              className="text-foreground/80 hover:text-[hsl(195,100%,50%)] transition-all duration-300 hover:scale-110"
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
                className="relative border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10 hover:scale-110 transition-all duration-300 animate-glow-pulse"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[hsl(280,100%,70%)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-[hsl(195,100%,50%)] transition-colors"
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
              className="block text-foreground/80 hover:text-[hsl(195,100%,50%)] transition-colors"
            >
              Inicio
            </Link>
            <Link 
              to="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-foreground/80 hover:text-[hsl(195,100%,50%)] transition-colors"
            >
              Tienda
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-foreground/80 hover:text-[hsl(195,100%,50%)] transition-colors"
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
