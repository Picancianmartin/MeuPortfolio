import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { TIMEOUT_ENVIO_MS, WEBHOOK_ORCAMENTO } from "../data/webhooks";
import { useMeta } from "../hooks/useMeta";
import {
  ACRESCIMO_URGENCIA,
  MATERIAL,
  MULTIPLICADOR_PORTE,
  PLANOS,
  PORTES,
  RECURSOS,
  TIPOS,
  type PorteId,
  type TipoId,
} from "../data/faixas";

const WHATSAPP =
  "https://wa.me/5515992416473?text=" +
  encodeURIComponent("Olá, Pietra! Fiz a estimativa no seu site e queria conversar sobre o projeto.");

type Objetivo = "contato" | "conhecer" | "vender" | "sistema";
type Atualizacao = "raro" | "frequente";
type Prazo = "normal" | "urgente";

interface Respostas {
  objetivo: Objetivo | null;
  atualizacao: Atualizacao | null;
  recursos: string[];
  material: string[];
  porte: PorteId | null;
  prazo: Prazo | null;
}

const RESPOSTAS_INICIAIS: Respostas = {
  objetivo: null,
  atualizacao: null,
  recursos: [],
  material: [],
  porte: null,
  prazo: null,
};

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const arredonda = (v: number) => Math.round(v / 100) * 100;

/* ------------------------------------------------------------------ */
/* Cálculo                                                             */
/* ------------------------------------------------------------------ */

function classificar(r: Respostas): TipoId {
  if (r.recursos.includes("pagamento")) return "ECOM";
  if (r.objetivo === "vender") return "ECOM";
  if (r.objetivo === "sistema") return "APP";
  if (r.objetivo === "conhecer") return r.atualizacao === "frequente" ? "CMS" : "INST";
  return "LP";
}

function calcular(r: Respostas) {
  const tipo = TIPOS[classificar(r)];
  const mult = r.porte ? MULTIPLICADOR_PORTE[r.porte] : 1;

  let piso = tipo.piso * mult;
  let teto = tipo.teto ? tipo.teto * mult : null;

  const recursosEscolhidos = RECURSOS.filter(
    (x) => r.recursos.includes(x.id) && x.piso > 0 && x.forcaTipo !== tipo.id,
  );
  piso += recursosEscolhidos.reduce((s, x) => s + x.piso, 0);
  if (teto !== null) teto += recursosEscolhidos.reduce((s, x) => s + x.teto, 0);

  // r.material passou a guardar o que a pessoa NÃO tem (a pergunta mudou de
  // "o que já tem" para "o que ainda falta").
  const faltando = MATERIAL.filter((m) => r.material.includes(m.id) && m.piso > 0);
  const extraPiso = faltando.reduce((s, m) => s + m.piso, 0);
  const extraTeto = faltando.reduce((s, m) => s + m.teto, 0);

  if (r.prazo === "urgente") {
    piso *= 1 + ACRESCIMO_URGENCIA;
    if (teto !== null) teto *= 1 + ACRESCIMO_URGENCIA;
  }

  const precisaAutomacao = RECURSOS.some(
    (x) => r.recursos.includes(x.id) && x.exigeAutomacao,
  );
  const planoId = precisaAutomacao && tipo.planoMin === "P1" ? "P2" : tipo.planoMin;

  // Recurso extra nunca cabe no prazo da peça sozinha — prometer isso é criar
  // um atraso já no primeiro contato.
  const prazoTexto =
    recursosEscolhidos.length > 0
      ? `${tipo.prazo} + 1 a 2 semanas pelos recursos extras`
      : tipo.prazo;

  return {
    tipo,
    prazoTexto,
    piso: arredonda(piso),
    teto: teto === null ? null : arredonda(teto),
    faltando,
    extraPiso: arredonda(extraPiso),
    extraTeto: arredonda(extraTeto),
    urgente: r.prazo === "urgente",
    plano: PLANOS[planoId],
  };
}

