"use client";

import DomeGallery, { GalleryItem } from "./DomeGallery"; // Ajuste o caminho se necessário

// Importação das Imagens
import starbucks from "@/assets/ai/starbucks-miniature.jpeg";
import stanley from "@/assets/ai/stanley-mountain.png";
import goiabada from "@/assets/ai/Goiabada.png";
import dog from "@/assets/ai/dog.png";
import lancer from "@/assets/ai/evoLancer.png";
import tenis from "@/assets/ai/tenis.png";
import skate from "@/assets/ai/skate.png";
import watch from "@/assets/ai/watch.png";
import portrait from "@/assets/ai/portrait.png";
import { ArrowLeft } from "lucide-react";
import StarBorder from "./StarBorder";

const galleryData: GalleryItem[] = [
  {
    id: 1,
    src: stanley,
    alt: "Garrafa térmica Stanley em ambiente de neve",
    title: "Contraste Extremo (Frio)",
    description:
      "Imagem de produto em ambiente outdoor, com vapor visível e clima de inverno para transmitir conforto térmico e aventura.",
  },
  {
    id: 2,
    src: starbucks,
    alt: "Copo de café monumental",
    title: "Escala Surreal",
    description:
      "Cena conceitual estilo diorama, usando escala surreal para destacar origem do café e storytelling visual com estética publicitária.",
  },
  {
    id: 3,
    src: dog,
    alt: "Cachorro nadando split-shot",
    title: "Split Shot (Ação)",
    description:
      "Cena split-shot mostrando o cachorro acima e abaixo da superfície, com bolhas e movimento, transmitindo energia.",
  },
  {
    id: 4,
    src: tenis,
    alt: "Tênis esportivo em movimento",
    title: "Ação Congelada",
    description:
      "Close de alta velocidade no momento do impacto, com poeira/partículas explodindo no ar.",
  },
  {
    id: 5,
    src: goiabada,
    alt: "Pote de Goiabada rústico",
    title: "Storytelling de Origem",
    description:
      "Produto em destaque na mesa, cercado por goiabas frescas e mãos colhendo, reforçando naturalidade.",
  },
  {
    id: 6,
    src: lancer,
    alt: "Mitsubishi Lancer Drift",
    title: "Motion + Poeira",
    description:
      "Mitsubishi Lancer Evolution em cenário urbano moderno, com iluminação dramática.",
  },
  {
    id: 7, // Corrigi o ID repetido (era 3)
    src: skate,
    alt: "Skate na poça d'água",
    title: "Splash Shot Urbano",
    description:
      "Skate passando por uma poça d’água, gerando um spray dramático com gotas congeladas.",
  },
  {
    id: 8, // Corrigi o ID repetido (era 6)
    src: watch,
    alt: "Smartwatch Hero Shot",
    title: "Product Hero Shot",
    description:
      "Relógio em close com iluminação de recorte e fundo escuro, destacando textura.",
  },
  {
    id: 9, // Corrigi o ID repetido (era 3)
    src: portrait,
    alt: "Retrato submerso",
    title: "Underwater Portrait",
    description:
      "Retrato frontal com o rosto parcialmente submerso, distorções suaves na linha d’água.",
  },
];

export default function AiGalleryPage() {
  return (
    <div className="relative w-full h-screen bg-[#09090b] overflow-hidden">
      {/* --- BOTÃO NOVO COM EFEITO STAR BORDER --- */}
      <div className="absolute top-6 left-6 z-50">
        <StarBorder 
            as="a" 
            href="/" 
            color="#6366f1" // Cor Indigo (ou use "cyan", "hotpink", etc)
            speed="5s"
            className="group cursor-pointer" // Classes extras
        >
            <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
                <span className="text-sm gradient-text font-medium tracking-wide text-zinc-400 group-hover:text-white transition-colors">
                    Voltar ao Portfólio
                </span>
            </div>
        </StarBorder>
      </div>

      {/* Título Decorativo (Opcional - Fica bonito no canto oposto) */}
      <div className="absolute top-8 right-8 z-40 pointer-events-none hidden md:block">
        <h1 className="gradient-text font-bold text-lg tracking-[0.2em] uppercase">
          AI Studio Gallery
        </h1>
      </div>

      <DomeGallery
        images={galleryData}
        segments={25}
        fit={0.75} // Ajuste o zoom inicial da esfera (0.1 a 1.5)
        overlayBlurColor="#09090b" // Cor de fundo para mesclar
        openedImageWidth="30vw" // Largura quando aberto (responsivo)
        openedImageHeight="auto" // Altura automática para manter proporção
      />
    </div>
  );
}
