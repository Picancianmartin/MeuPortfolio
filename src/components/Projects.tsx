import coachHome from "../assets/coach-home.png";
import coachCatalogo from "../assets/coach-catalogo.png";
import coachAdmin from "../assets/coach-admin.png";

import medflowCapa from "../assets/medflow-capa.webp";
import placeholderImage from "../assets/placeholder.jpg";
import medflowscreen from "../assets/medflow-screen.png";
import medflowAdd from "../assets/medflow-add.png";
import carlosHome from "../assets/carlos-home.webp";
import carlosEspecialidades from "../assets/carlos-especialidades.png";
import carlosDepoimentos from "../assets/carlos-FAQ.png";

import aulagoHome from "../assets/AulaGo/AulaGo.png";
import aulagoBuscar from "../assets/AulaGo/buscar.jpg";
import aulagoPerfil from "../assets/AulaGo/perfil.jpg";

import { useState } from "react";
import { Expand, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageLightbox } from "./ImageLightbox";

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

const splitTechnologies = (text: string) =>
  text
    .replace(/\.$/, "")
    .split(",")
    .flatMap((item) => item.split(" e "))
    .map((item) => item.trim())
    .filter(Boolean);

const CaseStudyImage = ({
  image,
  priority = false,
  className = "",
  onClick,
}: {
  image: CaseStudyImageData;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ampliar imagem: ${image.label}`}
      className={`group relative block w-full appearance-none p-0 m-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-100/80 dark:bg-white/5 cursor-zoom-in text-left ${className}`}
    >
      <img
        src={image.src}
        alt={image.label}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-[65%_10%] transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-white/15 backdrop-blur-sm text-white">
          <Expand size={20} />
        </span>
      </div>
    </button>
  );
};

const projects: ProjectCaseStudy[] = [
  {
    id: "carlosmartin",
    type: "web",
    title: "Psicólogo Carlos Martin",
    subtitle: "Landing Page Premium & Automação n8n",
    problem:
      "Criar uma presença digital de alto valor para um psicólogo clínico, que transmitisse extrema confiança e facilitasse a conversão de pacientes. Havia também a necessidade de um sistema de prova social (depoimentos) dinâmico, mas sem a complexidade e o custo de manutenção de um backend tradicional.",
    solution:
      "Desenvolvimento de uma SPA (Single Page Application) moderna focada em conversão, com UI premium e animações fluidas. A arquitetura dispensou um backend tradicional ao integrar webhooks do n8n para orquestrar um fluxo dinâmico de captura, revisão e exibição de depoimentos em tempo real.",
    technologies:
      "React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Radix UI e n8n.",
    features:
      "Sistema dinâmico de depoimentos (GET/POST) automatizado via webhooks (n8n); UI Premium com animações de scroll e parallax utilizando Framer Motion; FAQ interativo, acessível e otimizado com componentes Radix UI; UX focada em conversão com CTAs flutuantes e direcionamento direto para WhatsApp.",
    impact:
      "Elevação imediata do valor percebido da clínica. A automação da prova social eliminou o trabalho manual de atualização do site, enquanto a interface de alta performance otimizou a jornada de captação e conversão de novos pacientes.",
    links: {
      demo: "https://www.psicologocarlosmartin.com.br",
    },
    images: {
      main: {
        label: "Página Inicial (Hero Section)",
        src: carlosHome,
      },
      thumbnails: [
        { label: "Seção de Especialidades", src: carlosEspecialidades },
        { label: "Prova Social Dinâmica", src: carlosDepoimentos },
      ],
    },
  },
  {
    id: "uniformescoach",
    type: "web",
    title: "UniformesCoach",
    subtitle: "E-commerce Full-Stack e Gestão de Pedidos",
    problem:
      "As vendas eram feitas manualmente (WhatsApp e planilhas), gerando desorganização nos pedidos, retrabalho e falta de controle do estoque.",
    solution:
      "E-commerce web full-stack com catálogo em tempo real, checkout automatizado via PIX e um painel administrativo para gestão de produtos e vendas.",
    technologies: "React, Vite, Tailwind CSS, Supabase (Auth/Storage/DB).",
    features:
      "Catálogo inteligente com validação de estoque em tempo real; Carrinho com fluxo automatizado de PIX; Painel administrativo com CRUD; Dashboard analítico com exportação (ExcelJS).",
    impact:
      "Automatizou o processo de vendas da loja, eliminando o trabalho manual e centralizando o controle de estoque e pagamentos.",
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
      "App desenvolvido do zero para aprofundamento técnico no ecossistema Apple (Swift e SwiftUI).",
    problem:
      "Pacientes se perdem e abandonam tratamentos por não conseguirem organizar horários e dosagens de vários medicamentos ao mesmo tempo.",
    solution:
      "App iOS nativo e offline-first que calcula automaticamente a agenda de doses e dispara notificações locais confiáveis.",
    technologies:
      "Swift, SwiftUI, Combine, SwiftData (Persistência local), UserNotifications.",
    features:
      "Cadastro de tratamentos com cálculo autônomo; Busca inteligente de medicamentos via JSON; Orquestração de notificações locais nativas; Sincronização de estado para edição/exclusão.",
    impact:
      "Facilita a rotina médica do usuário com um aplicativo leve, rápido e que não depende de internet para alertar sobre os horários.",
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
      'MVP acadêmico criado para ser o "iFood dos idiomas", conectando alunos a professores particulares.',
    problem:
      "Alunos têm dificuldade em encontrar professores de idiomas, e professores não têm um espaço focado e profissional para oferecer suas aulas.",
    solution:
      "App Android nativo com sistema de autenticação, perfis detalhados e busca estruturada para conectar os dois públicos.",
    technologies:
      "Android SDK, Java, Firebase (Auth/Firestore), Google Sign-In, REST API (ViaCEP).",
    features:
      "Login social e autenticação segmentada (Aluno/Professor); Onboarding em duas etapas com validações rigorosas (CPF, Data); Consumo de API ViaCEP para autocompletar endereços; Persistência de dados em banco NoSQL.",
    impact:
      "Criou um ambiente digital padronizado e seguro que facilita o agendamento de aulas e o contato no ecossistema educacional.",
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

interface ProjectsProps {
  /** Quantos case studies mostrar. Sem limite, mostra todos. */
  limite?: number;
  /** Exibe o link para a página com todos os projetos. */
  linkVerTodos?: boolean;
  /** Título e texto de apoio do bloco. */
  titulo?: string;
  descricao?: string;
}

export function Projects({
  limite,
  linkVerTodos = false,
  titulo = "Case Studies",
  descricao = "Estudos de caso técnicos que combinam arquitetura de sistemas, produto e UI/UX para transformar desafios complexos em soluções escaláveis.",
}: ProjectsProps = {}) {
  const projetosVisiveis = limite ? projects.slice(0, limite) : projects;

  const [lightbox, setLightbox] = useState<{
    projectId: string;
    index: number;
  } | null>(null);

  const activeProject = projects.find((p) => p.id === lightbox?.projectId);
  const activeImages = activeProject
    ? [activeProject.images.main, ...activeProject.images.thumbnails]
    : [];

  return (
    <section
      id="projects"
      className="scroll-mt-24 py-20 bg-gray-50 bg-surface-primary min-h-screen flex flex-col justify-center overflow-hidden relative transition-colors duration-300"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-accent-cta/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            {titulo}
          </h2>
          <div className="w-20 h-1 rounded-full bg-[linear-gradient(90deg,var(--color-brand-primary),var(--color-accent-cta))] mx-auto mb-5"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg transition-colors duration-300">
            {descricao}
          </p>
        </div>

        <div className="space-y-12 lg:space-y-20">
          {projetosVisiveis.map((project, index) => {
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
                      onClick={() =>
                        setLightbox({ projectId: project.id, index: 0 })
                      }
                    />

                    <div className="grid grid-cols-2 gap-4">
                      {project.images.thumbnails.map((thumb, thumbIndex) => (
                        <CaseStudyImage
                          key={`${project.id}-${thumb.label}`}
                          image={thumb}
                          className={thumbAspect} // Usando a variável dinâmica
                          onClick={() =>
                            setLightbox({
                              projectId: project.id,
                              index: thumbIndex + 1,
                            })
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    className={`flex flex-col gap-6 lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="space-y-3">
                      <span className="text-xs font-semibold tracking-[0.3em] text-accent-cta uppercase">
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
                      <div className="rounded-2xl border border-accent-cta/30 bg-accent-cta/10 p-4 sm:p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-cta mb-2">
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
                        <div className="flex flex-wrap gap-2">
                          {splitTechnologies(project.technologies).map(
                            (tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center rounded-full border border-accent-cta/30 bg-accent-cta/10 px-3 py-1 text-xs sm:text-sm font-medium text-accent-cta"
                              >
                                {tech}
                              </span>
                            ),
                          )}
                        </div>
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

        {linkVerTodos && projects.length > projetosVisiveis.length && (
          <div className="mt-14 text-center">
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 rounded-full border border-accent-cta/40 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent-cta hover:text-accent-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cta/50"
            >
              Ver os {projects.length} projetos
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      <ImageLightbox
        images={activeImages}
        index={lightbox ? lightbox.index : null}
        onClose={() => setLightbox(null)}
        onNavigate={(newIndex) =>
          setLightbox((current) =>
            current ? { ...current, index: newIndex } : current,
          )
        }
      />
    </section>
  );
}
