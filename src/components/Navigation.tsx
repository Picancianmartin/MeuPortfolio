import { Home, User, Code, Mail, Calculator } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

type ItemNav =
  | { tipo: 'ancora'; id: string; label: string; icon: typeof Home }
  | { tipo: 'rota'; id: string; label: string; icon: typeof Home; to: string };

// Todo item do menu é uma rota própria. Âncora entre páginas foi descartada de
// propósito: a home anima as seções na entrada, então a posição do alvo muda
// enquanto a página carrega e a rolagem nunca para no lugar certo.
const navItems: ItemNav[] = [
  { tipo: 'rota', id: 'home', label: 'Início', icon: Home, to: '/' },
  { tipo: 'rota', id: 'sobre', label: 'Sobre', icon: User, to: '/sobre' },
  { tipo: 'rota', id: 'projetos', label: 'Projetos', icon: Code, to: '/projetos' },
  { tipo: 'rota', id: 'orcamento', label: 'Orçamento', icon: Calculator, to: '/orcamento' },
  { tipo: 'rota', id: 'contato', label: 'Contato', icon: Mail, to: '/contato' },
];

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const naHome = pathname === '/';

  const irPara = (item: ItemNav) => {
    if (item.tipo === 'rota') {
      navigate(item.to);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Âncora fora da home: volta para a home com o hash e deixa o App rolar.
    if (!naHome) {
      navigate(`/#${item.id}`);
      return;
    }
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection?.(item.id);
  };

  const estaAtivo = (item: ItemNav) =>
    item.tipo === 'rota' ? pathname === item.to : naHome && activeSection === item.id;

  return (
    <>
      {/* --- HEADER SUPERIOR (Desktop completo | Mobile apenas logo) --- */}
      <nav className="fixed top-0 w-full artic-sky backdrop-blur-xl z-50 border-b border-zinc-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <button
              type="button"
              className="text-xl font-bold text-text-primary cursor-pointer"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              onClick={() => (naHome ? irPara(navItems[0]) : navigate('/'))}
            >
              &lt;Portfolio /&gt;
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => irPara(item)}
                  aria-current={estaAtivo(item) ? 'page' : undefined}
                  className={`text-sm font-medium hover:text-accent-cta transition-colors ${
                    estaAtivo(item) ? 'text-accent-cta' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* --- NAVEGAÇÃO INFERIOR (Mobile, estilo app) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-primary/95 backdrop-blur-xl border-t border-zinc-200 dark:border-white/10 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const ativo = estaAtivo(item);

            return (
              <button
                key={item.id}
                onClick={() => irPara(item)}
                aria-current={ativo ? 'page' : undefined}
                className="flex flex-col items-center justify-center w-full h-full gap-1"
              >
                <Icon
                  size={24}
                  className={`transition-all duration-300 ${
                    ativo ? 'text-accent-cta -translate-y-1' : 'text-text-secondary'
                  }`}
                  fill={ativo ? 'currentColor' : 'none'}
                  fillOpacity={ativo ? 0.2 : 0}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    ativo ? 'text-accent-cta' : 'text-text-secondary/70'
                  }`}
                >
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
