import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../content/translations";

export function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();
  const whatsappLink = "https://wa.me/5515999999999";

  return (
    <footer
      id="contact"
      className="bg-surface-primary border-t border-brand-primary/20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto py-20 text-center space-y-8">
        <p
          className="text-2xl sm:text-3xl font-bold text-text-primary"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {t.contact.title}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:contato@pietramartin.dev"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-primary/40 text-text-primary hover:text-brand-primary hover:border-brand-primary/70 transition-all"
          >
            <Mail size={18} />
            {t.contact.links.email}
          </a>
          <a
            href="https://www.linkedin.com/in/martinpietra/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-primary/30 text-text-secondary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
          >
            <Linkedin size={18} />
            {t.contact.links.linkedin}
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-primary/30 text-text-secondary hover:text-brand-primary hover:border-brand-primary/60 transition-all"
          >
            <MessageCircle size={18} />
            {t.contact.links.whatsapp}
          </a>
        </div>

        <p className="text-xs text-text-secondary pt-4">
          {t.contact.copyright(currentYear)}
        </p>
      </div>
    </footer>
  );
}
