import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Seus componentes existentes
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ConviteOrcamento } from './components/ConviteOrcamento';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';

// Páginas carregadas sob demanda: quem abre a home não baixa o código delas.
const AIGallery = lazy(() => import('./components/AIGallery'));
const LPAulaGo = lazy(() => import('./components/LPAulaGo'));
const Links = lazy(() => import('./components/Links'));
const Orcamento = lazy(() => import('./components/Orcamento'));
const Projetos = lazy(() => import('./pages/Projetos'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Contato = lazy(() => import('./pages/Contato'));

function Carregando() {
  return (
    <div
      className="min-h-screen bg-background-primary flex items-center justify-center"
      role="status"
      aria-label="Carregando página"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-text-secondary/30 border-t-accent-cta" />
    </div>
  );
}

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

// EFEITO 2: rolagem por âncora (ao vir de outra rota, ex: /projetos -> /#contact)
useEffect(() => {
  if (!hash) return;
  const alvo = hash.replace('#', '');
  let cancelado = false;
  const timeouts: number[] = [];

  // 'instant' de propósito: o CSS global usa scroll-behavior smooth, e uma
  // animação reiniciada a cada correção nunca chegaria ao destino.
  const rolar = () => {
    if (cancelado) return;
    const elemento = document.getElementById(alvo);
    if (!elemento) return;
    elemento.scrollIntoView({ block: 'start', behavior: 'instant' });
    setActiveSection(alvo);
  };

  // A home tem imagens pesadas e animações de entrada: a posição da seção só é
  // definitiva depois que tudo carrega. Rolamos assim que o elemento existe (a
  // pessoa já chega perto do lugar certo) e corrigimos quando o layout assenta.
  let tentativas = 0;
  const procura = setInterval(() => {
    tentativas++;
    if (document.getElementById(alvo)) {
      rolar();
      clearInterval(procura);
      // As seções animam ao entrar na tela, então o layout ainda se desloca
      // depois da primeira rolagem. Três correções cobrem o período de entrada
      // sem deixar a página saltando indefinidamente.
      [400, 1200, 2500].forEach((atraso) => {
        timeouts.push(window.setTimeout(rolar, atraso));
      });
    } else if (tentativas > 50) {
      clearInterval(procura);
    }
  }, 100);

  return () => {
    cancelado = true;
    clearInterval(procura);
    timeouts.forEach((t) => window.clearTimeout(t));
  };
}, [hash]);

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300 pb-20 md:pb-0">
      {/* Navigation precisa receber as props para funcionar o highlight */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Certifique-se que seus componentes (Hero, About, etc) têm o id="..." na tag section interna */}
      <Hero />
      <About />
      <Skills />
      <Projects limite={2} linkVerTodos titulo="Projetos em destaque" />
      <ConviteOrcamento />
      <Contact />
    </div>
  );
}

// --- COMPONENTE PRINCIPAL APP ---
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<Carregando />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/ai-studio" element={<AIGallery />} />
          <Route path="/lp-aulago" element={<LPAulaGo />} />
          <Route path="/links" element={<Links />} />
          <Route path="/orcamento" element={<Orcamento />} />
        </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}