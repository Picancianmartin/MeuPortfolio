/**
 * Faixas públicas do cotador (/orcamento).
 *
 * ⚠️ ESTE ARQUIVO É ESPELHO DE ~/precificacao/tabela.md
 * Ao reajustar preços, atualize os dois. Só entram aqui valores que podem
 * aparecer para o visitante — aditivos individuais NÃO são expostos.
 *
 * Última sincronização: 2026-08-21
 */

export type TipoId = "LP" | "INST" | "CMS" | "ECOM" | "APP";
export type PorteId = "autonomo" | "pequeno" | "estabelecido";
export type PlanoId = "P1" | "P2" | "P3";

export interface Tipo {
  id: TipoId;
  nome: string;
  /** Explicação em linguagem de leigo, sem jargão técnico. */
  descricao: string;
  piso: number;
  /** null = sem teto público ("a partir de"). */
  teto: number | null;
  prazo: string;
  planoMin: PlanoId;
}

export const TIPOS: Record<TipoId, Tipo> = {
  LP: {
    id: "LP",
    nome: "Página única",
    descricao:
      "Uma página só, lida de cima até embaixo, terminando sempre no mesmo lugar: falar com você. Ideal quando o objetivo é um só e o excesso de opção atrapalha.",
    piso: 1800,
    teto: 3500,
    prazo: "5 a 10 dias",
    planoMin: "P1",
  },
  INST: {
    id: "INST",
    nome: "Site institucional",
    descricao:
      "Até 5 páginas com menu, para quem pesquisa sua empresa e precisa se convencer de que ela é séria antes de pedir um orçamento.",
    piso: 4000,
    teto: 8000,
    prazo: "2 a 4 semanas",
    planoMin: "P1",
  },
  CMS: {
    id: "CMS",
    nome: "Site com painel de edição",
    descricao:
      "O mesmo site institucional, mas com um painel onde você entra com login e muda o conteúdo sozinho, sem depender de ninguém.",
    piso: 8000,
    teto: 14000,
    prazo: "4 a 6 semanas",
    planoMin: "P1",
  },
  ECOM: {
    id: "ECOM",
    nome: "Loja virtual",
    descricao:
      "O cliente escolhe, coloca no carrinho, paga ali mesmo e recebe em casa. Envolve estoque, frete, pagamento e um painel de pedidos.",
    piso: 12000,
    teto: 25000,
    prazo: "6 a 10 semanas",
    planoMin: "P2",
  },
  APP: {
    id: "APP",
    nome: "Sistema sob medida",
    descricao:
      "Uma ferramenta para quem trabalha na empresa usar por dentro, no lugar de planilha ou caderno. Orçado por etapas, nunca fechado de uma vez.",
    piso: 18000,
    teto: null,
    prazo: "8 semanas ou mais",
    planoMin: "P2",
  },
};

/** Multiplicador aplicado só sobre a base — nunca sobre os recursos. */
export const MULTIPLICADOR_PORTE: Record<PorteId, number> = {
  autonomo: 0.85,
  pequeno: 1.0,
  estabelecido: 1.15,
};

/** Acréscimo quando o prazo é menor que a metade do normal. */
export const ACRESCIMO_URGENCIA = 0.4;

export const PLANOS: Record<PlanoId, { nome: string; preco: number }> = {
  P1: { nome: "Essencial", preco: 197 },
  P2: { nome: "Essencial + Automação", preco: 297 },
  P3: { nome: "Performance", preco: 597 },
};

export interface Recurso {
  id: string;
  label: string;
  ajuda: string;
  piso: number;
  teto: number;
  /** Se marcado, força o projeto para este tipo. */
  forcaTipo?: TipoId;
  /** Exige plano com manutenção de automação. */
  exigeAutomacao?: boolean;
}

export const RECURSOS: Recurso[] = [
  {
    id: "agendamento",
    label: "Agendamento online",
    ajuda: "O cliente escolhe o horário e recebe confirmação sozinho",
    piso: 2500,
    teto: 6000,
    exigeAutomacao: true,
  },
  {
    id: "pagamento",
    label: "Receber pagamento pelo site",
    ajuda: "Carrinho, cartão, Pix e boleto",
    piso: 0,
    teto: 0,
    forcaTipo: "ECOM",
  },
  {
    id: "login",
    label: "Área com login",
    ajuda: "Cada pessoa entra e vê só o que é dela",
    piso: 2000,
    teto: 4500,
  },
  {
    id: "automacao",
    label: "Automatizar uma tarefa repetitiva",
    ajuda: "Formulário que já cai no seu sistema, e-mail automático, planilha que se preenche",
    piso: 800,
    teto: 1500,
    exigeAutomacao: true,
  },
  {
    id: "ia",
    label: "Atendimento com inteligência artificial",
    ajuda: "Responde dúvidas comuns a qualquer hora",
    piso: 3000,
    teto: 8000,
    exigeAutomacao: true,
  },
  {
    id: "integracao",
    label: "Conectar com um sistema que você já usa",
    ajuda: "ERP, emissor de nota, CRM, WhatsApp Business",
    piso: 1500,
    teto: 4000,
    exigeAutomacao: true,
  },
];

export interface ItemMaterial {
  id: string;
  label: string;
  /** Como o item aparece na frase "você marcou que ainda não tem ___". */
  falta: string;
  piso: number;
  teto: number;
}

export const MATERIAL: ItemMaterial[] = [
  { id: "logo", label: "Logotipo", falta: "o logotipo", piso: 1500, teto: 3000 },
  { id: "textos", label: "Textos", falta: "os textos", piso: 900, teto: 1500 },
  { id: "fotos", label: "Fotos", falta: "as fotos", piso: 0, teto: 0 },
];

export const PORTES: { id: PorteId; label: string; ajuda: string }[] = [
  { id: "autonomo", label: "Só eu", ajuda: "Trabalho sozinho, sem equipe" },
  { id: "pequeno", label: "2 a 9 pessoas", ajuda: "Equipe pequena, faturamento constante" },
  { id: "estabelecido", label: "10 ou mais", ajuda: "Empresa estabelecida, franquia ou grupo" },
];
