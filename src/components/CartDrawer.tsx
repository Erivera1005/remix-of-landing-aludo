import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    closeCart();
    navigate("/datos-envio");
  };

  const handleKeepShopping = () => {
    closeCart();
    navigate("/shop");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 overflow-hidden">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/50">
          <SheetTitle className="text-xl font-bold text-primary">Tu Carrito</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <ShoppingBag className="w-16 h-16 text-primary/30" />
            <p className="text-lg font-semibold text-primary">Tu carrito está vacío</p>
            <p className="text-foreground/60 text-sm text-center">
              Descubre nuestra colección de collares inteligentes
            </p>
            <Button onClick={handleKeepShopping} className="mt-2">
              Ir a la Tienda
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex gap-4 p-3 rounded-xl border border-border/50 bg-card/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-primary truncate">{item.name}</h4>
                        <p className="text-foreground/60 text-xs">Color: {item.color}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 h-7 w-7 flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-7 w-7 border-primary/30 text-primary hover:bg-primary/10"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-7 w-7 border-primary/30 text-primary hover:bg-primary/10"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-bold text-primary">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Actions */}
            <div className="border-t border-border/50 px-5 py-4 space-y-4 bg-background">
              <div className="space-y-2 text-sm text-foreground/70">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex justify-between">
                    <span className="truncate">{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                  </div>
                ))}
                <div className="text-xs text-foreground/60 pt-1">
                  <span className="font-medium text-foreground/70">Envío:</span> ¡Gratis a todo Colombia! 🚚
                </div>
              </div>

              <div className="flex justify-between items-baseline text-lg font-bold pt-2 border-t border-border/50">
                <span>Total</span>
                <span className="gradient-text">${getTotalPrice().toLocaleString('es-CO')} COP</span>
              </div>

              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full text-base py-5 hover:scale-105 transition-all duration-300 tech-glow"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Continuar con el pedido
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleKeepShopping}
                className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              >
                Seguir Comprando
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
