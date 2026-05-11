const ptContent = {
  nav: {
    home: "Início",
    about: "Sobre",
    skills: "Stack",
    process: "Processo",
    projects: "Projetos",
    contact: "Contato",
  },
  hero: {
    headline: "Desenvolvedora de Sistemas & UI Designer",
    subheadline:
      "Crio aplicações web, dashboards e sistemas sob medida para transformar processos manuais em soluções digitais eficientes.",
    ctaPrimary: "Ver Projetos",
    ctaSecondary: "Entrar em Contato",
    socials: {
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  about: {
    title: "Sobre Mim",
    body:
      "Sou desenvolvedora de sistemas com foco em aplicações web, interfaces funcionais e soluções digitais para negócios. Tenho experiência com frontend, backend, banco de dados e prototipação de interfaces.",
    athlete:
      "Minha trajetória de 8 anos no esporte de alto rendimento fortaleceu minha disciplina, visão estratégica e capacidade de resolver problemas complexos sob pressão.",
    highlights: [
      {
        title: "Formação",
        description: "Análise e Desenv. de Sistemas (Facens)",
      },
      {
        title: "Sistemas",
        description: "Web, mobile e dashboards sob medida",
      },
      {
        title: "Disciplina",
        description: "Foco e consistência em entregas",
      },
      {
        title: "Estratégia",
        description: "Visão de negócio aplicada ao produto",
      },
    ],
  },
  skills: {
    title: "Stack & Habilidades",
    subtitle: "Domínios organizados para arquitetura de sistemas.",
    categories: {
      frontend: "Frontend",
      backend: "Backend & Sistemas",
      database: "Banco de Dados",
      automation: "Automação & Workflows",
      design: "Design & Ferramentas",
    },
    differentiators: "Diferenciais",
    softSkills: [
      {
        title: "Disciplina",
        description: "Rotina consistente e entregas previsíveis.",
      },
      {
        title: "Visão Estratégica",
        description: "Foco em soluções com impacto no negócio.",
      },
      {
        title: "Resolução de Problemas",
        description: "Análise crítica sob prazos apertados.",
      },
      {
        title: "Comunicação",
        description: "Alinhamento claro com times e clientes.",
      },
    ],
  },
  workProcess: {
    title: "Processo de Trabalho",
    subtitle: "Do diagnóstico ao deploy com clareza e ritmo.",
    steps: [
      {
        title: "Entendimento",
        description: "Levantamento das necessidades e objetivos.",
      },
      {
        title: "Planejamento",
        description: "Definição de fluxos, arquitetura e tecnologias.",
      },
      {
        title: "Design",
        description: "Criação da interface (UI/UX) e protótipos.",
      },
      {
        title: "Desenvolvimento",
        description: "Frontend, backend, banco de dados e integrações.",
      },
      {
        title: "Testes",
        description: "Correção de bugs e responsividade.",
      },
      {
        title: "Entrega",
        description: "Deploy e documentação.",
      },
    ],
  },
  projects: {
    title: "Projetos & Case Studies",
    subtitle: "Cada projeto mostra o problema, a solução e o impacto no negócio.",
    swipe: "Deslize",
    inDevelopment: "Em desenvolvimento",
    viewProject: "Ver Projeto",
    code: "Código",
    design: "Design",
    wipSoon: "Em breve",
    labels: {
      problem: "O Problema",
      solution: "A Solução",
      technologies: "Tecnologias Usadas",
      features: "Funcionalidades Principais",
      impact: "Resultado/Impacto",
      links: "Links",
      uiScreens: "Telas do Sistema",
    },
  },
  contact: {
    title:
      "Tem uma ideia de sistema, dashboard ou aplicativo? Vamos transformar isso em uma solução digital funcional.",
    links: {
      email: "Email",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
    },
    copyright: (year: number) =>
      `© ${year} Pietra Martin. Todos os direitos reservados.`,
  },
} as const;

export const translations = {
  pt: ptContent,
} as const;
