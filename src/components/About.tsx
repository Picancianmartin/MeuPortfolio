import image_me from "../assets/foto-perfil.webp";
import { GraduationCap, Code2, Briefcase, Target, FileText, Download } from "lucide-react";
import { BorderBeam } from "./ui/border-beam";

interface AboutProps {
  /** Mostra os cards de currículo junto dos destaques. Só na página /sobre —
   *  na home o currículo já está nos ícones da hero. */
  mostrarCurriculo?: boolean;
}

export function About({ mostrarCurriculo = false }: AboutProps = {}) {
  const curriculo = [
    {
      icon: FileText,
      title: "Currículo",
      description: "Ver no navegador",
      href: "/curriculo.html",
      target: "_blank",
    },
    {
      icon: Download,
      title: "Currículo (PDF)",
      description: "Baixar o arquivo",
      href: "/curriculo-pietra-martin.pdf",
      download: true,
    },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "Formação Acadêmica",
      description: "ADS (Facens) + MBA em andamento (USP)",
    },
    {
      icon: Code2,
      title: "Desenvolvimento",
      description: "Full Stack com foco em soluções escaláveis",
    },
    {
      icon: Briefcase,
      title: "Experiência",
      description: "Atleta Profissional (8 anos) & Dev",
    },
    {
      icon: Target,
      title: "Objetivo",
      description: "Criar impacto através da tecnologia",
    },
  ];

  return (
    <section
      id="about"
      className="relative z-10 lg:py-32 px-4 sm:px-6 py-20 lg:px-8 bg-surface-primary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 "
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Sobre Mim
          </h2>
          <div className="w-20 h-1 rounded-full bg-[linear-gradient(90deg,var(--color-brand-primary),var(--color-accent-cta))] mx-auto"></div>
        </div>

        <div className="relative lg:grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative flex justify-center glow-purple-hover -mt-12 lg:mt-0 w-full -mb-14 lg:mb-0 aspect-square max-w-lg mx-auto ">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-3xl"></div>
              <img
                src={image_me}
                alt="Pietra Cancian Martin"
                className="relative rounded-2xl shadow-2xl w-80 h-80 lg:w-full lg:h-full object-cover object-top border border-white/10"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-text-secondary mt-10 lg:mt-0 leading-relaxed">
              Como ex-atleta profissional com 8 anos de experiência, entendi que
              o sucesso é fruto de dedicação, colaboração e superação de
              limites. Minha jornada me ensinou o real significado de liderança,
              trabalho em equipe e resiliência sob pressão. Agora, estou
              aplicando a mesma disciplina e paixão no meu desenvolvimento na
              área de tecnologia, um setor que sempre me fascinou. Minha
              capacidade de me comunicar de forma assertiva e de me adaptar a
              novos desafios me prepara para atuar de forma significativa,
              usando a mentalidade de um atleta para superar limites e
              contribuir com o avanço e a inovação tecnológica.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-4 pt-3 lg:pt-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  // AJUSTE 1: 'p-3' deixa o card bem compacto no celular
                  className="relative overflow-hidden p-3 lg:p-6 bg-surface-elevated rounded-xl border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 transition-all hover:shadow-lg glass-effect hover:-translate-y-1"
                >
                  {/* AJUSTE 2: Removi 'size={32}' fixo.
          Usei Tailwind: w-5 h-5 (pequeno no mobile) e lg:w-8 (grande no PC) */}
                  <item.icon className="text-accent-cta mb-2 lg:mb-3 w-5 h-5 lg:w-8 lg:h-8" />

                  {/* AJUSTE 3: Título pequeno (text-sm) no mobile */}
                  <h3
                    className="text-text-primary font-bold mb-1 lg:mb-2 text-lg lg:text-lg"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* AJUSTE 4: Texto minúsculo (text-xs) para caber tudo */}
                  <p className="text-md lg:text-sm text-text-secondary leading-tight">
                    {item.description}
                  </p>
                  <BorderBeam size={60} duration={6} delay={index * 0.6} />
                </div>
              ))}

              {mostrarCurriculo &&
                curriculo.map((item, index) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    download={item.download}
                    className="relative overflow-hidden p-3 lg:p-6 bg-surface-elevated rounded-xl border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 transition-all hover:shadow-lg glass-effect hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cta/60"
                  >
                    <item.icon className="text-accent-cta mb-2 lg:mb-3 w-5 h-5 lg:w-8 lg:h-8" />
                    <h3
                      className="text-text-primary font-bold mb-1 lg:mb-2 text-lg lg:text-lg"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-md lg:text-sm text-text-secondary leading-tight">
                      {item.description}
                    </p>
                    <BorderBeam
                      size={60}
                      duration={6}
                      delay={(highlights.length + index) * 0.6}
                    />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
