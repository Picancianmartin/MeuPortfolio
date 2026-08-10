import { Github, Linkedin, Instagram, FileText, Download } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

export function Hero() {
  const { theme } = useTheme();
  const WhatsAppIcon = ({ size = 24 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-surface-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-7xl mx-auto mt-10 lg:mt-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-5">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-block px-4 py-2 bg-accent-cta/10 border border-accent-cta/30 rounded-full text-accent-cta text-sm font-medium"
            >
              Disponível para Oportunidades
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Desenvolvendo ideias,
              <span className="block gradient-text mt-2">
                projetando experiências
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Sou formada em Análise e Desenvolvimento de Sistemas e apaixonada
              por construir produtos úteis. Atuo entre UI/UX e desenvolvimento
              fullstack, criando soluções web e mobile e explorando IA aplicada
              para automatizar tarefas, otimizar processos e apoiar decisões.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 justify-center lg:justify-start pt-3">
              <button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 sm:py-3 rounded-3xl font-bold cursor-pointer text-base
             text-text-primary bg-surface-primary
             border border-transparent
             /* A mágica do gradiente na borda: */
             [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-primary)_70%,transparent),color-mix(in_srgb,var(--color-accent-cta)_70%,transparent))_border-box]
             
             /* Efeitos de Hover e Transição */
             hover:scale-105 hover:bg-surface-elevated hover:shadow-lg
             transition-all duration-300 active:scale-95"
              >
                Ver Projetos
              </button>

              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 sm:py-3 rounded-3xl font-bold cursor-pointer text-base
             text-[#091636] bg-accent-cta
             border border-transparent shadow-lg shadow-accent-cta/30
             hover:bg-accent-cta/90 hover:scale-105 hover:shadow-xl hover:shadow-accent-cta/40
             transition-all duration-300 active:scale-95"
              >
                Fale Comigo
              </button>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-4 justify-center lg:justify-start pt-4">
              <a
                href="https://www.github.com/Picancianmartin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-4 bg-surface-elevated hover:bg-accent-cta/10 text-text-primary hover:text-accent-cta rounded-lg transition-all border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 active:scale-95"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/martinpietra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-4 bg-surface-elevated hover:bg-accent-cta/10 text-text-primary hover:text-accent-cta rounded-lg transition-all border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 active:scale-95"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/piimartin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-4 bg-surface-elevated hover:bg-accent-cta/10 text-text-primary hover:text-accent-cta rounded-lg transition-all border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 active:scale-95"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://wa.me/5515992416473?text=Olá,%20Pietra!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais%20sobre%20."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface-elevated hover:bg-accent-cta/10 text-text-primary hover:text-accent-cta rounded-lg transition-all border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 active:scale-95"
              >
                <WhatsAppIcon />
              </a>
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <a
                href="/curriculo.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/30 text-accent-cta text-sm font-medium hover:bg-accent-cta/20 transition-colors"
              >
                <FileText size={16} />
                Ver currículo
              </a>
              <a
                href="/curriculo-pietra-martin.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cta/10 border border-accent-cta/30 text-accent-cta text-sm font-medium hover:bg-accent-cta/20 transition-colors"
              >
                <Download size={16} />
                Baixar PDF
              </a>
            </motion.div>
          </div>

          {/* Logo */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-brand-primary/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative w-full max-w-md drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                whileHover={{ scale: 1.03 }}
              >
                <AnimatedLogo
                  theme={theme}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
