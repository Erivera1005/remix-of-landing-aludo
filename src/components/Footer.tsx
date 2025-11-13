import { Link } from "react-router-dom";
import { Sparkles, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 glass-effect border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(195,100%,50%)]/5 to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-[hsl(195,100%,50%)] animate-glow-pulse" />
              <span className="text-xl font-bold gradient-text">ALUDO</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Collares inteligentes ecosostenibles para tus mascotas. Tecnología del futuro, hoy.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold text-[hsl(195,100%,50%)]">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-foreground/60 hover:text-[hsl(195,100%,50%)] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-foreground/60 hover:text-[hsl(195,100%,50%)] transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-foreground/60 hover:text-[hsl(195,100%,50%)] transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-[hsl(195,100%,50%)]">Información</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>Sobre Nosotros</li>
              <li>Tecnología IA</li>
              <li>Sostenibilidad</li>
              <li>Garantía</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-[hsl(195,100%,50%)]">Contacto</h3>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li className="flex items-center space-x-2 hover:text-[hsl(195,100%,50%)] transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>info@aludo.com</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-[hsl(195,100%,50%)] transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-[hsl(195,100%,50%)] transition-colors cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>Tech Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-foreground/40">
          <p>© 2025 ALUDO. Todos los derechos reservados. Hecho con IA y sostenibilidad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
