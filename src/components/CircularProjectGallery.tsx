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
  MoveHorizontal,
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

// --- Lógica Matemática ---
function calculateGap(width: number) {
  if (width < 640) return width * 0.25; // Mobile (Mantido espalhado para ver as pontas)

  const minWidth = 1024;
  const maxWidth = 1456;
  
  // --- AJUSTE WEB: GAP REDUZIDO ---
  // Antes era 30 e 50.
  // Agora coloquei 0 e 30.
  // Isso significa que em telas menores de notebook, as imagens laterais
  // vão ficar quase escondidas atrás da central, bem juntinhas.
  const minGap = 0; 
  const maxGap = 30;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.02 * (width - maxWidth)); // Reduzi o multiplicador também
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

  // Navegação Teclado
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

  // --- Swipe Mobile ---
  const minSwipeDistance = 50;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  // --- Estilos das Imagens ---
  function getImageStyle(index: number): React.CSSProperties {
    const isMobile = containerWidth < 640;
    const gap = calculateGap(containerWidth);
    const maxStickUp = isMobile ? gap * 0.2 : gap * 0.8;

    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
    const isRight = (activeIndex + 1) % itemsLength === index;

    const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";
    const sideRotation = isMobile ? 8 : 15;
    
    // --- AJUSTE DE ESCALA (TAMANHO) ---
    // activeScale: Define o tamanho da imagem CENTRAL.
    // Web: 1 (100% do tamanho).
    // Mobile: 0.85 (85% do tamanho) -> Deixa ela "um pouquinho menor".
    const activeScale = isMobile ? 0.85 : 1; 

    // sideScale: Define o tamanho das imagens do FUNDO.
    const sideScale = isMobile ? 0.75 : 0.85; 
    
    const sideOpacity = isMobile ? 0.7 : 0.4; 

    if (isActive) {
      return {
        zIndex: 10,
        opacity: 1,
        pointerEvents: "auto",
        // Apliquei o activeScale aqui
        transform: `translateX(0px) translateY(0px) scale(${activeScale}) rotateY(0deg)`,
        transition,
        filter: "brightness(1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 5,
        opacity: sideOpacity,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(${sideRotation}deg)`,
        transition,
        filter: "brightness(0.6) blur(1px)",
      };
    }
    if (isRight) {
      return {
        zIndex: 5,
        opacity: sideOpacity,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(-${sideRotation}deg)`,
        transition,
        filter: "brightness(0.6) blur(1px)",
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

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-28 items-center">
        
        {/* --- CARROSSEL --- */}
        <div
          className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] flex items-center justify-center touch-pan-y"
          style={{ perspective: "1000px" }}
          ref={imageContainerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Badge Indicativo */}
          <div className="lg:hidden absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/5 text-white/80 text-[10px] font-medium tracking-wide pointer-events-none">
            <MoveHorizontal size={12} className="text-white/70" />
            <span>Deslize</span>
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

        {/* --- DETALHES --- */}
        <div className="flex flex-col justify-center relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-4 lg:space-y-6"
            >
              <div className="flex items-center gap-4 lg:gap-8 flex-wrap">
                <h3 className="text-3xl lg:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
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
                    className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium cursor-default
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

              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {activeItem.description}
              </p>

              {/* Botões */}
              <div className="flex flex-wrap gap-4 lg:gap-8 pt-4 lg:pt-6">
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
                    <ExternalLink
                      size={20}
                      className="text-[var(--color-brand-primary)] group-hover:brightness-125 transition-colors duration-300"
                    />
                    <span className="bg-[linear-gradient(to_right,var(--color-brand-primary),var(--color-accent-cta))] bg-clip-text text-transparent">
                      Ver Projeto
                    </span>
                  </a>
                )}

                {activeItem.github && (
                  <a
                    href={activeItem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-bold transition-all duration-300 text-sm lg:text-base
      text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20
      hover:text-accent-cta hover:border-accent-cta hover:bg-accent-cta/10 hover:scale-105
      dark:hover:text-accent-cta dark:hover:border-accent-cta dark:hover:bg-accent-cta/20"
                  >
                    <Github size={20} />
                    Código
                  </a>
                )}

                {activeItem.figma && (
                  <a
                    href={activeItem.figma}
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-bold transition-all duration-300 text-sm lg:text-base
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
                  px-4 py-2 lg:px-5 lg:py-2 rounded-full text-sm font-bold
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

          {/* Controles Desktop */}
          <div className="hidden lg:flex gap-4 mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200 dark:border-white/5">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-[var(--card)] text-[var(--foreground)] border border-[color:var(--border)] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[var(--color-accent-cta)] hover:text-[var(--color-accent-cta)] group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-[var(--card)] text-[var(--foreground)] border border-[color:var(--border)] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[var(--color-accent-cta)] hover:text-[var(--color-accent-cta)] group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};