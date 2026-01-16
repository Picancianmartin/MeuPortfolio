"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Figma,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Interfaces ---
export interface ProjectItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  figma?: string;
  inDevelopment?: boolean;
  wipSoon?: boolean;
}

interface CircularGalleryProps {
  items: ProjectItem[];
  autoplay?: boolean;
  interval?: number;
}

// --- Lógica Matemática do Carrossel ---
function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export const CircularProjectGallery = ({
  items,
  autoplay = false,
  interval = 5000,
}: CircularGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1000);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const itemsLength = useMemo(() => items.length, [items]);
  const activeItem = useMemo(() => items[activeIndex], [activeIndex, items]);

  // Responsividade
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % itemsLength);
      }, interval);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, interval, itemsLength]);

  // Navegação por Teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [itemsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemsLength);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [itemsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [itemsLength]);

  // --- Lógica de Swipe Mobile (Corrigida) ---
const minSwipeDistance = 50;
const touchStartX = useRef<number | null>(null);
const touchEndX = useRef<number | null>(null);

const onTouchStart = (e: React.TouchEvent) => {
  touchEndX.current = null; // Reseta o fim
  touchStartX.current = e.targetTouches[0].clientX;
};

const onTouchMove = (e: React.TouchEvent) => {
  touchEndX.current = e.targetTouches[0].clientX;
};

const onTouchEnd = () => {
  if (!touchStartX.current || !touchEndX.current) return;

  const distance = touchStartX.current - touchEndX.current;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;

  if (isLeftSwipe) {
    // Arrastou para a Esquerda (Próximo)
    handleNext(); // Use a função que avança o projeto
  }
  
  if (isRightSwipe) {
    // Arrastou para a Direita (Anterior)
    handlePrev(); // Use a função que volta o projeto
  }
};
  // --- Lógica 3D e Estilos das Imagens ---
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;

    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
    const isRight = (activeIndex + 1) % itemsLength === index;

    const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";

    if (isActive) {
      return {
        zIndex: 10,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition,
        filter: "brightness(1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 5,
        opacity: 0.4,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
        filter: "brightness(0.5) blur(2px)",
      };
    }
    if (isRight) {
      return {
        zIndex: 5,
        opacity: 0.4,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
        filter: "brightness(0.5) blur(2px)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(-100px) scale(0.5)`,
      transition,
    };
  }

  // Animação do Texto
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* --- COLUNA ESQUERDA: CARROSSEL 3D --- */}
        <div
          className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center touch-pan-y"
          style={{ perspective: "1000px" }}
          ref={imageContainerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Mobile touch hint - apenas em mobile */}
          <div className="lg:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-brand-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 pointer-events-none animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15v-3H6v3"></path>
              <path d="M18 7.5V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1.5"></path>
              <path d="M18 12v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6"></path>
              <path d="M9 15V9"></path>
              <path d="M12 15V9"></path>
              <path d="M15 15V9"></path>
            </svg>
            Toque para explorar
          </div>
          
          {items.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.title}
              className="absolute w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10 cursor-pointer"
              style={{
                ...getImageStyle(index),
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* --- COLUNA DIREITA: DETALHES DO PROJETO --- */}
        <div className="flex flex-col justify-center relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center gap-8 flex-wrap">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                  {activeItem.title}
                </h3>

                {activeItem.inDevelopment && (
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold
        text-text-primary border border-transparent
        md:mt-2 mt-1
        [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,var(--color-brand-primary),var(--color-accent-cta))_border-box]"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent-cta animate-pulse" />
                    Em desenvolvimento
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-sm font-medium cursor-default
                    text-text-secondary bg-surface-primary
                    border border-transparent
                    [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-primary)_70%,transparent),color-mix(in_srgb,var(--color-accent-cta)_70%,transparent))_border-box]
                    hover:text-text-primary hover:bg-surface-elevated
                    transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {activeItem.description}
              </p>

              {/* --- BOTÕES --- */}
              <div className="flex flex-wrap gap-8 pt-6">
                {/* 1. Botão Ver Projeto (Azul #00B4D8) */}
                {activeItem.demo && (
                  <a
                    href={activeItem.demo}
                    target={
                      activeItem.demo.startsWith("http") ? "_blank" : "_self"
                    }
                    rel={
                      activeItem.demo.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-2 py-2 font-bold transition-transform duration-300 hover:scale-105 cursor-pointer"
                  >
                    {/* Ícone com a cor primária da marca */}
                    <ExternalLink
                      size={20}
                      className="text-[var(--color-brand-primary)] group-hover:brightness-125 transition-colors duration-300"
                    />

                    {/* Texto com o efeito de Gradiente */}
                    <span className="bg-[linear-gradient(to_right,var(--color-brand-primary),var(--color-accent-cta))] bg-clip-text text-transparent">
                      Ver Projeto
                    </span>
                  </a>
                )}

                {/* Botão Código */}
                {activeItem.github && (
                  <a
                    href={activeItem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
      text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20
      hover:text-accent-cta hover:border-accent-cta hover:bg-accent-cta/10 hover:scale-105
      dark:hover:text-accent-cta dark:hover:border-accent-cta dark:hover:bg-accent-cta/20"
                  >
                    <Github size={20} />
                    Código
                  </a>
                )}

                {/* 2. Botão Figma (Azul #00B4D8 no Hover) */}
                {activeItem.figma && (
                  <a
                    href={activeItem.figma}
                    target="_blank"
                    // Fundo transparente com borda padrão, muda para azul no hover
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
      text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20
      hover:text-accent-cta hover:border-accent-cta hover:bg-accent-cta/10 hover:scale-105
      dark:hover:text-accent-cta dark:hover:border-accent-cta dark:hover:bg-accent-cta/20"
                  >
                    <Figma size={20} />
                    Design
                  </a>
                )}
                {activeItem.wipSoon && (
                  <span
                    className="inline-flex items-center gap-2
                  px-5 py-2 rounded-full text-sm font-bold
                  text-text-primary border border-transparent
                  [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,var(--color-brand-primary),var(--color-accent-cta))_border-box]"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-cta animate-pulse" />
                    WIP • Em breve
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- CONTROLES DE NAVEGAÇÃO --- */}
          <div className="flex gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-white/5">
            {/* Botão Anterior */}
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-[var(--card)] text-[var(--foreground)]
    border border-[color:var(--border)] shadow-sm
    transition-all duration-300 hover:scale-110
    
    /* ALTERAÇÃO AQUI: De brand-primary (Roxo) para accent-cta (Azul/Cyan) */
    hover:border-[var(--color-accent-cta)] hover:text-[var(--color-accent-cta)]
    
    focus:outline-none focus:ring-2 focus:ring-[var(--ring)]
    focus:ring-offset-2 focus:ring-offset-[var(--background)]
    group"
              aria-label="Anterior"
            >
              <ChevronLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>

            {/* Botão Próximo */}
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-[var(--card)] text-[var(--foreground)]
    border border-[color:var(--border)] shadow-sm
    transition-all duration-300 hover:scale-110
    
    /* ALTERAÇÃO AQUI: De brand-primary (Roxo) para accent-cta (Azul/Cyan) */
    hover:border-[var(--color-accent-cta)] hover:text-[var(--color-accent-cta)]
    
    focus:outline-none focus:ring-2 focus:ring-[var(--ring)]
    focus:ring-offset-2 focus:ring-offset-[var(--background)]
    group"
              aria-label="Próximo"
            >
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function nextProject() {
  throw new Error("Function not implemented.");
}

function prevProject() {
  throw new Error("Function not implemented.");
}
