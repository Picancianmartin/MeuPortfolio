import {
  ExternalLink,
  Github,
  Image as ImageIcon,
  LayoutGrid,
} from "lucide-react";
import imageMedFlow from "../assets/MedFlowCapa.png";
import agcapa from "../assets/agCapa.png";
import placeholderImage from "../assets/placeholder.jpg";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../content/translations";

interface CaseStudy {
  id: number;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  impact: string;
  links: {
    demo?: string;
    github?: string;
    ui?: string;
  };
  images: {
    main: string;
    screens: string[];
  };
}

export function Projects() {
  const { language } = useLanguage();
  const t = translations[language];

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "MedFlow iOS",
      summary:
        "Aplicativo nativo para organização de medicações com foco em confiabilidade de agendamentos.",
      problem:
        "Pacientes tinham dificuldade em manter horários de medicação e precisavam de lembretes consistentes mesmo com o app em background.",
      solution:
        "Aplicação iOS nativa com gerenciamento avançado de estado em background, histórico de uso e notificações recorrentes.",
      technologies: ["Swift", "SwiftUI", "iOS", "Xcode"],
      features: [
        "Agenda inteligente de medicamentos",
        "Histórico e acompanhamento diário",
        "Notificações recorrentes confiáveis",
        "Fluxo rápido de cadastro",
      ],
      impact:
        "Reduz esquecimentos e melhora a aderência ao tratamento com lembretes estáveis.",
      links: {
        demo: "https://picancianmartin.github.io/MedFlowiOS/",
        github: "https://github.com/Picancianmartin/MedFlowiOS.git",
      },
      images: {
        main: imageMedFlow,
        screens: [placeholderImage, placeholderImage, placeholderImage],
      },
    },
    {
      id: 2,
      title: "AulaGo",
      summary:
        "Sistema multiplataforma para conectar professores e alunos com agendas escaláveis.",
      problem:
        "Professores autônomos precisavam de um fluxo claro para captar alunos, organizar horários e manter comunicação centralizada.",
      solution:
        "Arquitetura web responsiva com módulos de agenda, perfis e comunicação para gestão completa de aulas.",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      features: [
        "Agenda com horários disponíveis",
        "Cadastro de professores e alunos",
        "Fluxo de inscrição simplificado",
        "Painel de acompanhamento",
      ],
      impact:
        "Organiza a operação do professor e melhora a conversão de novos alunos.",
      links: {
        demo: "/lp-aulago",
        github: "https://github.com/Jessica-G-arcia/AulaGo_mobile.git",
      },
      images: {
        main: agcapa,
        screens: [placeholderImage, placeholderImage, placeholderImage],
      },
    },
    {
      id: 3,
      title: "BeachMatch",
      summary:
        "Plataforma mobile-first para arenas esportivas com gestão multi-tenant.",
      problem:
        "Arenas e clubes precisavam organizar quadras, torneios e perfis de jogadores em um único ecossistema.",
      solution:
        "Sistema mobile-first com multi-tenancy, lógica de torneios e feed social integrado ao backend.",
      technologies: ["React", "Supabase", "PostgreSQL", "Mobile-first"],
      features: [
        "Gestão de arenas e quadras",
        "Torneios com tabelas automatizadas",
        "Feed social e comunidades",
        "Perfis e rankings de atletas",
      ],
      impact:
        "Centraliza operações e facilita a escala de múltiplas arenas com dados consistentes.",
      links: {},
      images: {
        main: placeholderImage,
        screens: [placeholderImage, placeholderImage, placeholderImage],
      },
    },
    {
      id: 4,
      title: "UniformesCoach",
      summary:
        "E-commerce full stack para uniformes com pagamentos regionais e Supabase.",
      problem:
        "Times precisavam de uma experiência de compra rápida e pagamentos locais sem fricção.",
      solution:
        "Sistema web com checkout integrado a Pix/Mercado Pago, catálogo responsivo e backend Supabase.",
      technologies: ["React", "Supabase", "Pix", "Mercado Pago"],
      features: [
        "Catálogo responsivo por categoria",
        "Checkout com Pix e Mercado Pago",
        "Painel de pedidos e estoque",
        "Integrações regionais",
      ],
      impact:
        "Aumenta conversão e reduz abandono de carrinho com pagamentos locais.",
      links: {},
      images: {
        main: placeholderImage,
        screens: [placeholderImage, placeholderImage, placeholderImage],
      },
    },
  ];

  return (
    <section
      id="projects"
      className="scroll-mt-24 py-20 lg:py-32 bg-surface-primary"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t.projects.title}
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="rounded-2xl border border-brand-primary/20 bg-surface-elevated p-6 lg:p-8 glass-effect"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-text-primary">
                  {study.title}
                </h3>
                <p className="text-text-secondary">{study.summary}</p>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                      {t.projects.labels.problem}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                      {t.projects.labels.solution}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                      {t.projects.labels.technologies}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium text-text-secondary border border-brand-primary/20"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                      {t.projects.labels.features}
                    </h4>
                    <ul className="grid gap-2 text-sm text-text-secondary list-disc list-inside">
                      {study.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                      {t.projects.labels.impact}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {study.impact}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-brand-primary/20">
                    <img
                      src={study.images.main}
                      alt={`Tela principal ${study.title}`}
                      className="w-full h-52 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-3">
                      {t.projects.labels.uiScreens}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {study.images.screens.map((screen, index) => (
                        <div
                          key={`${study.title}-screen-${index}`}
                          className="rounded-lg overflow-hidden border border-brand-primary/10"
                        >
                          <img
                            src={screen}
                            alt={`Tela ${index + 1} ${study.title}`}
                            className="w-full h-20 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-3">
                      {t.projects.labels.links}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {study.links.demo && (
                        <a
                          href={study.links.demo}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-brand-primary/20 text-sm text-text-secondary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                      {study.links.github && (
                        <a
                          href={study.links.github}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-brand-primary/20 text-sm text-text-secondary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                      {study.links.ui && (
                        <a
                          href={study.links.ui}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-brand-primary/20 text-sm text-text-secondary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
                        >
                          <ImageIcon size={16} />
                          UI
                        </a>
                      )}
                      {!study.links.demo && !study.links.github && !study.links.ui && (
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-brand-primary/10 text-sm text-text-secondary/70">
                          <LayoutGrid size={16} />
                          Links em breve
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
