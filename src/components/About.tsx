import image_me from "../assets/foto.jpeg";
import { GraduationCap, Code2, Briefcase, Target } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../content/translations";

export function About() {
  const { language } = useLanguage();
  const t = translations[language];

  const highlights = [
    {
      icon: GraduationCap,
      title: t.about.highlights[0].title,
      description: t.about.highlights[0].description,
    },
    {
      icon: Code2,
      title: t.about.highlights[1].title,
      description: t.about.highlights[1].description,
    },
    {
      icon: Briefcase,
      title: t.about.highlights[2].title,
      description: t.about.highlights[2].description,
    },
    {
      icon: Target,
      title: t.about.highlights[3].title,
      description: t.about.highlights[3].description,
    },
  ];

  return (
    <section
      id="about"
      className="relative z-10 lg:py-32 px-4 sm:px-6 py-20 lg:px-8 bg-surface-primary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 "
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {t.about.title}
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="relative lg:grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative flex justify-center glow-purple-hover -mt-12 lg:mt-0 w-full -mb-14 lg:mb-0 aspect-square max-w-lg mx-auto ">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-3xl"></div>
              <img
                src={image_me}
                alt="Technology"
                className="relative rounded-2xl shadow-2xl w-80 h-80 lg:w-full lg:h-full object-cover border border-brand-primary/30"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-lg text-text-secondary mt-10 lg:mt-0 leading-relaxed">
              <p>{t.about.body}</p>
              <p>{t.about.athlete}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-4 pt-3 lg:pt-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  // AJUSTE 1: 'p-3' deixa o card bem compacto no celular
                  className="p-3 lg:p-6 bg-surface-elevated rounded-xl border border-brand-primary/20 hover:border-brand-primary/50 transition-all hover:shadow-lg glass-effect glow-purple-hover hover:-translate-y-1"
                >
                  {/* AJUSTE 2: Removi 'size={32}' fixo. 
          Usei Tailwind: w-5 h-5 (pequeno no mobile) e lg:w-8 (grande no PC) */}
                  <item.icon className="text-brand-primary mb-2 lg:mb-3 w-5 h-5 lg:w-8 lg:h-8" />

                  {/* AJUSTE 3: Título pequeno (text-sm) no mobile */}
                  <h3
                    className="text-text-primary font-bold mb-1 lg:mb-2 text-lg lg:text-lg"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* AJUSTE 4: Texto minúsculo (text-xs) para caber tudo */}
                  <p className="text-md lg:text-sm text-text-secondary leading-tight">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
