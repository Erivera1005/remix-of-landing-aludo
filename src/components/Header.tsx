import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Home, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";
import { useReducedMotionToggle } from "@/hooks/useReducedMotionToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { cart, openCart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const { reduced, toggle } = useReducedMotionToggle();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsMenuOpen(true);
    // Delay to allow the browser to render the initial closed state before animating in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <img src={logo} alt="ALUDO Logo" loading="eager" decoding="async" fetchPriority="high" className="h-16 md:h-20 w-auto transition-transform duration-200 hover:scale-105" />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
                Inicio
              </Link>
              <Link to="/shop" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium">
                Tienda
              </Link>
              <button onClick={openCart} className="relative text-foreground/70 hover:text-primary transition-colors duration-200">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </nav>

            <button
              onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
              className="md:hidden text-foreground hover:text-primary transition-colors duration-200 relative z-[60] w-6 h-6"
              aria-label="Toggle menu"
            >
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] ${
                    isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0"
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] ${
                    isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)] ${
                    isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay + Panel */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55]">
          {/* Overlay */}
          <div
            onClick={closeMenu}
            className={`absolute inset-0 bg-foreground/60 backdrop-blur-sm transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Slide-in Panel */}
          <nav
            className={`absolute top-0 left-0 h-full w-[75%] max-w-[320px] bg-background shadow-xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)] ${
              isAnimating ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Logo area */}
            <div className="px-6 py-5 border-b border-border">
              <img src={logo} alt="ALUDO Logo" className="h-14 w-auto" />
            </div>

            {/* Menu items */}
            <div className="flex-1 py-4">
              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center gap-4 px-6 py-4 text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium text-lg tracking-wide"
              >
                <Home className="w-5 h-5" />
                Inicio
              </Link>

              <div className="mx-6 h-px bg-border" />

              <Link
                to="/shop"
                onClick={closeMenu}
                className="flex items-center gap-4 px-6 py-4 text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium text-lg tracking-wide"
              >
                <Store className="w-5 h-5" />
                Tienda
              </Link>

              <div className="mx-6 h-px bg-border" />

              <button
                onClick={() => { closeMenu(); openCart(); }}
                className="flex items-center gap-4 px-6 py-4 text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium text-lg tracking-wide w-full"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Carrito</span>
                {cartItemsCount > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center animate-scale-in">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border">
              <p className="text-muted-foreground text-xs tracking-widest uppercase">ALUDO · Smart Pet Care</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;