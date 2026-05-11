import {
  ClipboardList,
  Map,
  PenTool,
  Code2,
  Bug,
  Rocket,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../content/translations";

const icons = [ClipboardList, Map, PenTool, Code2, Bug, Rocket];

export function WorkProcess() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="process"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {t.workProcess.title}
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            {t.workProcess.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.workProcess.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div
                key={step.title}
                className="p-6 rounded-2xl border border-brand-primary/20 bg-surface-elevated glass-effect hover:border-brand-primary/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                    <Icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-sm font-semibold text-text-secondary">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
