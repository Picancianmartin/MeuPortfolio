import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface-elevated border-2 border-brand-primary/30 transition-all duration-300 hover:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
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