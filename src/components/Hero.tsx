import image_code from "../assets/code.jpg";
import { Github, Linkedin } from "lucide-react";
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
  ];
  const primaryCtaClassName = [
    "px-7 py-3 rounded-full font-semibold text-sm sm:text-base",
    "text-text-primary bg-brand-primary/10 border border-brand-primary/40",
    "hover:bg-brand-primary/20 hover:border-brand-primary/70 transition-all",
  ].join(" ");
  const secondaryCtaClassName = [
    "px-6 py-3 rounded-full font-semibold text-sm sm:text-base",
    "text-text-secondary border border-brand-primary/20",
    "hover:text-brand-primary hover:border-brand-primary/60 transition-all",
  ].join(" ");

  return (
    <section
      id="home"
      className="min-h-screen bg-surface-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-7xl mx-auto mt-10 lg:mt-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-5">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {t.hero.headline}
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-3">
              <button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={primaryCtaClassName}
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={secondaryCtaClassName}
              >
                {t.hero.ctaSecondary}
              </button>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-brand-primary/20 text-text-secondary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
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
