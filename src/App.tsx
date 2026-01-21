import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Seus componentes existentes
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';

// Importar as novas páginas
import AIGallery from './components/AIGallery';
import LPAulaGo from './components/LPAulaGo';
import Links from './components/Links';

// --- COMPONENTE HOME PAGE ---
function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const { hash } = useLocation(); 

  // EFEITO 1: Scroll Spy (Monitora onde o usuário está na tela para pintar o menu)
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
        
        // Lógica para detectar qual seção está visível
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(section.id);
        } 
        else if (rect.top < 0 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chama uma vez ao iniciar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Array vazio: roda apenas ao montar o componente

// EFEITO 2: Hash Scroll Blindado (Tenta várias vezes até achar)
useEffect(() => {
  if (hash) {
    const targetId = hash.replace('#', '');
    let tentativas = 0;

    // Cria um intervalo que roda a cada 100 milissegundos
    const intervalo = setInterval(() => {
      const element = document.getElementById(targetId);
      
      if (element) {
        // SE ACHOU: Rola e para de procurar
        console.log(`Elemento ${targetId} encontrado na tentativa ${tentativas}! Rolando...`);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearInterval(intervalo);
      } else {
        // SE NÃO ACHOU: Apenas conta
        tentativas++;
        console.log(`Tentativa ${tentativas}: Elemento ${targetId} ainda não existe...`);
      }

      // SEGURANÇA: Se tentou 50 vezes (5 segundos) e não achou, desiste para não travar
      if (tentativas > 50) {
        console.error("Desisto. O elemento não foi renderizado a tempo.");
        clearInterval(intervalo);
      }
    }, 100); // Checa a cada 0.1 segundo

    // Limpa o intervalo se o usuário mudar de página antes de terminar
    return () => clearInterval(intervalo);
  }
}, [hash]);

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300 pb-20 md:pb-0">
      {/* Navigation precisa receber as props para funcionar o highlight */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Certifique-se que seus componentes (Hero, About, etc) têm o id="..." na tag section interna */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-studio" element={<AIGallery />} />
          <Route path="/lp-aulago" element={<LPAulaGo />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}