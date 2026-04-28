import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { MessageCircle } from "lucide-react";

const formatCOP = (value: number) => `$${value.toLocaleString("es-CO")}`;

const CITY_OPTIONS = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Otra"];

const ShippingData = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    document: "",
    city: "",
    otherCity: "",
    address: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
    if (!formData.document.trim()) newErrors.document = "La cédula es obligatoria";
    if (!formData.city.trim()) newErrors.city = "La ciudad es obligatoria";
    if (formData.city === "Otra" && !formData.otherCity.trim()) {
      newErrors.otherCity = "Escribe el nombre de tu ciudad";
    }
    if (!formData.address.trim()) newErrors.address = "La dirección es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const finalCity = formData.city === "Otra" ? formData.otherCity.trim() : formData.city;
    const dataToStore = { ...formData, city: finalCity };
    sessionStorage.setItem("aludo_shipping", JSON.stringify(dataToStore));
    navigate("/checkout");
  };

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.document.trim() &&
    formData.city.trim() &&
    (formData.city !== "Otra" || formData.otherCity.trim()) &&
    formData.address.trim();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Datos de Envío | ALUDO Colombia"
        description="Ingresa tus datos de envío para completar tu pedido de collares inteligentes ALUDO."
        path="/datos-envio"
        noindex
      />
      <Header />

      <main className="container mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-20">
        <h1 className="text-[1.85rem] sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12 gradient-text animate-fade-in leading-tight">
          Datos de Envío
        </h1>

        <div className="max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="glass-effect p-6 md:p-8 rounded-xl border border-border/50 space-y-5 animate-fade-in-up"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Número de teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Ej: 3101234567"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-destructive text-sm">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">Documento de identidad (cédula) *</Label>
              <Input
                id="document"
                placeholder="Ej: 1234567890"
                value={formData.document}
                onChange={(e) => handleChange("document", e.target.value)}
                className={errors.document ? "border-destructive" : ""}
              />
              {errors.document && (
                <p className="text-destructive text-sm">{errors.document}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad *</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleChange("city", value)}
              >
                <SelectTrigger
                  id="city"
                  className={errors.city ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Selecciona tu ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {CITY_OPTIONS.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-destructive text-sm">{errors.city}</p>
              )}
            </div>

            {formData.city === "Otra" && (
              <div className="space-y-2">
                <Label htmlFor="otherCity">Escribe tu ciudad *</Label>
                <Input
                  id="otherCity"
                  placeholder="Ej: Bucaramanga"
                  value={formData.otherCity}
                  onChange={(e) => handleChange("otherCity", e.target.value)}
                  className={errors.otherCity ? "border-destructive" : ""}
                />
                {errors.otherCity && (
                  <p className="text-destructive text-sm">{errors.otherCity}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                placeholder="Tu dirección de envío"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-destructive text-sm">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">
                Información adicional{" "}
                <span className="text-muted-foreground text-xs">(opcional)</span>
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Conjunto, torre, apartamento, piso, etc."
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                className="min-h-[70px]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid}
              className="w-full text-base md:text-lg py-5 md:py-6 hover:scale-105 transition-all duration-300 tech-glow"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Finalizar pedido
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingData;
