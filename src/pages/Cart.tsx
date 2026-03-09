import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getWhatsAppMessage } = useCart();

  const handleFinalizarPedido = () => {
    const message = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://wa.me/573128642686?text=${message}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-20">
          <div className="text-center space-y-5 md:space-y-6 animate-fade-in">
            <ShoppingBag className="w-16 h-16 md:w-24 md:h-24 mx-auto text-primary/30" />
            <h1 className="text-2xl md:text-4xl font-bold gradient-text">
              Tu carrito está vacío
            </h1>
            <p className="text-foreground/60 text-base md:text-lg">
              Descubre nuestra colección de collares inteligentes
            </p>
            <Link to="/shop">
              <Button 
                size="lg"
                className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
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
      
      <main className="container mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-20">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12 gradient-text animate-fade-in">
          Tu Carrito
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.color}`}
                className="glass-effect p-4 md:p-6 rounded-xl border border-border/50 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4 md:gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="text-base md:text-xl font-semibold mb-0.5 md:mb-1 text-primary truncate">
                          {item.name}
                        </h3>
                        <p className="text-foreground/60 text-xs md:text-sm">
                          Color: {item.color}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 flex-shrink-0 h-8 w-8 md:h-10 md:w-10"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="border-primary/30 text-primary hover:bg-primary/10 h-8 w-8 md:h-10 md:w-10"
                        >
                          <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </Button>
                        <span className="text-base md:text-lg font-semibold w-6 md:w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-primary/30 text-primary hover:bg-primary/10 h-8 w-8 md:h-10 md:w-10"
                        >
                          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-lg md:text-2xl font-bold gradient-text whitespace-nowrap">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect p-5 md:p-8 rounded-xl border border-border/50 sticky top-28 md:top-32 space-y-5 md:space-y-6 animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-3 md:space-y-4 py-3 md:py-4 border-y border-border/50">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex justify-between gap-2 text-xs md:text-sm text-foreground/70">
                    <span className="truncate">{item.name} x{item.quantity}</span>
                    <span className="whitespace-nowrap">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                  </div>
                ))}
                <div className="pt-2 text-xs md:text-sm text-foreground/60">
                  <span className="font-medium text-foreground/70">Envío:</span> Por transportadora (Interrapidísimo, TCC, Servientrega, Coordinadora). El costo se calcula según destino.
                </div>
              </div>

              <div className="flex justify-between items-baseline text-xl md:text-2xl font-bold">
                <span>Total</span>
                <span className="gradient-text">
                  ${getTotalPrice().toLocaleString('es-CO')} COP
                </span>
              </div>

              <Button
                onClick={handleFinalizarPedido}
                size="lg"
                className="w-full text-base md:text-lg py-5 md:py-6 hover:scale-105 transition-all duration-300 tech-glow"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Finaliza tu pedido
              </Button>

              <Link to="/shop">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
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
