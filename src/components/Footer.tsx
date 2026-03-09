import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative mt-12 md:mt-20 glass-effect border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-5 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4 animate-fade-in">
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                alt="ALUDO Logo" 
                className="h-8 w-auto transition-all duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground text-xs md:text-sm max-w-xs">
              Collares inteligentes con Inteligencia Artificial. Fabricados en Colombia con materiales ecológicos para el bienestar de tu mascota.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 md:space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold text-sm md:text-base text-primary">Navegación</h3>
            <ul className="space-y-2 text-xs md:text-sm">
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
          <div className="space-y-3 md:space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-sm md:text-base text-primary">Información</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Sobre Nosotros</li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Tecnología de IA</li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Sostenibilidad</li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">Compromiso Social</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-sm md:text-base text-primary">Contacto</h3>
            <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-200 cursor-pointer">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span>aludooficial@gmail.com</span>
              </li>
              <li>
                <a href="https://wa.me/573128642686" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span>+57 312 864 2686</span>
                </a>
              </li>
              <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-200 cursor-pointer">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2025 ALUDO. Todos los derechos reservados. Hecho en Colombia con tecnología y sostenibilidad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
