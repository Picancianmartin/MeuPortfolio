import coachHome from "../assets/coach-home.png";
import coachCatalogo from "../assets/coach-catalogo.png";
import coachAdmin from "../assets/coach-admin.png";

import medflowCapa from "../assets/medflow-capa.png";
import placeholderImage from "../assets/placeholder.jpg";
import medflowscreen from "../assets/medflow-screen.png";
import medflowAdd from "../assets/medflow-add.png";

import aulagoHome from "../assets/AulaGo/AulaGo.png";
import aulagoBuscar from "../assets/AulaGo/buscar.jpg";
import aulagoPerfil from "../assets/AulaGo/perfil.jpg";

type ProjectCaseStudy = {
  id: string;
  type: "web" | "mobile";
  title: string;
  subtitle: string;
  contextNote?: string;
  problem: string;
  solution: string;
  technologies: string;
  features: string;
  impact: string;
  links?: {
    code?: string;
    demo?: string;
  };
  images: {
    main: CaseStudyImageData;
    thumbnails: [CaseStudyImageData, CaseStudyImageData];
  };
};

type CaseStudyImageData = {
  label: string;
  src: string;
};

const splitList = (text: string) =>
  text
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

const CaseStudyImage = ({
  image,
  priority = false,
  className = "",
}: {
  image: CaseStudyImageData;
  priority?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-100/80 dark:bg-white/5 ${className}`}
    >
      <img
        src={image.src}
        alt={image.label}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-[65%_10%]"
      />
    </div>
  );
};

const projects: ProjectCaseStudy[] = [
  {
    id: "uniformescoach",
    type: "web",
    title: "UniformesCoach",
    subtitle: "E-commerce Full-Stack e Gestão de Pedidos",
    problem:
      "A venda e encomenda de uniformes ocorria de forma totalmente manual (WhatsApp e planilhas), gerando retrabalho, perda do rastreio de pedidos e falta de visibilidade sobre o estoque.",
    solution:
      "Um sistema web full-stack de catálogo e pedidos, com checkout via integração PIX, acompanhamento de status pelo cliente e um backoffice administrativo robusto para gestão de produtos, estoque e indicadores de vendas.",
    technologies:
      "React, Vite, Tailwind CSS, Supabase (Auth/Storage/DB), Mercado Pago API.",
    features:
      "Catálogo inteligente com validação de estoque em tempo real; Carrinho com fluxo automatizado de PIX; Painel administrativo com CRUD; Dashboard analítico com exportação (ExcelJS).",
    impact:
      "Digitalização de ponta a ponta do fluxo de pedidos, centralizando pagamentos e estoque em uma arquitetura escalável e fornecendo um painel analítico para decisões de negócio.",
    links: {
      code: "https://github.com/Picancianmartin/UniformesCoachSite.git",
      demo: "https://www.ctcoachdavidsousa.com.br",
    },
    images: {
      main: {
        label: "Coach David Sousa | Loja Oficial (Início)",
        src: coachHome,
      },
      thumbnails: [
        { label: "Catálogo de Produtos (Vitrine)", src: coachCatalogo },
        { label: "Painel Administrativo (Backoffice)", src: coachAdmin },
      ],
    },
  },
  {
    id: "medflow",
    type: "mobile",
    title: "MedFlow",
    subtitle: "App Nativo iOS para Gestão de Medicamentos",
    contextNote:
      "Aplicativo desenvolvido integralmente como projeto prático para aprendizado autodidata avançado no ecossistema Apple (Swift, SwiftUI e arquiteturas nativas).",
    problem:
      "Pacientes perdem a aderência a tratamentos médicos devido à dificuldade de organizar horários, dosagens e durações em múltiplos medicamentos simultâneos.",
    solution:
      "Um aplicativo nativo iOS offline-first que centraliza o controle do tratamento, gerenciando a agenda de doses com cálculos automáticos e lembretes confiáveis integrados ao sistema.",
    technologies:
      "Swift, SwiftUI, Combine, SwiftData (Persistência local), UserNotifications.",
    features:
      "Cadastro de tratamentos com cálculo autônomo; Busca inteligente de medicamentos via JSON; Orquestração de notificações locais nativas; Sincronização de estado para edição/exclusão.",
    impact:
      "Elimina a fricção no controle de medicamentos, garantindo a aderência do usuário por meio de uma arquitetura local leve, rápida e com notificações à prova de falhas.",
    links: {
      code: "https://github.com/Picancianmartin/MedFlowiOS.git",
      demo: "https://picancianmartin.github.io/MedFlowiOS/",
    },
    images: {
      main: { label: "Lista de Tratamentos", src: medflowCapa },
      thumbnails: [
        { label: "Adicionar Medicamento", src: medflowAdd },
        { label: "Progresso Diário", src: medflowscreen },
      ],
    },
  },
  {
    id: "aulago",
    type: "mobile",
    title: "AulaGo",
    subtitle: "App Android Nativo (Marketplace Educacional)",
    contextNote:
      'MVP de marketplace acadêmico desenvolvido na faculdade com o objetivo de conectar alunos e professores particulares (o "iFood dos idiomas").',
    problem:
      "Alunos têm dificuldade em encontrar e agendar aulas, enquanto professores carecem de uma vitrine digital profissional.",
    solution:
      "Um aplicativo mobile Android nativo que estrutura o cadastro e a conexão entre perfis de professores e alunos, garantindo uma base de dados limpa e padronizada para o marketplace.",
    technologies:
      "Android SDK, Java, Firebase (Auth/Firestore), Google Sign-In, REST API (ViaCEP).",
    features:
      "Login social e autenticação segmentada (Aluno/Professor); Onboarding em duas etapas com validações rigorosas (CPF, Data); Consumo de API ViaCEP para autocompletar endereços; Persistência de dados em banco NoSQL.",
    impact:
      "Estruturou a base técnica e de governança de usuários de um marketplace escalável, resolvendo o atrito de entrada e permitindo conexões seguras no ecossistema educacional.",
    links: {
      code: "https://github.com/Jessica-G-arcia/AulaGo_mobile.git",
      demo: "/lp-aulago",
    },
    images: {
      main: { label: "Login e Onboarding", src: aulagoHome },
      thumbnails: [
        { label: "Listagem de Professores", src: aulagoBuscar },
        { label: "Perfil Detalhado", src: aulagoPerfil },
      ],
    },
  },
];

const placeholderButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-white/15 px-5 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-900/40 cursor-not-allowed opacity-70";

const activeButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-transparent px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-lg shadow-slate-900/10";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 py-20 bg-gray-50 bg-surface-primary min-h-screen flex flex-col justify-center overflow-hidden relative transition-colors duration-300"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Engineering Case Studies
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto mb-5"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg transition-colors duration-300">
            Estudos de caso técnicos que combinam arquitetura de sistemas,
            produto e UI/UX para transformar desafios complexos em soluções
            escaláveis.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-20">
          {projects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            // Definimos as proporções dinamicamente
            // Web: 16/9 ou 4/3 (Horizontal) | Mobile: 9/16 ou 3/4 (Vertical)
            const mainAspect =
              project.type === "web"
                ? "aspect-video"
                : "aspect-[4/3] lg:aspect-[18/10]";
            const thumbAspect =
              project.type === "web" ? "aspect-video" : "aspect-[4/6]";
            return (
              <article key={project.id} className="...">
                <div className="grid gap-8 lg:grid-cols-12 items-start">
                  {/* Coluna das Imagens */}
                  <div
                    className={`flex flex-col gap-4 lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <CaseStudyImage
                      image={project.images.main}
                      priority={index === 0}
                      className={mainAspect} // Usando a variável dinâmica
                    />

                    <div className="grid grid-cols-2 gap-4">
                      {project.images.thumbnails.map((thumb) => (
                        <CaseStudyImage
                          key={`${project.id}-${thumb.label}`}
                          image={thumb}
                          className={thumbAspect} // Usando a variável dinâmica
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    className={`flex flex-col gap-6 lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="space-y-3">
                      <span className="text-xs font-semibold tracking-[0.3em] text-neon-blue uppercase">
                        Case Study
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {project.subtitle}
                      </p>
                    </div>

                    {project.contextNote && (
                      <div className="rounded-2xl border border-neon-blue/30 bg-neon-blue/10 p-4 sm:p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-blue mb-2">
                          Contexto/Nota
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200">
                          {project.contextNote}
                        </p>
                      </div>
                    )}

                    <div className="grid gap-5">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                          O Problema
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                          A Solução
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          {project.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                          Tecnologias
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          {project.technologies}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                          Funcionalidades
                        </h4>
                        <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 space-y-1">
                          {splitList(project.features).map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                          Impacto
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          {project.impact}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.links?.code ? (
                        <a
                          href={project.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={activeButtonClassName}
                        >
                          Ver Código (GitHub)
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className={placeholderButtonClassName}
                        >
                          Ver Código (GitHub)
                        </button>
                      )}

                      {project.links?.demo ? (
                        <a
                          href={project.links.demo}
                          target={
                            project.links.demo.startsWith("/")
                              ? "_self"
                              : "_blank"
                          }
                          rel={
                            project.links.demo.startsWith("/")
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className={activeButtonClassName}
                        >
                          Ver Demo
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className={placeholderButtonClassName}
                        >
                          Ver Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
