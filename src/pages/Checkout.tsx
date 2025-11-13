import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("¡Pedido confirmado!", {
        description: "Recibirás un email con los detalles de tu compra",
      });
      clearCart();
      setIsProcessing(false);
      navigate("/");
    }, 2000);
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 gradient-text animate-fade-in">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="glass-effect p-8 rounded-xl border border-white/10 space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-[hsl(195,100%,50%)] mb-6">
                  Información Personal
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input 
                      id="firstName" 
                      required 
                      placeholder="Juan"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input 
                      id="lastName" 
                      required 
                      placeholder="García"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="juan.garcia@email.com"
                    className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    placeholder="+34 600 000 000"
                    className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="glass-effect p-8 rounded-xl border border-white/10 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-2xl font-bold text-[hsl(195,100%,50%)] mb-6">
                  Dirección de Envío
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input 
                    id="address" 
                    required 
                    placeholder="Calle Principal, 123"
                    className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input 
                      id="city" 
                      required 
                      placeholder="Madrid"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Código Postal</Label>
                    <Input 
                      id="postal" 
                      required 
                      placeholder="28001"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input 
                      id="country" 
                      required 
                      placeholder="España"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="glass-effect p-8 rounded-xl border border-white/10 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[hsl(195,100%,50%)]">
                    Información de Pago
                  </h2>
                  <div className="flex items-center space-x-2 text-foreground/60">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Pago seguro</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                  <div className="relative">
                    <Input 
                      id="cardNumber" 
                      required 
                      placeholder="1234 5678 9012 3456"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)] pl-12"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(195,100%,50%)]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Fecha de Expiración</Label>
                    <Input 
                      id="expiry" 
                      required 
                      placeholder="MM/AA"
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      required 
                      placeholder="123"
                      type="password"
                      maxLength={3}
                      className="bg-background/50 border-white/10 focus:border-[hsl(195,100%,50%)]"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isProcessing}
                className="w-full bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-[hsl(237,100%,11%)] text-lg py-6 hover:scale-105 transition-all duration-300 tech-glow"
              >
                {isProcessing ? "Procesando..." : "Confirmar Pedido"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect p-8 rounded-xl border border-white/10 sticky top-32 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold text-[hsl(195,100%,50%)]">
                Resumen
              </h2>
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/80">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-y border-white/10 text-sm">
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
