import { Home, User, Code2, FolderKanban, Mail } from 'lucide-react';

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projetos', icon: FolderKanban },
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-primary/95 backdrop-blur-xl border-t border-brand-primary/20 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                isActive 
                  ? 'text-brand-primary' 
                  : 'text-text-secondary hover:text-brand-primary'
              }`}
              aria-label={item.label}
            >
              <Icon 
                size={22} 
                className={`transition-transform duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}
              />
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
