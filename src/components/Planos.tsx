import { Check } from "lucide-react";
import { PLANOS, type PlanoId } from "../data/faixas";

const ORDEM: PlanoId[] = ["P1", "P2", "P3"];

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

interface PlanosProps {
  /** Marca o plano que o cotador recomendou para este visitante. */
  destaque?: PlanoId;
}

/**
 * Explica o que é a mensalidade.
 *
 * Sem isto, o cotador terminava anunciando "a partir de R$ 197/mês" sem que
 * ninguém soubesse o que estava sendo cobrado — a pergunta mais previsível de
 * quem lê, e a que mais derruba a conversa depois.
 */
export function Planos({ destaque }: PlanosProps = {}) {
  return (
    <section id="planos" className="scroll-mt-24 pt-16 pb-4">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cta">
          Depois que o site vai ao ar
        </p>
        <h2
          className="mt-3 text-2xl md:text-3xl font-bold text-text-primary"
          style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.02em" }}
        >
          O que é a mensalidade
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">
          Site não é entrega única: ele precisa de servidor, backup, atualização de
          segurança e alguém para chamar quando algo muda. A mensalidade cobre isso —
          e você não fica dependendo da minha agenda para trocar um preço ou uma foto.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {ORDEM.map((id) => {
          const plano = PLANOS[id];
          const marcado = destaque === id;

          return (
            <div
              key={id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-colors ${
                marcado
                  ? "border-brand-primary bg-brand-primary/10"
                  : "border-zinc-200 dark:border-white/10 bg-surface-primary"
              }`}
            >
              {marcado && (
                <span className="absolute -top-2.5 left-6 rounded-full bg-brand-primary px-3 py-0.5 text-[11px] font-bold text-white">
                  Indicado para você
                </span>
              )}

              <h3
                className="text-lg font-bold text-text-primary"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {plano.nome}
              </h3>

              <p className="mt-2 text-2xl font-bold text-text-primary tabular-nums">
                {brl(plano.preco)}
                <span className="text-sm font-medium text-text-secondary">/mês</span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {plano.paraQuem}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-zinc-200 dark:border-white/10 pt-5">
                {plano.inclui.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-accent-cta"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-text-secondary">
        Cancelamento com 30 dias de aviso, sem multa. Projetos com automação exigem
        plano — sem manutenção, automação quebra e ninguém percebe.
      </p>
    </section>
  );
}
