
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface-elevated border-2 border-zinc-200 dark:border-white/10 transition-all duration-300 hover:border-accent-cta/40 focus:outline-none focus:ring-2 focus:ring-accent-cta/50"
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <div
        className={`absolute top-0.5 left-1  w-5 h-5 rounded-full bg-accent-cta flex items-center justify-center transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun size={14} className="text-white" />
        ) : (
          <Moon size={14} className="text-white" />
        )}
      </div>
    </button>
  );
}