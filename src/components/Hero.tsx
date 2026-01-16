import image_code from "../assets/code.jpg";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Instagram,
} from "lucide-react";
import curriculopdf from "../assets/Currículo.pdf";


export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-surface-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="inline-block px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-full gradient-text text-sm font-medium">
              Disponível para Oportunidades
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Desenvolvendo ideias,
              <span className="block gradient-text mt-2 sm:mt-2">
                projetando experiências
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Sou formada em Análise e Desenvolvimento de Sistemas e apaixonada
              por construir produtos úteis. Atuo entre UI/UX e desenvolvimento
              fullstack, criando soluções web e mobile e explorando IA aplicada
              para automatizar tarefas, otimizar processos e apoiar decisões.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
              <button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 sm:px-8 py-3 text-sm sm:text-base rounded-3xl font-bold cursor-pointer min-h-[44px]
             text-text-primary bg-surface-primary
             border border-transparent
             /* A mágica do gradiente na borda: */
             [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-primary)_70%,transparent),color-mix(in_srgb,var(--color-accent-cta)_70%,transparent))_border-box]
             
             /* Efeitos de Hover e Transição */
             hover:scale-105 hover:bg-surface-elevated hover:shadow-lg
             transition-all duration-300"
              >
                Ver Projetos
              </button>
              <a
                href= {curriculopdf}
                download="Pietra_Cancian_Martin_CV.pdf"
                className="group flex items-center gap-2 sm:gap-3 px-3 py-2 transition-all duration-300 hover:scale-105 cursor-pointer min-h-[44px]"
              >
                {/* Círculo sutil atrás do ícone para dar peso visual */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5 flex-shrink-0">
                  <Download
                    size={20}
                    className="text-cyan-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:translate-y-1"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                    Curriculum Vitae
                  </span>
                  <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
                    Download PDF
                  </span>
                </div>
              </a>
            </div>

            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
              <a
                href="https://www.github.com/Picancianmartin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github size={22} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/pietra-cancian-martin/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.instagram.com/piimartin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={22} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="mailto:pietra.cmartin@gmail.com"
                className="p-3 sm:p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail size={22} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full aspect-square max-w-md sm:max-w-lg mx-auto glow-purple-hover rounded-2xl">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-3xl"></div>
              <img
                src={image_code}
                alt="Developer Workspace"
                className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-brand-primary/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
