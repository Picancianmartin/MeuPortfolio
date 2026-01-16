import { Home, User, Cpu, Code, Mail, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  
  // Definição dos itens com seus respectivos ícones
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projetos', icon: Code },
    // Adicionei CV aqui se quiser linkar no futuro, ou mantenha Contato
    { id: 'contact', label: 'Contato', icon: Mail },
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
              <ThemeToggle />
            </div>

            {/* Mobile: Apenas o Toggle de Tema no topo (Menu sumiu daqui) */}
            <div className="md:hidden flex items-center">
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