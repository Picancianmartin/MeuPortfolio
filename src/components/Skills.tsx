import { Code2, Server, PenTool, Target, Users, Brain, Zap } from 'lucide-react'; // Ícones para cada categoria

export function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      icon: Code2,
      skills: [
        'React',
        'TypeScript',
        'SwiftUI',
        'HTML5',
        'Swift',
        'JavaScript',
        'Bootstrap',

      ],
    },
    {
      category: 'Backend',
      icon: Server,
      skills: [
        'Node.js',
        'Python',
        'Supabase',
        'REST APIs',
        'Java',
        'Firebase',
      ],
    },
    {
      category: 'Ferramentas',
      icon: PenTool,
      skills: [
        'GitHub',
        'XCode',
        'VS Code',
        'Figma',
        'Scrum',
        'UI/UX',
        'Android Studio',
        'Canva',
      ],
    },
  ];

  // Soft Skills (Comportamentais)
  const softSkills = [
    {
      icon: Target,
      title: 'Disciplina & Foco',
      description: 'Mindset de atleta: consistência diária e busca por excelência.',
    },
    {
      icon: Users,
      title: 'Trabalho em Equipe',
      description: 'Facilidade em colaborar e crescer junto com o time.',
    },
    {
      icon: Brain,
      title: 'Resolução de Problemas',
      description: 'Pensamento analítico para desafios complexos.',
    },
    {
      icon: Zap,
      title: 'Adaptabilidade',
      description: 'Rapidez para aprender novas tecnologias e processos.',
    },
  ];

  const cardStyle =
  "p-6 rounded-xl glass-effect outline-gradient outline-gradient-hover transition-all";
const iconBoxStyle = "p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20 flex-shrink-0";


  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
            Habilidades
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            Hard Skills (Stack Técnica) & Soft Skills (Comportamental)
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="rounded-xl p-8 glass-effect outline-gradient outline-gradient-hover
              transition-all hover:-translate-y-1"
            >
              {/* Título do Card com Ícone */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-brand-primary/10">
                <category.icon className="text-brand-primary" size={24} />
                <h3 className="text-xl font-bold text-text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {category.category}
                </h3>
              </div>
              
              {/* Container das Pills */}
              <div className="col-span-1 flex flex-wrap gap-8">
                {category.skills.map((skill) => (
                 <span
                 key={skill}
                 className="px-4 py-1.5 rounded-full text-sm font-medium cursor-default
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
             <span className="w-10 h-1 bg-brand-primary rounded-full sm:hidden"></span> {/* Linha decorativa mobile */}
             Diferenciais
             <span className="w-full h-px bg-brand-primary/20 ml-4 hidden sm:block"></span> {/* Linha decorativa desktop */}
          </h3>

          <div className="grid lg:grid-cols-4 gap-8 ">
            {softSkills.map((skill) => (
              <div key={skill.title} className={`${cardStyle} flex flex-col items-start gap-4 hover:-translate-y-1 transition-all`}>
                <div className={iconBoxStyle}>
                  <skill.icon className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {skill.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
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