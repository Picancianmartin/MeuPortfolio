import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'projects', label: 'Projetos' },
    { id: 'contact', label: 'Contato' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full artic-sky backdrop-blur-xl z-50 border-b border-brand-primary/20 md:block hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            &lt;Portfolio /&gt;
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
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
        </div>
      </div>
    </nav>
  );
}