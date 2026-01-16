import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  XCircle,
  X,
  ChevronUp,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import emailjs from "@emailjs/browser";

type ToastType = "success" | "error";

type ToastState = {
  open: boolean;
  type: ToastType;
  title: string;
  message?: string;
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Anti-autofill persistente

  // Toast state
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<number | null>(null);

  const currentYear = new Date().getFullYear();

  const closeToast = () => {
    setToast((prev) => (prev ? { ...prev, open: false } : null));
  };

  const showToast = (t: Omit<ToastState, "open">) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ open: true, ...t });
    toastTimer.current = window.setTimeout(() => {
      closeToast();
    }, 4200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!toast) return;
    if (!toast.open) {
      const t = window.setTimeout(() => setToast(null), 250);
      return () => window.clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        "service_2j1cwaa",
        "template_f8ipf24",
        templateParams,
        "qPUaabFaIxmMGcytP"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        showToast({
          type: "success",
          title: "Mensagem enviada!",
          message: "Obrigada 😊 Em breve entrarei em contato.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFormKey((k) => k + 1);
        (document.activeElement as HTMLElement | null)?.blur();
      })
      .catch((err) => {
        console.log("FAILED...", err);
        showToast({
          type: "error",
          title: "Não foi possível enviar",
          message: "Tente novamente ou use o e-mail direto.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contato@pietramartin.dev",
      link: "mailto:contato@pietramartin.dev",
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (15) 991762066",
      link: "tel:+5515991762066",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "Sorocaba, SP - Brasil",
      link: null,
    },
  ];

  return (
    <>
      {/* --- SEÇÃO DE CONTATO --- */}
      <section
        id="contact"
        className="lg:py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary mb-16 lg:mb-0"
      >
        {/* TOAST NOTIFICATION */}
        {toast && (
          <div
            className="fixed top-6 right-6 z-[9999] w-[calc(100%-3rem)] sm:w-[420px]"
            aria-live="polite"
          >
            <div
              className={`relative overflow-hidden rounded-2xl border border-brand-primary/20
                bg-surface-primary/95 backdrop-blur-xl shadow-2xl
                transition-all duration-200
                ${
                  toast.open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }
              `}
              role={toast.type === "error" ? "alert" : "status"}
            >
              <div
                className={
                  toast.type === "success"
                    ? "absolute left-0 top-0 h-full w-1.5 bg-accent-cta"
                    : "absolute left-0 top-0 h-full w-1.5 bg-[var(--destructive)]"
                }
              />

              <div className="flex gap-3 p-4 pl-5">
                <div className="mt-0.5">
                  {toast.type === "success" ? (
                    <CheckCircle2 className="text-accent-cta" size={22} />
                  ) : (
                    <XCircle className="text-[var(--destructive)]" size={22} />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-bold text-text-primary">{toast.title}</p>
                  {toast.message && (
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={closeToast}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-brand-primary/10 transition-all"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Header da Seção */}
          <div className="text-center mb-20">
            <h2
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              Entre em Contato
            </h2>
            <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
            <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
              Estou sempre aberta a novas oportunidades e colaborações
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Esquerda: Informações de Contato */}
            <div className="lg:space-y-8 -mt-6 lg:mt-0">
              <div>
                <h3
                  className="text-2xl font-bold text-text-primary mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Vamos conversar!
                </h3>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Se você está procurando uma desenvolvedora dedicada e
                  apaixonada por tecnologia, ficarei feliz em conversar sobre
                  como posso contribuir para seu projeto ou equipe.
                </p>
              </div>

              <div className="space-y-4 hidden lg:block">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-surface-elevated rounded-xl border border-brand-primary/20 hover:border-brand-primary/50 transition-all glass-effect glow-purple-hover"
                  >
                    <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                      <item.icon className="text-brand-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-bold mb-1">
                        {item.title}
                      </h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-text-secondary hover:text-brand-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direita: Formulário */}
            <div className="bg-surface-elevated -mt-8 lg:mt-0 rounded-xl p-8 border border-brand-primary/20 glass-effect">
              <form
                key={formKey}
                onSubmit={handleSubmit}
                autoComplete="off"
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-text-primary font-medium mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all disabled:opacity-50"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-text-primary font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all disabled:opacity-50"
                    placeholder="seu@email.com"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-text-primary font-medium mb-2"
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all disabled:opacity-50"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-text-primary font-medium mb-2"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows={5}
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary transition-all focus:outline-none focus:border-brand-primary resize-none disabled:opacity-50"
                    placeholder="Sua mensagem..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                  className={`w-full px-8 py-5 sm:py-4 font-bold text-base rounded-lg transition-all
                  flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105
                  disabled:opacity-80 disabled:cursor-not-allowed
                  bg-accent-cta hover:bg-accent-cta/90 text-white
                  active:scale-95 relative overflow-hidden`}
                >
                  {isLoading && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0
                               animate-[shimmer_1.1s_infinite]"
                    />
                  )}

                  {isLoading ? (
                    <div className="relative flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span className="tracking-wide">
                        Enviando
                        <span className="loading-dots">
                          <span />
                          <span />
                          <span />
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="relative flex items-center gap-2">
                      <Send size={20} />
                      Enviar Mensagem
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- RODAPÉ (FOOTER) --- */}
      <footer className="bg-zinc-50 dark:bg-[#0f172a] border-t border-zinc-200 dark:border-white/10 pt-12 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* 1. Identidade */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors">
                Pietra Cancian Martin
                {/* O ponto usa a cor da marca (Cyan/Azul) adaptada para leitura */}
                <span className="text-cyan-600 dark:text-cyan-400">.</span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-sm transition-colors">
                Desenvolvedora focada em criar experiências digitais únicas e
                funcionais.
              </p>
            </div>

            {/* 2. Links Rápidos */}
            <div>
              <h4 className="text-zinc-900 dark:text-white font-semibold mb-4 transition-colors">
                Navegação
              </h4>
              <ul className="space-y-2">
                {["Início", "Sobre", "Habilidades", "Projetos", "Contato"].map(
                  (item) => {
                    // Mapeamento simples para hrefs
                    const hrefs: Record<string, string> = {
                      Início: "#home",
                      Sobre: "#about",
                      Habilidades: "#skills",
                      Projetos: "#projects",
                      Contato: "#contact",
                    };
                    return (
                      <li key={item}>
                        <a
                          href={hrefs[item]}
                          className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>

            {/* 3. Redes Sociais */}
            <div>
              <h4 className="text-zinc-900 dark:text-white font-semibold mb-4 transition-colors">
                Conecte-se
              </h4>

              <div className="flex gap-4">
                {[
                  {
                    Icon: Github,
                    href: "https://github.com/Picancianmartin",
                    label: "GitHub",
                  },
                  {
                    Icon: Linkedin,
                    href: "https://linkedin.com/in/pietra-cancian-martin",
                    label: "LinkedIn",
                  },
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/piimartin",
                    label: "Instagram",
                  },
                  { Icon: Mail, scrollTo: "contact", label: "Email" }, // <- aqui
                ].map(({ Icon, href, scrollTo, label }) => {
                  const baseClass =
                    "p-3 rounded-full transition-all duration-300 " +
                    "bg-zinc-200 dark:bg-white/5 " +
                    "text-zinc-700 dark:text-zinc-400 " +
                    "hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white " +
                    "active:scale-90";

                  // Caso especial: Email faz scroll (não mailto)
                  if (scrollTo) {
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          document.getElementById(scrollTo)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                        }
                        className={baseClass}
                        aria-label="Ir para o formulário de contato"
                      >
                        <Icon size={20} />
                      </button>
                    );
                  }

                  // Links normais (externos)
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClass}
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Linha Divisória */}
          <div className="border-t border-zinc-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
            <p className="text-zinc-500 dark:text-zinc-500 text-sm text-center md:text-left">
              © {currentYear} Pietra Martin. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-6">
              <span className="text-zinc-500 text-sm hidden md:block">
                Feito com React & Tailwind CSS
              </span>

              {/* Botão Voltar ao Topo */}
              <button
                onClick={scrollToTop}
                className="p-3 rounded-lg transition-all duration-300 group
                     bg-zinc-200 dark:bg-white/5 
                     text-zinc-700 dark:text-zinc-400
                     hover:bg-cyan-500 hover:text-white active:scale-90"
                aria-label="Voltar ao topo"
              >
                <ChevronUp
                  size={20}
                  className="group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
