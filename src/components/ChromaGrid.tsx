import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string; // Pode ser a data ou tag
  borderColor?: string;
  gradient?: string;
  url?: string;
}

interface ChromaGridProps {
  items: ChromaItem[];
  className?: string;
  radius?: number; // Tamanho do foco de luz
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Refs para guardar a posição do mouse
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Função para atualizar as variáveis CSS de posição
    const updatePosition = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${mousePos.current.x}px`);
        containerRef.current.style.setProperty('--y', `${mousePos.current.y}px`);
      }
    };

    // Animação suave com GSAP
    const xTo = gsap.quickTo(mousePos.current, "x", { duration: 0.5, ease: "power3", onUpdate: updatePosition });
    const yTo = gsap.quickTo(mousePos.current, "y", { duration: 0.5, ease: "power3", onUpdate: updatePosition });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      // Opcional: Fade out ou resetar posição
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5 });
    };

    const handleMouseEnter = () => {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex flex-wrap justify-center gap-6 p-10 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%',
      } as React.CSSProperties}
    >
      {/* CARDS */}
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => item.url && window.open(item.url, '_blank')}
          className="group relative flex flex-col w-[300px] h-[400px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          style={{
            background: item.gradient || 'linear-gradient(145deg, #1a1a1a, #000)',
            border: `1px solid ${item.borderColor || '#333'}`,
          }}
        >
          {/* Imagem */}
          <div className="flex-1 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>

          {/* Footer do Card */}
          <div className="p-4 bg-black/80 backdrop-blur-sm border-t border-white/10 z-10">
            <h3 className="text-white font-bold text-lg">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.subtitle}</p>
            {item.handle && (
              <span className="absolute top-3 right-3 text-xs bg-white/10 px-2 py-1 rounded-full text-white/80 border border-white/5">
                {item.handle}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* --- MÁSCARA DE ESCURIDÃO (O Segredo do Efeito) --- */}
      {/* Essa div cobre tudo com grayscale e usa mask-image para "furar" onde o mouse está */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.5)', // Escurece e tira cor
          WebkitBackdropFilter: 'grayscale(1) brightness(0.5)',
          
          // Máscara Radial: Transparente no centro (mostra cor), Opaca nas bordas (mostra grayscale)
          maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.5) 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.5) 40%, black 100%)',
        }}
      />
      
      {/* Overlay opcional para suavizar a entrada/saída */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-30 opacity-0 transition-opacity duration-500"
        style={{
            backdropFilter: 'grayscale(1) brightness(0.5)',
            background: 'rgba(0,0,0,0.2)'
        }}
      />

    </div>
  );
};

export default ChromaGrid;