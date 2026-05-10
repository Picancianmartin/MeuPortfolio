import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../content/translations";

export function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-surface-primary border-t border-brand-primary/20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto py-20 text-center space-y-6">
        <p
          className="text-2xl sm:text-3xl font-bold text-text-primary"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {t.contact.title}
        </p>

        <a
          href="mailto:contato@pietramartin.dev"
          className="inline-flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
        >
          <Mail size={24} />
          contato@pietramartin.dev
        </a>

        <div className="flex items-center justify-center gap-2 text-text-secondary text-sm sm:text-base">
          <MapPin size={16} className="text-brand-primary" />
          <span>{t.contact.location}</span>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <a
            href="https://github.com/Picancianmartin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 text-text-primary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/martinpietra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 text-text-primary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-text-secondary pt-4">
          {t.contact.copyright.replace("{year}", String(currentYear))}
        </p>
      </div>
    </footer>
  );
}
