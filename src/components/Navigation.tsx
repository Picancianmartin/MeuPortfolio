import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 w-full artic-sky backdrop-blur-xl z-50 border-b border-brand-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            &lt;Portfolio /&gt;
          </div>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button & Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="text-text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-surface-primary/95 backdrop-blur-xl border-t border-brand-primary/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-primary/20 text-brand-primary'
                    : 'text-text-primary hover:bg-surface-elevated'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}