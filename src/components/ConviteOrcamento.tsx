import { Link } from "react-router-dom";
import { ArrowRight, Clock3, MessageCircleQuestion, Wallet } from "lucide-react";

const pontos = [
  {
    icon: MessageCircleQuestion,
    titulo: "Sem jargão",
    texto: "Cinco perguntas em português comum. Você não precisa saber o que é CMS.",
  },
  {
    icon: Wallet,
    titulo: "Faixa de investimento",
    texto: "Uma estimativa honesta na hora, não um “entre em contato para saber o preço”.",
  },
  {
    icon: Clock3,
    titulo: "Um minuto",
    texto: "No fim você descobre qual tipo de projeto resolve o seu caso, e o prazo.",
  },
];

export function ConviteOrcamento() {
  return (
    <section
      id="orcamento-convite"
      className="scroll-mt-24 py-20 md:py-28 bg-background-primary relative overflow-hidden transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex justify-center"
      >
        <div className="h-72 w-72 translate-y-10 rounded-full bg-brand-primary/10 blur-[110px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-brand-primary/20 bg-surface-primary p-8 md:p-12 shadow-xl shadow-brand-primary/5">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-cta">
            Quer um site?
          </span>

          <h2
            className="mt-4 text-3xl md:text-4xl font-bold text-text-primary"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Descubra quanto custa o seu, antes de me chamar
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            A parte mais desconfortável de pedir orçamento é não fazer ideia da ordem
            de grandeza. Montei uma estimativa rápida para resolver isso: você
            responde, e eu te digo a faixa e o prazo na mesma tela.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {pontos.map(({ icon: Icon, titulo, texto }) => (
              <li key={titulo} className="flex flex-col gap-2">
                <Icon size={20} className="text-accent-cta" aria-hidden="true" />
                <h3 className="font-semibold text-text-primary">{titulo}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{texto}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/orcamento"
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
            >
              Fazer minha estimativa
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="text-sm text-text-secondary">
              Sem cadastro e sem compromisso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
