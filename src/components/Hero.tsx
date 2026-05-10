import image_code from "../assets/code.jpg";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import curriculopdf from "../assets/Currículo.pdf";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../content/translations";

export function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const socialLinks = [
    {
      label: t.hero.socials.github,
      href: "https://www.github.com/Picancianmartin",
      Icon: Github,
    },
    {
      label: t.hero.socials.linkedin,
      href: "https://www.linkedin.com/in/martinpietra/",
      Icon: Linkedin,
    },
    {
      label: t.hero.socials.email,
      href: "mailto:contato@pietramartin.dev",
      Icon: Mail,
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen bg-surface-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-7xl mx-auto mt-10 lg:mt-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-5">
            <div className="inline-block px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-full gradient-text text-sm font-medium">
              {t.hero.badge}
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {t.hero.headline}
              <span className="block gradient-text mt-2">
                {t.hero.headlineHighlight}
              </span>
            </h1>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                  bg-surface-elevated text-text-primary border border-brand-primary/20
                  hover:border-brand-primary/60 hover:text-brand-primary hover:bg-brand-primary/10 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </div>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.summary}
            </p>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-3">
              <button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 sm:py-3 rounded-3xl font-bold cursor-pointer text-base
             text-text-primary bg-surface-primary
             border border-transparent
             /* A mágica do gradiente na borda: */
             [background:linear-gradient(var(--color-surface-primary),var(--color-surface-primary))_padding-box,linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-primary)_70%,transparent),color-mix(in_srgb,var(--color-accent-cta)_70%,transparent))_border-box]
             
             /* Efeitos de Hover e Transição */
             hover:scale-105 hover:bg-surface-elevated hover:shadow-lg
              transition-all duration-300 active:scale-95"
              >
                {t.hero.cta}
              </button>
              <a
                href={curriculopdf}
                download="Pietra_Cancian_Martin_CV.pdf"
                className="group flex items-center gap-3 px-3 py-2 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Círculo sutil atrás do ícone para dar peso visual */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                  <Download
                    size={20}
                    className="text-cyan-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:translate-y-1"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                    {t.hero.cvLabel}
                  </span>
                  <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
                    {t.hero.cvAction}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto glow-purple-hover rounded-2xl">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-3xl"></div>
              <img
                src={image_code}
                alt="Developer Workspace"
                className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-brand-primary/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
