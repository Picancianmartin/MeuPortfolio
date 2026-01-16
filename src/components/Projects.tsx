import { CircularProjectGallery, ProjectItem } from "./CircularProjectGallery";
import imageMedFlow from '../assets/MedFlowCapa.png';
import imageLP from '../assets/LandingPage.png';
import agcapa from '../assets/agCapa.png';
import aiStudio from '../assets/AIStudio.png'

export function Projects() {
  
  // Seus dados adaptados para o novo formato
  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "MedFlow iOS",
      description: "App nativo (SwiftUI) para gestão de medicamentos. Organiza remédios por nome ou sintoma, com sistema inteligente de lembretes e histórico de uso.",
      image: imageMedFlow,
      tags: ["Swift", "SwiftUI", "Xcode", "iOS"],
      github: "https://github.com/Picancianmartin/MedFlowiOS.git",
      demo: "https://picancianmartin.github.io/MedFlowiOS/",
      inDevelopment: false,
    },
    {
      id: 2,
      title: "AulaGo",
      description: "Plataforma completa para professores autônomos. Landing page de alta conversão com dashboard simulado e sistema de agendamento integrado.",
      image: agcapa,
      tags: ["React", "TypeScript", "Tailwind", "Vite"],
      github: "https://github.com/Jessica-G-arcia/AulaGo_mobile.git",
      demo: "/lp",
      inDevelopment: true,
    },
    {
      id: 3,
      title: "Smart Banking",
      description: "Interface de alta fidelidade para Fintechs. Foco total em Pixel Perfect a partir do Figma, responsividade avançada e animações suaves.",
      image: imageLP,
      tags: ["HTML", "CSS", "Bootstrap", "Figma"],
      figma: "https://www.figma.com/community/file/1592239441747222722",
      demo: "https://picancianmartin.github.io/LandingPage/",
      inDevelopment: false,
    },
    {
      id: 4,
      title: "AI Studio Gallery",
      description: "AI STUDIO GALLERY é uma prévia de página (mockup) criada para apresentar, de forma organizada e elegante, uma coleção de pôsteres gerados com IA para uso em redes sociais.",
      image: aiStudio,
      tags: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
      demo: "" ,
      inDevelopment: false,
      wipSoon: true,
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 bg-gray-50 bg-surface-primary min-h-screen flex flex-col justify-center overflow-hidden relative transition-colors duration-300">
      
      {/* Background Decorativo Cyberpunk */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-neon-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-neon-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
            Projetos <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-yellow bg-clip-text text-transparent"></span>
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto mb-4 sm:mb-5"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg transition-colors duration-300 space-y-8">
            Navegue pela galeria circular para explorar os detalhes de cada aplicação.
          </p>
        </div>

        {/* Componente da Galeria */}
        <CircularProjectGallery items={projects} />
        
      </div>
    </section>
  );
}