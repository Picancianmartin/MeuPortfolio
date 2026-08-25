import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  XCircle,
  X,
  ChevronUp,
  Github,
  Linkedin,
  Instagram,
  FileText,
  Download,
} from "lucide-react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { fill } from "three/src/extras/TextureUtils.js";
import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
import logoClaro from "../assets/logo-claro.svg";
import logoEscuro from "../assets/logo-escuro.svg";
import { BorderBeam } from "./ui/border-beam";
import { TIMEOUT_ENVIO_MS, WEBHOOK_CONTATO } from "../data/webhooks";
import { rastrear } from "../lib/rastreio";

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

  const WhatsAppIcon = ({ size = 24, className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Anti-autofill persistente
  const [armadilha, setArmadilha] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resposta = await fetch(WEBHOOK_CONTATO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          assunto: formData.subject,
          mensagem: formData.message,
          // Campo-armadilha: humano não vê, robô preenche. O n8n descarta.
          empresa: armadilha,
          origem: "portfolio/contato",
        }),
        signal: AbortSignal.timeout(TIMEOUT_ENVIO_MS),
      });
      if (!resposta.ok) throw new Error(`webhook respondeu ${resposta.status}`);
      rastrear("contato_enviou");

      showToast({
        type: "success",
        title: "Mensagem enviada!",
        message: "Obrigada 😊 Em breve entrarei em contato.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setArmadilha("");
      setFormKey((k) => k + 1);
      (document.activeElement as HTMLElement | null)?.blur();
    } catch (falha) {
      // Sem isto o motivo real (fora do ar, CORS, tempo esgotado) desaparece.
      console.error("[contato] falha no envio:", falha);
      showToast({
        type: "error",
        title: "Não foi possível enviar",
        message: "Tente novamente ou me chame no WhatsApp.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "contato@pietramartin.dev",
      link: "mailto:contato@pietramartin.dev",
    },
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      value: "+55 (15) 99241-6473",
      link: "https://wa.me/5515992416473",
      fill: "currentColor",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Localização",
      value: "Sorocaba, SP - Brasil",
      link: null,
    },
  ];

  const resumeLinks = [
    {
      icon: FileText,
      title: "Currículo",
      value: "Ver currículo",
      link: "/curriculo.html",
      target: "_blank",
    },
    {
      icon: Download,
      title: "Currículo (PDF)",
      value: "Baixar PDF",
      link: "/curriculo-pietra-martin.pdf",
      download: true,
    },
  ];

  return (
    <>
      {/* --- SEÇÃO DE CONTATO --- */}
      <section
        id="contact"
        className="scroll-mt-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary mb-16 lg:mb-0"
      >
        {/* TOAST NOTIFICATION */}
        {toast && (
          <div
            className="fixed top-6 right-6 z-[9999] w-[calc(100%-3rem)] sm:w-[420px]"
            aria-live="polite"
          >
            <div
              className={`relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10
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
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
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
            <div className="w-20 h-1 rounded-full bg-[linear-gradient(90deg,var(--color-brand-primary),var(--color-accent-cta))] mx-auto"></div>
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
                    className="relative overflow-hidden flex items-start gap-4 p-6 bg-surface-elevated rounded-xl border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 transition-all glass-effect hover:shadow-lg"
                  >
                    <div className="p-3 bg-accent-cta/10 rounded-lg border border-accent-cta/20">
                      <item.icon className="text-accent-cta" size={24} />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-bold mb-1">
                        {item.title}
                      </h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-text-secondary hover:text-accent-cta transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{item.value}</p>
                      )}
                    </div>
                    <BorderBeam size={70} duration={6} delay={index * 0.6} />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {resumeLinks.map((item, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden flex items-start gap-4 p-6 bg-surface-elevated rounded-xl border border-zinc-200 dark:border-white/10 hover:border-accent-cta/40 transition-all glass-effect hover:shadow-lg"
                  >
                    <div className="p-3 bg-accent-cta/10 rounded-lg border border-accent-cta/20">
                      <item.icon className="text-accent-cta" size={24} />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-bold mb-1">
                        {item.title}
                      </h4>
                      <a
                        href={item.link}
                        target={item.target}
                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                        download={item.download}
                        className="text-text-secondary hover:text-accent-cta transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                    <BorderBeam size={70} duration={6} delay={index * 0.6} />
                  </div>
                ))}
              </div>
            </div>

            {/* Direita: Formulário */}
            <div className="relative overflow-hidden bg-surface-elevated -mt-8 lg:mt-0 rounded-xl p-8 border border-zinc-200 dark:border-white/10 glass-effect">
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
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-zinc-200 dark:border-white/10 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-cta transition-all disabled:opacity-50"
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
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-zinc-200 dark:border-white/10 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-cta transition-all disabled:opacity-50"
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
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-zinc-200 dark:border-white/10 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-cta transition-all disabled:opacity-50"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="contato-empresa">Não preencha este campo</label>
                    <input
                      id="contato-empresa"
                      name="empresa"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={armadilha}
                      onChange={(e) => setArmadilha(e.target.value)}
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
                    className="w-full px-4 py-4 sm:py-3 text-base bg-[var(--input-background)] border border-zinc-200 dark:border-white/10 rounded-lg text-text-primary placeholder-text-secondary transition-all focus:outline-none focus:border-accent-cta resize-none disabled:opacity-50"
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
              <BorderBeam size={300} duration={8} />
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
                  },
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
                    href: "https://linkedin.com/in/martinpietra",
                    label: "LinkedIn",
                  },
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/piimartin",
                    label: "Instagram",
                  },
                  {
                    Icon: WhatsAppIcon, // <-- ATUALIZADO AQUI
                    href: "https://wa.me/5515992416473?text=Olá,%20Pietra!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar.",
                    label: "WhatsApp",
                  },
                ].map(({ Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Dica extra de UI: Adicionei a cor verde padrão do WhatsApp no hover apenas para ele
                    className={`text-zinc-600 dark:text-zinc-400 transition-colors ${
                      label === "WhatsApp"
                        ? "hover:text-[#25D366]"
                        : "hover:text-cyan-600 dark:hover:text-cyan-400"
                    }`}
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </a>
                ))}
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

              {/* Assinatura discreta: link para contato */}
              <a
                href="#contact"
                title="Site desenvolvido por Pietra Cancian Martin — fale comigo para o seu projeto"
                aria-label="Site desenvolvido por Pietra Cancian Martin"
                className="opacity-40 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={logoClaro}
                  alt="Assinatura Pietra Cancian Martin"
                  className="h-5 w-auto dark:hidden"
                />
                <img
                  src={logoEscuro}
                  alt="Assinatura Pietra Cancian Martin"
                  className="h-5 w-auto hidden dark:block"
                />
              </a>

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
