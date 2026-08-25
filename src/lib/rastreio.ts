import { track } from "@vercel/analytics";

/**
 * Camada de eventos do site.
 *
 * Manda o mesmo evento para os dois destinos:
 *   - Vercel Analytics: visitas e origem do tráfego, sem esforço
 *   - Umami (umami.pietramartin.dev): funil, metas e API para o relatório mensal
 *
 * Nenhum componente fala com ferramenta de analytics direto. Trocar ou remover
 * um destino é mexer só neste arquivo.
 *
 * O que medir foi escolhido para responder uma pergunta comercial, não para
 * acumular número: onde as pessoas desistem antes de virar lead.
 */

export type Evento =
  /** Abriu a página do cotador. */
  | "orcamento_abriu"
  /** Respondeu uma pergunta. `passo` diz qual. */
  | "orcamento_respondeu"
  /** Chegou até a estimativa. */
  | "orcamento_resultado"
  /** Mandou o formulário do cotador. */
  | "orcamento_enviou"
  /** Mandou o formulário de contato. */
  | "contato_enviou"
  /** Clicou em algum botão de WhatsApp. */
  | "whatsapp_clicou";

type Dados = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    umami?: { track: (evento: string, dados?: Dados) => void };
  }
}

export function rastrear(evento: Evento, dados?: Dados) {
  // Analytics nunca pode derrubar a página: bloqueador de anúncio, script fora
  // do ar ou rede ruim têm que falhar em silêncio.
  try {
    track(evento, dados);
  } catch {
    /* segue */
  }

  try {
    window.umami?.track(evento, dados);
  } catch {
    /* segue */
  }
}
