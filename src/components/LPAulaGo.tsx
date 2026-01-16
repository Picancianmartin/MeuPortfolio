import React, { useState, useEffect } from "react";

import LogoAulaGo from "@/assets/Logo-AulaGo.png";
import buscar from "@/assets/AulaGo/buscar.jpg";
import calendario from "@/assets/AulaGo/calendario.jpg";
import home from "@/assets/AulaGo/home.jpg";

// --- INTERFACES (Tipagem dos dados) ---
interface Plan {
  name: string;
  price: string;
  period?: string; // O '?' significa que é opcional
  desc: string;
  features: string[];
  highlight: boolean;
}

interface FaqItem {
  q: string;
  a: string;
}

// --- CONFIGURAÇÃO VISUAL ---
const colors = {
  orange: "#FB8501",
  blue: "#219EBC",
  darkBlue: "#023047",
  lightBlue: "#8ECAE6",
  grayBg: "#F9FAFB",
};

// --- ÍCONES ---
// Correção Erro 1: Adicionada tipagem para props ({ className: string })
const Icons = {
  Check: () => (
    <svg
      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  ),
  Star: () => (
    <svg
      className="w-6 h-6 text-yellow-400 mr-2"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  ChevronDown: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 6.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  Profile: () => (
    <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        opacity=".3"
      />
      <circle cx="18" cy="6" r="3" className="text-green-400" />
    </svg>
  ),
  Chat: () => (
    <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  ),
  ClassSuccess: () => (
    <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  ),
  CreditCard: () => (
    <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM2 8h20v2H2V8zm0 10v-6h20v6H2z" />
    </svg>
  ),
  professor: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      {/* Ícone representando uma apresentação/aula */}
      <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h4v2h8v-2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z" />
      <path d="M6 7h12v7H6z" opacity=".3" />
    </svg>
  ),
  Student: () => (
    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      {/* Ícone de Capelo (Formatura) */}
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  ),
};

