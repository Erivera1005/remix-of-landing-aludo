import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative mt-20 glass-effect border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 animate-fade-in">
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                alt="ALUDO Logo" 
                className="h-8 w-auto transition-all duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Collares inteligentes ecosostenibles para tus mascotas. Tecnología del futuro, hoy.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold text-primary">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-primary">Información</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Sobre Nosotros</li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Tecnología IA</li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Sostenibilidad</li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Garantía</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-primary">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-400 cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>info@aludo.com</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-400 cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-400 cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>Tech Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 ALUDO. Todos los derechos reservados. Hecho con IA y sostenibilidad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