/* ------------------------------------------------------------------ */
/* Passos                                                              */
/* ------------------------------------------------------------------ */

interface Opcao {
  id: string;
  label: string;
  ajuda: string;
}

interface Passo {
  chave: keyof Respostas;
  titulo: string;
  subtitulo?: string;
  multipla: boolean;
  opcional?: boolean;
  opcoes: Opcao[];
}

const PASSOS: Passo[] = [
  {
    chave: "objetivo",
    titulo: "Quando alguém entrar no seu site, o que você quer que aconteça?",
    subtitulo: "É a pergunta que mais pesa no resultado.",
    multipla: false,
    opcoes: [
      { id: "contato", label: "Entrar em contato comigo", ajuda: "Um objetivo só: ligar, chamar no WhatsApp, mandar mensagem" },
      { id: "conhecer", label: "Conhecer meu trabalho ou minha empresa", ajuda: "Ver serviços, história, equipe, e então decidir" },
      { id: "vender", label: "Comprar direto pelo site", ajuda: "Escolher produto, pagar e receber" },
      { id: "sistema", label: "Nada — quem vai usar é minha equipe", ajuda: "Uma ferramenta interna, no lugar de planilha ou caderno" },
    ],
  },
  {
    chave: "atualizacao",
    titulo: "Com que frequência o conteúdo vai mudar?",
    subtitulo: "E quem vai mudar: você ou eu.",
    multipla: false,
    opcoes: [
      { id: "raro", label: "Quase nunca", ajuda: "Uma vez ou outra por ano. Você me chama e eu altero" },
      { id: "frequente", label: "Toda semana ou todo mês", ajuda: "Você quer entrar e mudar sozinho, sem esperar ninguém" },
    ],
  },
  {
    chave: "recursos",
    titulo: "Precisa de algo além das páginas?",
    subtitulo: "Marque quantos quiser, ou siga sem marcar nada.",
    multipla: true,
    opcional: true,
    opcoes: RECURSOS.map((x) => ({ id: x.id, label: x.label, ajuda: x.ajuda })),
  },
  {
    chave: "material",
    titulo: "O que ainda falta para o seu site?",
    subtitulo: "Marque o que você não tem — é isso que entra na conta.",
    multipla: true,
    opcional: true,
    opcoes: MATERIAL.map((m) => ({
      id: m.id,
      label: m.label,
      ajuda:
        m.id === "fotos"
          ? "Fotos suas, do espaço ou dos produtos"
          : m.id === "textos"
            ? "Os textos que vão em cada seção da página"
            : "",
    })),
  },
  {
    chave: "porte",
    titulo: "Quantas pessoas trabalham com você?",
    subtitulo:
      "Isso me ajuda a calibrar a faixa. Projeto de quem está começando sozinho não custa o mesmo de uma empresa com equipe.",
    multipla: false,
    opcoes: PORTES.map((p) => ({ id: p.id, label: p.label, ajuda: p.ajuda })),
  },
  {
    chave: "prazo",
    titulo: "Para quando você precisa?",
    multipla: false,
    opcoes: [
      { id: "normal", label: "Tenho um prazo confortável", ajuda: "Dá para seguir o cronograma normal" },
      { id: "urgente", label: "É para ontem", ajuda: "Prazo apertado tem acréscimo — e eu te digo isso antes, não depois" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

export default function Orcamento() {
  useMeta(
    "Orçamento | Pietra Martin",
    "Descubra em um minuto qual tipo de site resolve o seu caso, a faixa de investimento e o prazo. Sem compromisso.",
  );

  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>(RESPOSTAS_INICIAIS);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [contato, setContato] = useState({ nome: "", email: "", detalhes: "" });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [armadilha, setArmadilha] = useState("");

  // O passo de frequência só faz sentido para quem quer apresentar a empresa.
  const passosVisiveis = useMemo(
    () => PASSOS.filter((p) => p.chave !== "atualizacao" || respostas.objetivo === "conhecer"),
    [respostas.objetivo],
  );

  const passo = passosVisiveis[indice];
  const total = passosVisiveis.length;
  const resultado = useMemo(() => calcular(respostas), [respostas]);

  const valorAtual = respostas[passo?.chave as keyof Respostas];
  const respondido = passo?.multipla
    ? passo.opcional || (valorAtual as string[]).length > 0
    : valorAtual !== null;

  function escolher(opcaoId: string) {
    if (!passo) return;
    if (passo.multipla) {
      setRespostas((r) => {
        const atual = r[passo.chave] as string[];
        return {
          ...r,
          [passo.chave]: atual.includes(opcaoId)
            ? atual.filter((x) => x !== opcaoId)
            : [...atual, opcaoId],
        };
      });
      return;
    }
    setRespostas((r) => ({ ...r, [passo.chave]: opcaoId }));
    // Pergunta de escolha única avança sozinha.
    window.setTimeout(() => avancar(), 180);
  }

  function avancar() {
    if (indice + 1 >= passosVisiveis.length) {
      setMostrarResultado(true);
      return;
    }
    setIndice(indice + 1);
  }

  function voltar() {
    if (mostrarResultado) {
      setMostrarResultado(false);
      return;
    }
    setIndice((i) => Math.max(0, i - 1));
  }

  function recomecar() {
    setRespostas(RESPOSTAS_INICIAIS);
    setIndice(0);
    setMostrarResultado(false);
    setEnviado(false);
    setErro(null);
    setContato({ nome: "", email: "", detalhes: "" });
  }

  function payload() {
    const nomes = (ids: string[], fonte: { id: string; label: string }[]) =>
      ids.map((id) => fonte.find((f) => f.id === id)?.label ?? id);

    return {
      nome: contato.nome,
      email: contato.email,
      detalhes: contato.detalhes,
      // Campo-armadilha: humano não vê, robô preenche. O n8n descarta.
      empresa: armadilha,
      tipo: resultado.tipo.nome,
      faixa: resultado.teto
        ? `${brl(resultado.piso)} a ${brl(resultado.teto)}`
        : `a partir de ${brl(resultado.piso)}`,
      plano: `${resultado.plano.nome} — ${brl(resultado.plano.preco)}/mês`,
      porte: PORTES.find((p) => p.id === respostas.porte)?.label ?? "",
      prazo: respostas.prazo === "urgente" ? "Urgente" : "Confortável",
      recursos: nomes(respostas.recursos, RECURSOS),
      falta: nomes(respostas.material, MATERIAL),
      objetivo: PASSOS[0].opcoes.find((o) => o.id === respostas.objetivo)?.label ?? "",
      atualizacao: respostas.atualizacao ?? "não perguntado",
      origem: "portfolio/orcamento",
    };
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      const resposta = await fetch(WEBHOOK_ORCAMENTO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
        signal: AbortSignal.timeout(TIMEOUT_ENVIO_MS),
      });
      if (!resposta.ok) throw new Error(`webhook respondeu ${resposta.status}`);
      setEnviado(true);
    } catch (falha) {
      // Sem isto, o motivo real (fora do ar, CORS, tempo esgotado) desaparece e
      // o diagnóstico vira adivinhação.
      console.error("[orcamento] falha no envio:", falha);
      setErro("Não consegui enviar agora. Me chama no WhatsApp que eu resolvo por lá.");
    } finally {
      setEnviando(false);
    }
  }

  const progresso = mostrarResultado ? 100 : ((indice + 1) / total) * 100;

  return (
    <main className="min-h-screen bg-background-primary text-text-primary pb-20 md:pb-0">
      <Navigation />
      <div className="mx-auto w-full max-w-2xl px-5 pt-24 pb-10 md:pb-16">
        <header className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
            <Sparkles size={13} aria-hidden="true" />
            Estimativa em 1 minuto
          </span>
          <h1
            className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Quanto custa o seu site?
          </h1>
          <p className="mt-3 text-text-secondary leading-relaxed">
            Poucas perguntas rápidas. No fim eu te digo qual tipo de projeto resolve o seu caso,
            a faixa de investimento e o prazo — sem você precisar saber nada de tecnologia.
          </p>
        </header>

        {/* Progresso */}
        <div className="mb-8">
          <div
            className="h-1 w-full overflow-hidden rounded-full bg-surface-elevated"
            role="progressbar"
            aria-valuenow={Math.round(progresso)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso do questionário"
          >
            <div
              className="h-full bg-brand-primary transition-all duration-500 ease-out"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            {mostrarResultado ? "Pronto" : `Pergunta ${indice + 1} de ${total}`}
          </p>
        </div>

        {!mostrarResultado && passo && (
          <section key={passo.chave} className="animate-fade-in-up">
            <h2
              className="text-xl md:text-2xl font-medium leading-snug"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {passo.titulo}
            </h2>
            {passo.subtitulo && (
              <p className="mt-2 text-sm text-text-secondary">{passo.subtitulo}</p>
            )}

            <div
              className="mt-6 flex flex-col gap-3"
              role={passo.multipla ? "group" : "radiogroup"}
              aria-label={passo.titulo}
            >
              {passo.opcoes.map((opcao) => {
                const selecionado = passo.multipla
                  ? (respostas[passo.chave] as string[]).includes(opcao.id)
                  : respostas[passo.chave] === opcao.id;

                return (
                  <button
                    key={opcao.id}
                    type="button"
                    onClick={() => escolher(opcao.id)}
                    role={passo.multipla ? "checkbox" : "radio"}
                    aria-checked={selecionado}
                    className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ${
                      selecionado
                        ? "border-brand-primary bg-brand-primary/10"
                        : "border-border bg-surface-primary hover:border-brand-primary/50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                        passo.multipla ? "rounded-md" : "rounded-full"
                      } ${
                        selecionado
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-border"
                      }`}
                    >
                      {selecionado && <Check size={13} strokeWidth={3} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium">{opcao.label}</span>
                      {opcao.ajuda && (
                        <span className="mt-0.5 block text-sm text-text-secondary">
                          {opcao.ajuda}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={voltar}
                disabled={indice === 0}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Voltar
              </button>

              {(passo.multipla || passo.opcional) && (
                <button
                  type="button"
                  onClick={avancar}
                  disabled={!respondido}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
                >
                  {(respostas[passo.chave] as string[]).length > 0
                    ? "Continuar"
                    : passo.chave === "material"
                      ? "Já tenho tudo"
                      : "Nenhum desses"}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </section>
        )}

        {mostrarResultado && (
          <section className="animate-fade-in-up" aria-live="polite">
            <div className="rounded-2xl border border-brand-primary/30 bg-surface-primary p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-brand-primary">
                O que eu indico para o seu caso
              </p>
              <h2
                className="mt-2 text-2xl md:text-3xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {resultado.tipo.nome}
              </h2>
              <p className="mt-3 leading-relaxed text-text-secondary">
                {resultado.tipo.descricao}
              </p>

              <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-text-secondary">
                    Faixa estimada
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">
                    {resultado.teto
                      ? `${brl(resultado.piso)} – ${brl(resultado.teto)}`
                      : `a partir de ${brl(resultado.piso)}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-text-secondary">
                    Prazo
                  </dt>
                  <dd className="mt-1 flex items-start gap-2 text-2xl font-semibold">
                    <Clock size={18} className="mt-1.5 shrink-0 text-text-secondary" aria-hidden="true" />
                    <span className="text-xl leading-snug">{resultado.prazoTexto}</span>
                  </dd>
                </div>
              </dl>

              <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-6 text-sm">
                {resultado.faltando.length > 0 && (
                  <li className="text-text-secondary">
                    Você marcou que ainda não tem{" "}
                    <strong className="text-text-primary">
                      {resultado.faltando.map((m) => m.falta).join(" e ")}
                    </strong>
                    . Isso costuma somar de {brl(resultado.extraPiso)} a {brl(resultado.extraTeto)}.
                  </li>
                )}
                {resultado.urgente && (
                  <li className="text-text-secondary">
                    A faixa acima <strong className="text-text-primary">já inclui o acréscimo de 40%</strong> por
                    prazo apertado. Se der para esperar, ela cai.
                  </li>
                )}
                <li className="text-text-secondary">
                  Manutenção mensal a partir de{" "}
                  <strong className="text-text-primary">
                    {brl(resultado.plano.preco)}/mês
                  </strong>{" "}
                  ({resultado.plano.nome}) — hospedagem, domínio, backup, segurança e suporte.
                </li>
              </ul>

              <p className="mt-6 rounded-lg bg-surface-elevated px-4 py-3 text-sm text-text-secondary">
                Isto é uma <strong className="text-text-primary">estimativa, não uma proposta</strong>. O
                valor final sai depois de uma conversa de 20 minutos, onde eu entendo o que
                você realmente precisa — às vezes é menos do que aparece aqui.
              </p>
            </div>

            {/* Captura */}
            {!enviado ? (
              <form onSubmit={enviar} className="mt-8">
                <h3
                  className="text-lg font-medium"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Quer que eu olhe o seu caso de perto?
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  Me deixe seu contato que eu respondo com um orçamento fechado.
                </p>

                <div className="mt-5 flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="orc-nome" className="mb-1.5 block text-sm font-medium">
                        Seu nome
                      </label>
                      <input
                        id="orc-nome"
                        required
                        value={contato.nome}
                        onChange={(e) => setContato((c) => ({ ...c, nome: e.target.value }))}
                        className="w-full rounded-lg border border-border bg-surface-primary px-3.5 py-2.5 outline-none transition-colors focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="orc-email" className="mb-1.5 block text-sm font-medium">
                        E-mail
                      </label>
                      <input
                        id="orc-email"
                        type="email"
                        required
                        value={contato.email}
                        onChange={(e) => setContato((c) => ({ ...c, email: e.target.value }))}
                        className="w-full rounded-lg border border-border bg-surface-primary px-3.5 py-2.5 outline-none transition-colors focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                      />
                    </div>
                  </div>

                  {/* Campo-armadilha. Invisível e fora da ordem de tabulação:
                      humano nunca preenche, robô de spam quase sempre. */}
                  <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="orc-empresa">Não preencha este campo</label>
                    <input
                      id="orc-empresa"
                      name="empresa"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={armadilha}
                      onChange={(e) => setArmadilha(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="orc-detalhes" className="mb-1.5 block text-sm font-medium">
                      Conte um pouco do projeto{" "}
                      <span className="font-normal text-text-secondary">(opcional)</span>
                    </label>
                    <textarea
                      id="orc-detalhes"
                      rows={3}
                      value={contato.detalhes}
                      onChange={(e) => setContato((c) => ({ ...c, detalhes: e.target.value }))}
                      className="w-full resize-y rounded-lg border border-border bg-surface-primary px-3.5 py-2.5 outline-none transition-colors focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                    />
                  </div>
                </div>

                {erro && (
                  <p role="alert" className="mt-4 text-sm text-destructive">
                    {erro}
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={enviando}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
                  >
                    {enviando ? (
                      <>
                        <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                        Enviando
                      </>
                    ) : (
                      <>
                        Enviar minhas respostas
                        <ArrowRight size={17} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-medium transition-colors hover:border-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
                  >
                    <MessageCircle size={17} aria-hidden="true" />
                    Falar agora
                  </a>
                </div>
              </form>
            ) : (
              <div className="mt-8 rounded-2xl border border-border bg-surface-primary p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
                  <Check size={22} strokeWidth={2.5} aria-hidden="true" />
                </div>
                <h3
                  className="mt-4 text-lg font-medium"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Recebi, {contato.nome.split(" ")[0]}!
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Respondo em até três dias úteis. Se preferir adiantar, é só chamar no WhatsApp.
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={voltar}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Rever respostas
              </button>
              <button
                type="button"
                onClick={recomecar}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Recomeçar
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
