export function Projects() {
  const badgeBaseClasses =
    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase text-brand-primary border border-brand-primary/30 bg-brand-primary/10";
  const caseStudies = [
    {
      id: 1,
      title: "UniformesCoach",
      subtitle: "E-commerce Full-Stack e Gestão de Pedidos",
      problem:
        "A venda e encomenda de uniformes ocorria de forma totalmente manual (WhatsApp e planilhas), gerando retrabalho, perda do rastreio de pedidos e falta de visibilidade sobre o estoque e o status de produção.",
      solution:
        "Um sistema web full-stack de catálogo e pedidos, com checkout via integração PIX, acompanhamento de status pelo cliente e um backoffice administrativo robusto para gestão de produtos, estoque e indicadores de vendas.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Supabase (Auth/Storage/DB)",
        "Mercado Pago API",
      ],
      features: [
        "Catálogo inteligente com validação de estoque em tempo real",
        "Carrinho com fluxo automatizado de PIX",
        "Painel administrativo com CRUD",
        "Dashboard analítico com exportação (ExcelJS).",
      ],
      impact:
        "Digitalização de ponta a ponta do fluxo de pedidos, centralizando pagamentos e estoque em uma arquitetura escalável e fornecendo um painel analítico para decisões de negócio.",
    },
    {
      id: 2,
      title: "MedFlow",
      subtitle: "App Nativo iOS para Gestão de Medicamentos",
      contextNote:
        "Aplicativo desenvolvido integralmente como projeto prático para aprendizado autodidata avançado no ecossistema Apple (Swift, SwiftUI e arquiteturas nativas).",
      problem:
        "Pacientes perdem a aderência a tratamentos médicos devido à dificuldade de organizar horários, dosagens e durações em múltiplos medicamentos simultâneos.",
      solution:
        "Um aplicativo nativo iOS offline-first que centraliza o controle do tratamento, gerenciando a agenda de doses com cálculos automáticos e lembretes confiáveis integrados ao sistema.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Combine",
        "SwiftData (Persistência local)",
        "UserNotifications",
      ],
      features: [
        "Cadastro de tratamentos com cálculo autônomo",
        "Busca inteligente de medicamentos via JSON",
        "Orquestração de notificações locais nativas",
        "Sincronização de estado para edição/exclusão.",
      ],
      impact:
        "Elimina a fricção no controle de medicamentos, garantindo a aderência do usuário por meio de uma arquitetura local leve, rápida e com notificações à prova de falhas.",
    },
    {
      id: 3,
      title: "AulaGo",
      subtitle: "App Android Nativo para Governança de Usuários",
      problem:
        "Processos de cadastro manuais e dispersos geram alta taxa de abandono e resultam em um banco de dados de usuários inconsistente para a plataforma educacional.",
      solution:
        "Um aplicativo nativo Android focado na governança de identidade, centralizando a autenticação, integrando fluxos sociais e garantindo a higienização e persistência de dados em nuvem.",
      technologies: [
        "Android SDK",
        "Java",
        "Firebase (Auth/Firestore)",
        "Google Sign-In",
        "REST API (ViaCEP)",
      ],
      features: [
        "Login social e autenticação segura",
        "Onboarding em duas etapas com validações rigorosas (CPF, Data)",
        "Consumo de API para autocompletar endereços",
        "Persistência de perfil em banco NoSQL.",
      ],
      impact:
        "Padronização completa da governança de dados na entrada do usuário, reduzindo o atrito de cadastro e entregando uma base limpa e estruturada.",
    },
  ];

  return (
    <section id="projects" className="scroll-mt-24 py-20 bg-gray-50 bg-surface-primary min-h-screen flex flex-col justify-center overflow-hidden relative transition-colors duration-300">
      
      {/* Background Decorativo Cyberpunk */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <span className={`${badgeBaseClasses} tracking-[0.2em]`}>
            Case Studies
          </span>
          <h2 className="text-4xl gradient-text md:text-5xl font-bold text-gray-900 dark:text-white mb-6 mt-4 transition-colors duration-300">
            Projetos em Destaque <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-yellow bg-clip-text text-transparent"></span>
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto mb-5"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg transition-colors duration-300 space-y-8">
            Estudos de caso completos com problema de negócio, solução aplicada e impacto final de cada sistema.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {caseStudies.map((project) => (
            <article
              key={project.id}
              className="rounded-3xl border border-brand-primary/10 bg-surface-primary shadow-sm p-6 lg:p-10 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-8">
                <header className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`${badgeBaseClasses} tracking-widest`}>
                      {project.title}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-text-primary">
                      {project.subtitle}
                    </h3>
                  </div>

                  {project.contextNote && (
                    <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/10 px-5 py-4 text-sm text-text-secondary">
                      <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                        Contexto/Nota
                      </div>
                      <p className="mt-2 leading-relaxed">{project.contextNote}</p>
                    </div>
                  )}
                </header>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                        O Problema
                      </h4>
                      <p className="mt-2 text-base lg:text-lg text-text-secondary leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                        A Solução
                      </h4>
                      <p className="mt-2 text-base lg:text-lg text-text-secondary leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                        Tecnologias
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium cursor-default
                            text-text-secondary bg-surface-primary
                            border border-transparent
                            [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-primary)_70%,transparent),color-mix(in_srgb,var(--color-accent-cta)_70%,transparent))_border-box]
                            hover:text-text-primary hover:bg-surface-elevated
                            transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                        Funcionalidades
                      </h4>
                      <ul className="mt-3 space-y-2 text-base text-text-secondary list-disc list-inside">
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-accent-cta/30 bg-accent-cta/10 px-5 py-4">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-accent-cta">
                    Impacto
                  </h4>
                  <p className="mt-2 text-base lg:text-lg text-text-secondary leading-relaxed">
                    {project.impact}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    type="button"
                    aria-label="Ver código no GitHub (placeholder)"
                    disabled
                    className="flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-bold transition-all duration-300 text-sm lg:text-base
                    text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20
                    hover:text-accent-cta hover:border-accent-cta hover:bg-accent-cta/10 hover:scale-105
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Ver Código (GitHub)
                  </button>
                  <button
                    type="button"
                    aria-label="Ver demo (placeholder)"
                    disabled
                    className="flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-bold transition-all duration-300 text-sm lg:text-base
                    text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20
                    hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/10 hover:scale-105
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Ver Demo
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}
