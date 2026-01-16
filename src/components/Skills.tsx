import {
  Code2,
  Server,
  PenTool,
  Target,
  Users,
  Brain,
  Zap,
} from "lucide-react"; // Ícones para cada categoria

export function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      icon: Code2,
      skills: [
        "React",
        "TypeScript",
        "SwiftUI",
        "HTML5",
        "Swift",
        "JavaScript",
        "Bootstrap",
      ],
    },
    {
      category: "Backend",
      icon: Server,
      skills: [
        "Node.js",
        "Python",
        "Supabase",
        "REST APIs",
        "Java",
        "Firebase",
      ],
    },
    {
      category: "Ferramentas",
      icon: PenTool,
      skills: [
        "GitHub",
        "XCode",
        "VS Code",
        "Figma",
        "Scrum",
        "UI/UX",
        "Android Studio",
        "Canva",
      ],
    },
  ];

  // Soft Skills (Comportamentais)
  const softSkills = [
    {
      icon: Target,
      title: "Disciplina & Foco",
      description:
        "Mindset de atleta: consistência diária e busca por excelência.",
    },
    {
      icon: Users,
      title: "Trabalho em Equipe",
      description: "Facilidade em colaborar e crescer junto com o time.",
    },
    {
      icon: Brain,
      title: "Resolução de Problemas",
      description: "Pensamento analítico para desafios complexos.",
    },
    {
      icon: Zap,
      title: "Adaptabilidade",
      description: "Rapidez para aprender novas tecnologias e processos.",
    },
  ];

  const cardStyle =
    "p-6 rounded-xl glass-effect outline-gradient outline-gradient-hover transition-all";
  const iconBoxStyle =
    "p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20 flex-shrink-0";

  return (
    <section
      id="skills"
      className="py-10 lg:py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Habilidades
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            Hard Skills (Stack Técnica) & Soft Skills (Comportamental)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 -mt-10 lg:mt-0 lg:grid-cols-3 gap-4 lg:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              // AJUSTE 1: p-5 no mobile (mais espaço útil) vs p-8 no PC
              className="rounded-xl p-5 lg:p-8 glass-effect outline-gradient outline-gradient-hover
      transition-all hover:-translate-y-1"
            >
              {/* Título do Card com Ícone */}
              {/* AJUSTE 2: Margens e Gaps menores no mobile */}
              <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6 pb-3 lg:pb-4 border-b border-brand-primary/10">
                {/* Ícone responsivo: w-5 (20px) mobile / w-6 (24px) PC */}
                <category.icon className="text-brand-primary w-5 h-5 lg:w-6 lg:h-6" />

                <h3
                  // AJUSTE 3: Fonte menor no título mobile (text-lg)
                  className="text-lg lg:text-xl font-bold text-text-primary"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {category.category}
                </h3>
              </div>

              {/* Container das Pills */}
              {/* AJUSTE CRÍTICO: gap-2 no mobile (antes estava 8, ficava muito espalhado) */}
              <div className="col-span-1 flex flex-wrap gap-2 lg:gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    // AJUSTE 4: Tags menores (text-xs e menos padding) no mobile
                    className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium cursor-default
              text-text-secondary bg-surface-primary
              border border-transparent
              [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-primary)_70%,transparent),color-mix(in_srgb,var(--color-accent-cta)_70%,transparent))_border-box]
              hover:text-text-primary hover:bg-surface-elevated
              transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-8 pt-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3">
          <span className="w-10 h-1 bg-brand-primary rounded-full sm:hidden"></span>{" "}
          {/* Linha decorativa mobile */}
          Diferenciais
          <span className="w-full h-px bg-brand-primary/20 ml-4 hidden sm:block"></span>{" "}
          {/* Linha decorativa desktop */}
        </h3>

        {/* 1. Grid: 2 colunas no mobile (grid-cols-2) para ficar compacto lado a lado */}
        {/* 2. Gap: gap-3 no mobile (bem juntinho) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
          {softSkills.map((skill) => (
            <div
              key={skill.title}
              // AJUSTE: Troquei ${cardStyle} por classes manuais para controlar o padding
              // p-3 (mobile) vs lg:p-6 (PC)
              className="p-3 lg:p-6 bg-surface-elevated rounded-xl border border-brand-primary/20 hover:border-brand-primary/50 transition-all hover:shadow-lg glass-effect hover:-translate-y-1 flex flex-col items-start gap-2 lg:gap-4"
            >
              {/* Wrapper do ícone (se iconBoxStyle tiver padding, talvez precise ajustar, mas o principal é o ícone) */}
              <div className={iconBoxStyle}>
                {/* Ícone menor no mobile (w-5 h-5) */}
                <skill.icon className="text-brand-primary w-5 h-5 lg:w-6 lg:h-6" />
              </div>

              <div>
                <h4
                  // Título menor (text-sm)
                  className="text-text-primary font-bold mb-1 lg:mb-2 text-lg lg:text-base"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {skill.title}
                </h4>
                <p className="text-md lg:text-sm text-text-secondary leading-tight">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
