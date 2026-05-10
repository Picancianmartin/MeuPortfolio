import { Home, User, Cpu, Code, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../content/translations';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  
  // Definição dos itens com seus respectivos ícones
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'about', label: t.nav.about, icon: User },
    { id: 'skills', label: t.nav.skills, icon: Cpu },
    { id: 'projects', label: t.nav.projects, icon: Code },
    // Adicionei CV aqui se quiser linkar no futuro, ou mantenha Contato
    { id: 'contact', label: t.nav.contact, icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* --- HEADER SUPERIOR (Desktop Completo | Mobile Apenas Logo) --- */}
      <nav className="fixed top-0 w-full artic-sky backdrop-blur-xl z-50 border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              className="text-xl font-bold text-text-primary cursor-pointer" 
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              onClick={() => scrollToSection('home')}
            >
              &lt;Portfolio /&gt;
            </div>

            {/* Navegação Desktop (Hidden no Mobile) */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium hover:text-brand-primary transition-colors ${
                    activeSection === item.id ? 'text-brand-primary' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1 rounded-full border border-brand-primary/30 px-3 py-1 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors"
                aria-label="Toggle language"
              >
                <span className={language === "en" ? "text-brand-primary" : ""}>
                  EN
                </span>
                <span className="text-text-secondary/60">/</span>
                <span className={language === "pt" ? "text-brand-primary" : ""}>
                  PT
                </span>
              </button>
              <ThemeToggle />
            </div>

            {/* Mobile: Apenas o Toggle de Tema no topo (Menu sumiu daqui) */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1 rounded-full border border-brand-primary/30 px-3 py-1 text-[10px] font-semibold text-text-secondary hover:text-brand-primary transition-colors mr-3"
                aria-label="Toggle language"
              >
                <span className={language === "en" ? "text-brand-primary" : ""}>
                  EN
                </span>
                <span className="text-text-secondary/60">/</span>
                <span className={language === "pt" ? "text-brand-primary" : ""}>
                  PT
                </span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* --- NAVEGAÇÃO INFERIOR (Mobile Only - Estilo App) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-primary/95 backdrop-blur-xl border-t border-brand-primary/20 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex flex-col items-center justify-center w-full h-full gap-1"
              >
                {/* Ícone com animação de cor e posição */}
                <Icon 
                  size={24} 
                  className={`transition-all duration-300 ${
                    isActive 
                      ? 'text-brand-primary -translate-y-1' 
                      : 'text-text-secondary'
                  }`}
                  // Preenchimento opcional se quiser estilo "Sólido" quando ativo
                  fill={isActive ? "currentColor" : "none"}
                  fillOpacity={isActive ? 0.2 : 0} 
                />
                
                {/* Label pequeno */}
                <span className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-brand-primary' : 'text-text-secondary/70'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
