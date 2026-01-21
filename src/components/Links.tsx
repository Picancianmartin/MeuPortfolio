import { Mail, Github, Linkedin, FileText, Globe, ArrowRight } from "lucide-react";
import StarBorder from "./StarBorder"; 
import FloatingLines from "./FloatingLines";

const links = [
  {
    title: "Portfólio",
    subtitle: "Projetos, cases e habilidades",
    href: "https://pietramartin.dev",
    icon: Globe,
    highlight: true,
  },
  {
    title: "Currículo (PDF)",
    subtitle: "Baixar ou visualizar",
    href: "https://pietramartin.dev/Curriculo.pdf",
    icon: FileText,
  },
  {
    title: "GitHub",
    subtitle: "Repositórios e códigos",
    href: "https://github.com/Picancianmartin",
    icon: Github,
  },
  {
    title: "LinkedIn",
    subtitle: "Experiência e networking",
    href: "https://www.linkedin.com/in/pietra-cancian-martin/",
    icon: Linkedin,
  },
  {
    title: "Entre em contato",
    subtitle: "Envie uma mensagem direta",
    href: "https://pietramartin.dev/#contact",
    icon: Mail,
  },
];

export default function Links() {
  const brandColors = {
    primary: "#6E5CF4",   
    secondary: "#3A99FF", 
    accent: "#7BBCFE",   
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center py-10 px-4">
      
      {/* Fundo Animado */}
      <div className="absolute inset-0 z-0 opacity-60">
        <FloatingLines 
            linesGradient={[brandColors.primary, brandColors.secondary, brandColors.accent]} 
            animationSpeed={0.5} 
            lineCount={[4, 6, 2]}
            lineDistance={[0.5, 0.3, 0.2]} 
            interactive={true} 
            background="transparent"
        />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 flex flex-col items-center">
          
          {/* OPÇÃO 1: Tag de Código Neon (<PM />) */}
          <div className="mx-auto mb-5 h-32 w-32 rounded-2xl flex items-center justify-center
                          bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-[#6E5CF4]/20
                          group hover:border-[#6E5CF4]/50 hover:scale-105 transition-all duration-500 relative">
            
            {/* O texto <PM /> */}
            <span className="gradient-text font-mono text-3xl font-bold text-gray-300 group-hover:text-[#6E5CF4] transition-colors duration-300 ">
              &lt;PM/&gt;
            </span>
            
            {/* Efeito de brilho extra no hover (Glow Interno) */}
            <div className="absolute inset-0 bg-[#6E5CF4]/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full pointer-events-none" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
            Pietra Cancian Martin
          </h1>

          <p className="text-sm text-gray-300 mt-2 font-medium">
            Dev Full Stack (Web/Mobile) • <span className="text-[#6E5CF4]">Júnior</span>
          </p>
        </div>

        {/* Lista de Links */}
        <div className="space-y-4">
          {links.map((item) => (
            <StarBorder 
                as="a" 
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                color={brandColors.primary} 
                className="w-full block bg-black/40 backdrop-blur-sm"
            >
                <div className="flex items-center gap-4 w-full px-1">
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center 
                                    text-gray-400 group-hover:text-[#6E5CF4] group-hover:bg-white/10 transition-all duration-300">
                        <item.icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-100 group-hover:text-[#6E5CF4] transition-colors duration-300">
                              {item.title}
                            </p>
                            <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#6E5CF4] group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                          {item.subtitle}
                        </p>
                    </div>
                </div>
            </StarBorder>
          ))}
        </div>

        <div className="text-center mt-12 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Pietra Martin</p>
        </div>
      </div>
    </main>
  );
}