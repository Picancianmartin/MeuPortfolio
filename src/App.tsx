import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 1. Importar rotas

// Seus componentes existentes
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { MobileNavigation } from './components/MobileNavigation';
import { ThemeProvider } from './contexts/ThemeContext';

// 2. Importar a nova Galeria
import AIGallery from './components/AIGallery';
import LPAulaGo from './components/LPAulaGo';

// --- COMPONENTE HOME PAGE ---
// Movemos toda a lógica da página única para cá
function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Verifica se chegou ao fim da página
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(section.id);
        } 
        else if (rect.top < 0 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300">
      <div className="pb-16 md:pb-0">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

// --- APP PRINCIPAL ---
// Agora ele só gerencia o Tema e as Rotas
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Rota da Página Principal (Seu Portfólio atual) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rota da Nova Galeria de IA (Página separada) */}
          <Route path="/ai-studio" element={<AIGallery />} />
          <Route path="/lp" element={ <LPAulaGo /> } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}