// --- DADOS ---
// Correção Erro 4: Tipagem explicita do objeto
const plansData: Record<"professor" | "student", Plan[]> = {
  professor: [
    {
      name: "Básico",
      price: "Grátis",
      desc: "Ideal para começar a ensinar",
      features: [
        "Perfil na plataforma",
        "Até 30 aulas/mês",
        "Taxa de 5% por aula",
        "Suporte e-mail (Horário C.)",
      ],
      highlight: false,
    },
    {
      name: "Intermediário",
      price: "R$ 49,90",
      period: "/mês",
      desc: "Para crescer sua carreira",
      features: [
        "Todos do Básico",
        "Até 60 aulas/mês",
        "Prioridade no ranking",
        "Suporte WhatsApp",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "R$ 89,90",
      period: "/mês",
      desc: "Para professores de elite",
      features: [
        "Todos do Intermediário",
        "Aulas ilimitadas",
        "Taxa reduzida (4%)",
        "Destaque na Home",
        "Suporte 24/7",
      ],
      highlight: false,
    },
  ],
  student: [
    {
      name: "Start",
      price: "Grátis",
      desc: "Para conhecer a plataforma",
      features: ["Acesso aos professores", "Até 5 aulas/mês", "Suporte básico"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "R$ 29,90",
      period: "/mês",
      desc: "Foco total no aprendizado",
      features: [
        "Agendamento prioritário",
        "Até 10 aulas/mês",
        "Suporte via WhatsApp",
        "Materiais exclusivos",
      ],
      highlight: true,
    },
    {
      name: "Unlimited",
      price: "R$ 59,90",
      period: "/mês",
      desc: "Imersão completa",
      features: [
        "Aulas ilimitadas",
        "Agendamento recorrente",
        "Suporte 24/7",
        "Clube de benefícios",
      ],
      highlight: false,
    },
  ],
};

// Correção Erro 10: Tipagem explicita do objeto
const faqData: Record<"professor" | "student", FaqItem[]> = {
  student: [
    {
      q: "Como as aulas acontecem?",
      a: "Você e o professor decidem! Pode ser online (via Google Meet, Zoom, Skype) ou presencial, dependendo da disponibilidade combinada no chat.",
    },
    {
      q: "E se o professor cancelar?",
      a: "Sua segurança é prioridade. O valor da aula é estornado integralmente para sua carteira na plataforma ou devolvido ao seu cartão.",
    },
    {
      q: "Posso assistir a aula pelo celular?",
      a: "Sim! Nossa plataforma é responsiva. Porém, para uma melhor experiência de aprendizado, recomendamos o uso de computador ou tablet.",
    },
    {
      q: "O pagamento é seguro?",
      a: "Totalmente. Usamos gateways de pagamento criptografados. O professor só recebe o valor após a confirmação de que a aula aconteceu.",
    },
  ],
  professor: [
    {
      q: "Quanto custa para anunciar?",
      a: "Zero. Você não paga nada para criar seu perfil. Cobramos apenas uma pequena taxa administrativa sobre as aulas que você realmente vender.",
    },
    {
      q: "Como recebo meus ganhos?",
      a: "Os valores ficam disponíveis na sua Dashboard financeira e você pode solicitar o saque via PIX a qualquer momento (prazo de até 24h úteis).",
    },
    {
      q: "Sou obrigado a seguir um material?",
      a: "Não! A AulaGo preza pela sua autonomia. Você é livre para utilizar sua própria metodologia e materiais didáticos.",
    },
    {
      q: "Como funciona o ranking?",
      a: "Professores com perfil completo, resposta rápida no chat e boas avaliações dos alunos ganham destaque automático na busca.",
    },
  ],
};

const LPAulaGo = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Correção Erro 4 e 10: Definindo que esse estado só aceita essas duas strings exatas
  const [planType, setPlanType] = useState<"professor" | "student">(
    "professor"
  );
  const [faqTab, setFaqTab] = useState<"professor" | "student">("student");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Correção Erro 2: Tipando o evento nativo do DOM
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 0 && !localStorage.getItem("modalShown")) {
        setShowModal(true);
        localStorage.setItem("modalShown", "true");
      }
    };
    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, []);

  // Correção Erro 3: Tipando o index
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const activeColor = planType === "professor" ? colors.orange : colors.blue;

  return (
    <div className="font-sans text-gray-800 antialiased overflow-x-hidden bg-white scroll-smooth">
      {/* --- NAVBAR --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-6 px-6 flex justify-between items-center">
          {/* Botão Voltar ao Portfólio */}
          <a
            href="/#projects" // Seu link do GitHub/Portfólio
            className={`flex items-center gap-2 text-sm font-bold transition-all group ${
              scrolled
                ? "text-gray-500 hover:text-orange-600"
                : "text-white/80 hover:text-white"
            }`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar ao Portfólio
          </a>
          {/* 1. LOGO */}

          <a href="#">
            <img
              src={LogoAulaGo}
              alt="AulaGo"
              className={`h-12 w-auto object-contain transition-all duration-300 ${
                !scrolled ? "brightness-0 invert" : ""
              }`}
            />
          </a>

          {/* 2. MENU CENTRAL (Corrigido para aceitar acentos) */}
          <div className="hidden md:flex p-4 space-x-6">
            {[
              { label: "Plataforma", id: "plataforma" },
              { label: "Como Funciona", id: "como-funciona" },
              { label: "Benefícios", id: "beneficios" }, // Label com acento, ID sem!
              { label: "Planos", id: "planos" },
              { label: "FAQ", id: "faq" },
              //   { label: 'Quem Somos', id: 'quem-somos' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-semibold hover:text-[${
                  colors.orange
                }] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-orange-500 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full ${
                  scrolled ? "text-gray-600" : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 3. LADO DIREITO (Botão CTA) */}
          <div className="hidden md:flex items-center ">
            {/* Botão Principal */}
            <a
              href="#planos"
              className={`px-4 py-2 rounded-full text-sm font-bold text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                scrolled
                  ? "bg-orange-500"
                  : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
              }`}
            >
              Começar Agora
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        </div>

        <div className="container relative z-10 px-6 text-center text-white">
          <span className="uppercase tracking-widest text-xs font-bold mb-4 block opacity-80 animate-fade-in">
            Educação sem fronteiras
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            Conecte-se ao futuro do <br /> ensino de{" "}
            <span style={{ color: colors.orange }}>idiomas</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 font-light opacity-90 max-w-2xl mx-auto">
            A plataforma que une professores talentosos a alunos dedicados, com
            segurança, praticidade e tecnologia de ponta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-100">
            <a
              href="#planos"
              className="px-8 py-4 rounded-full font-bold text-white shadow-xl hover:-translate-y-1 transition-transform transform"
              style={{ backgroundColor: colors.orange }}
            >
              Sou Professor
            </a>
            <a
              href="#planos"
              onClick={() => setPlanType("student")}
              className="px-8 py-4 rounded-full font-bold text-white shadow-xl hover:-translate-y-1 transition-transform transform"
              style={{ backgroundColor: colors.blue }}
            >
              Sou Aluno
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES (Plataforma) --- */}
      <section id="plataforma" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Soluções Reais
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded mb-4"
              style={{ backgroundColor: colors.orange }}
            ></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Eliminamos a burocracia para que você foque no que importa: a
              aula.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Card Professor */}
            <div
              className="bg-white p-10 rounded-3xl shadow-lg border-t-4 hover:shadow-2xl transition-all duration-300 group"
              style={{ borderColor: colors.orange }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: colors.orange }}
              >
                <Icons.professor />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Para Professores
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <Icons.Check /> Agenda automatizada e inteligente
                </li>
                <li className="flex items-center">
                  <Icons.Check /> Pagamentos garantidos
                </li>
                <li className="flex items-center">
                  <Icons.Check /> Resumo financeiro acadêmico
                </li>
              </ul>
            </div>

            {/* Card Aluno */}
            <div
              className="bg-white p-10 rounded-3xl shadow-lg border-t-4 hover:shadow-2xl transition-all duration-300 group"
              style={{ borderColor: colors.blue }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: colors.blue }}
              >
                <Icons.Student />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Para Alunos
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <Icons.Check /> Filtre por preço e metodologia
                </li>
                <li className="flex items-center">
                  <Icons.Check /> Aulas online ou presenciais
                </li>
                <li className="flex items-center">
                  <Icons.Check /> Professores verificados e avaliados
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- STEPS (Como Funciona) --- */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Jornada Simplificada
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                title: "1. Busca",
                icon: <Icons.Search />,
                desc: "Filtre por idioma, preço e nível.",
              },
              {
                title: "2. Perfil",
                icon: <Icons.Profile />,
                desc: "Analise avaliações e experiências.",
              },
              {
                title: "3. Chat",
                icon: <Icons.Chat />,
                desc: "Tire dúvidas antes de agendar.",
              },
              {
                title: "4. Agenda",
                icon: <Icons.Calendar />,
                desc: "Escolha o melhor dia e horário.",
              },
              {
                title: "5. Aula",
                icon: <Icons.ClassSuccess />,
                desc: "Pagamento seguro e aula garantida.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-3xl hover:bg-gray-50 transition-all duration-300 text-center border border-transparent hover:border-gray-100 h-full flex flex-col items-center"
              >
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-100 -z-10 transform -translate-x-1/2"></div>
                )}
                <div
                  className="w-20 h-20 mx-auto rounded-2xl rotate-3 hover:rotate-6 flex items-center justify-center text-white mb-6 shadow-lg shadow-gray-200 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                  style={{
                    backgroundColor:
                      idx % 2 === 0 ? colors.blue : colors.orange,
                  }}
                >
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold mb-3 text-gray-800">
                  {step.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENEFITS --- */}
      <section id="beneficios" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Por que a AulaGo?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 hover:bg-gray-800 rounded-2xl transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-3xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-500">
                Autonomia Total
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Você define seus horários, sua metodologia e o valor da sua
                hora/aula. Use o material didático que preferir e dê aulas onde
                quiser.
              </p>
            </div>
            <div className="p-6 border-l border-r border-gray-800 hover:bg-gray-800 rounded-2xl transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-3xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                Gestão & Dashboard
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Tenha acesso a um <strong>Dashboard exclusivo</strong>. Controle
                seus agendamentos e receba pagamentos integrados com segurança.
              </p>
            </div>
            <div className="p-6 hover:bg-gray-800 rounded-2xl transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-3xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-500">
                Credibilidade
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Construa sua reputação através do nosso sistema de{" "}
                <strong>avaliações verificadas</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PLANOS --- */}
      <section
        id="planos"
        className="py-24 bg-gray-50 relative overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: activeColor }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos que cabem no bolso
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Escolha a modalidade ideal para o seu momento.
            </p>

            <div className="inline-flex bg-white p-1.5 rounded-full shadow-inner border border-gray-200 relative mb-8">
              <div
                className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gray-900 rounded-full transition-all duration-500 ease-in-out shadow-md"
                style={{
                  left: planType === "professor" ? "6px" : "50%",
                  backgroundColor: activeColor,
                }}
              ></div>
              <button
                onClick={() => setPlanType("professor")}
                className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 w-40 ${
                  planType === "professor"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sou Professor
              </button>
              <button
                onClick={() => setPlanType("student")}
                className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 w-40 ${
                  planType === "student"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sou Aluno
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {plansData[planType].map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl transition-all duration-300 flex flex-col h-full relative group ${
                  plan.highlight
                    ? "shadow-2xl ring-4 ring-opacity-50 scale-105 z-10"
                    : "shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 opacity-90 hover:opacity-100"
                }`}
                // Correção Erro 7: 'as React.CSSProperties' permite variaveis CSS customizadas
                style={
                  { "--tw-ring-color": activeColor } as React.CSSProperties
                }
              >
                {plan.highlight && (
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-sm"
                    style={{ backgroundColor: colors.darkBlue }}
                  >
                    Mais Escolhido
                  </div>
                )}
                <div
                  className={`p-8 text-center border-b border-gray-50 ${
                    plan.highlight ? "bg-gray-50/50" : ""
                  } rounded-t-3xl`}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 h-10 flex items-center justify-center">
                    {plan.desc}
                  </p>
                  <div className="flex justify-center items-baseline text-gray-900">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 ml-1 text-sm font-medium">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {/* Correção Erro 8 e 9: Tipagem implicita resolvida automaticamente pois Plan[] já está tipado */}
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-gray-600 group-hover:text-gray-900 transition-colors"
                      >
                        <Icons.Check />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg hover:brightness-110 active:scale-95"
                    style={{
                      backgroundColor: plan.highlight
                        ? activeColor
                        : colors.darkBlue,
                    }}
                  >
                    {plan.price === "Grátis"
                      ? "Cadastrar Grátis"
                      : "Selecionar Plano"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ficou com alguma dúvida?
            </h2>
            <p className="text-gray-600">
              Separamos as perguntas mais comuns para te ajudar.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
              <button
                onClick={() => {
                  setFaqTab("student");
                  setOpenFaq(-1);
                }}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  faqTab === "student"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                style={{
                  backgroundColor:
                    faqTab === "student" ? colors.blue : "transparent",
                }}
              >
                Sou Aluno
              </button>
              <button
                onClick={() => {
                  setFaqTab("professor");
                  setOpenFaq(-1);
                }}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  faqTab === "professor"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                style={{
                  backgroundColor:
                    faqTab === "professor" ? colors.orange : "transparent",
                }}
              >
                Sou Professor
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Correção Erro 10, 11 e 12: Tipagem resolvida pelo Record<> no faqData */}
            {faqData[faqTab].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaq === idx
                    ? "shadow-md border-transparent"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-8 py-5 text-left font-bold text-gray-800 flex justify-between items-center focus:outline-none group"
                >
                  <span
                    className={`group-hover:text-[${
                      faqTab === "student" ? colors.blue : colors.orange
                    }] transition-colors`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                    style={{
                      color: faqTab === "student" ? colors.blue : colors.orange,
                    }}
                  >
                    <Icons.ChevronDown className="w-5 h-5" />
                  </span>
                </button>

                <div
                  className={`px-8 transition-all duration-300 ease-in-out ${
                    openFaq === idx
                      ? "max-h-40 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500">
              Ainda precisa de ajuda?
              <a
                href=""
                className="font-bold ml-1 hover:underline"
                style={{ color: colors.orange }}
              >
                Fale com nosso suporte
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* --- QUEM SOMOS ---
      <section id="quem-somos" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-16">Quem faz acontecer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: "Beatriz Silva", role: "Full Stack & QA", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
                  { name: "Gabriela Oliveira", role: "Product Owner", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
                  { name: "Jéssica Garcia", role: "Scrum Master", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
                  { name: "Pietra Martin", role: "Dev & Requisitos", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" }
                ].map((member, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                        <div className="w-28 h-28 mx-auto mb-4 rounded-full p-1 border-2" style={{ borderColor: colors.blue }}>
                            <img src={member.img} alt={member.name} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <h4 className="font-bold text-lg">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section> */}
      {/* --- APP SHOWCASE (Com Blur no fundo da legenda ao passar o mouse) --- */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">
              Preview
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Por dentro da <span style={{ color: colors.blue }}>AulaGo</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Uma interface intuitiva projetada para conectar e organizar sua
              jornada de ensino.
            </p>
          </div>

          {/* Grid de Celulares */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center lg:pb-12">
            {/* TELA 1 - Esquerda (Busca) */}
            <div className="relative group w-64 md:w-72">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 rounded-[2rem] border-[8px] border-gray-900 shadow-xl transform md:-rotate-6 hover:rotate-0 transition-all duration-500 overflow-hidden">
                <div className="h-6 w-32 bg-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl z-20"></div>

                <img
                  src={buscar}
                  alt="Tela de busca de alunos mostrando perfis e objetivos"
                  className=" w-full h-auto object-cover opacity-95 transition-[filter,transform,opacity] duration-500 ease-out group-hover:opacity-100 group-hover:blur-[1px] group-hover:brightness-75 group-hover:saturate-90 group-hover:scale-[1.01] "
                />

                {/* Overlay centralizado */}
                <div
                  className=" absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 scale-[0.99] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none backdrop-blur-[2px] bg-black/5 "
                >
                  <div className="px-6 max-w-[90%]">
                    <p className="text-white font-extrabold text-xl mb-4">
                      Encontre Alunos/Professores
                    </p>
                    <p className="text-white text-md font-semibold leading-relaxed">
                      Filtre por nível e objetivos para o match perfeito.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TELA 2 - Home - Destaque */}
            <div className="relative group w-72 md:w-80 z-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="h-7 w-36 bg-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl z-20"></div>

                <img
                  src={home}
                  alt="Página home do Professor mostrando resumo e alunos destaque"
                  className="w-full h-auto object-cover"
                />

                {/* Overlay com Blur Effect (backdrop-blur-md) */}
                <div
                  className=" absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 scale-[0.99] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none backdrop-blur-[2px] bg-black/35 "
                >
                  <div className="px-6 max-w-[90%]">
                    <p className="text-white font-extrabold text-2xl mb-4">
                      Página inicial
                    </p>
                    <p className="text-white text-md font-semibold  leading-relaxed">
                      Visão geral dos idiomas, ranking de destaque e próximos
                      aulas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TELA 3 - Direita (Calendário) */}
            <div className="relative group w-64 md:w-72">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 rounded-[2rem] border-[8px] border-gray-900 shadow-xl transform md:rotate-6 hover:rotate-0 transition-all duration-500 overflow-hidden">
                <div className="h-6 w-32 bg-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl z-20"></div>

                <img
                  src={calendario}
                  alt="Tela de calendário mostrando agendamentos do mês"
                  className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                />

                {/* Overlay com Blur Effect (backdrop-blur-md) */}
                <div
                  className=" absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 scale-[0.99] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none backdrop-blur-[2px] bg-black/35 "
                >
                  <div className="px-6 max-w-[90%]"></div>
                  <p className="text-white font-extrabold text-2xl mb-4">
                    Agenda Organizada
                  </p>
                  <p className="text-white text-md font-semibold leading-relaxed">
                    Visualize suas aulas do mês com facilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Link para o GitHub */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Quer ver mais detalhes do código?
            </p>
            <a
              href="https://github.com/Jessica-G-arcia/AulaGo_mobile.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Ver Código no GitHub
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img
                src={LogoAulaGo}
                alt="AulaGo"
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  !scrolled ? "brightness-0 invert" : ""
                }`}
              />
              <p className="text-sm mt-2">
                Tecnologia transformando a educação.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800 text-xs text-gray-500">
            © 2025 AulaGo Inc. Sorocaba, SP.
          </div>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative p-8 text-center animate-scale-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icons.Close />
            </button>
            <div className="mb-6 inline-flex p-4 rounded-full bg-orange-100 text-orange-600 shadow-sm">
              <Icons.Star />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">
              Presente Especial! 🎁
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre-se agora e ganhe{" "}
              <strong>3 meses de Plano Premium</strong> para turbinar suas
              aulas.
            </p>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Enviado com sucesso!");
                setShowModal(false);
              }}
            >
              <input
                type="text"
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                style={{ backgroundColor: colors.blue }}
              >
                QUERO MEU PRESENTE
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-400">
              Sem spam. Cancelamento gratuito.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LPAulaGo;
