import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center space-y-6 animate-fade-in">
            <ShoppingBag className="w-24 h-24 mx-auto text-[hsl(195,100%,50%)]/30" />
            <h1 className="text-4xl font-bold gradient-text">
              Tu carrito está vacío
            </h1>
            <p className="text-foreground/60 text-lg">
              Descubre nuestra colección de collares inteligentes
            </p>
            <Link to="/shop">
              <Button 
                size="lg"
                className="bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)] hover:scale-105 transition-all duration-300"
              >
                Ir a la Tienda
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 gradient-text animate-fade-in">
          Tu Carrito
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="glass-effect p-6 rounded-xl border border-white/10 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {item.name}
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          Color: {item.color}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-2xl font-bold gradient-text">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect p-8 rounded-xl border border-white/10 sticky top-32 space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-[hsl(195,100%,50%)]">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-4 py-4 border-y border-white/10">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Envío</span>
                  <span className="text-[hsl(195,100%,50%)]">Gratis</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>IVA (21%)</span>
                  <span>€{(getTotalPrice() * 0.21).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="gradient-text">
                  €{(getTotalPrice() * 1.21).toFixed(2)}
                </span>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                size="lg"
                className="w-full bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)] text-lg py-6 hover:scale-105 transition-all duration-300 tech-glow"
              >
                Proceder al Pago
              </Button>

              <Link to="/shop">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-[hsl(195,100%,50%)] text-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,50%)]/10"
                >
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
