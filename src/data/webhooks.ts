/**
 * Endpoints do n8n.
 *
 * O caminho é definido no nó Webhook do workflow — se mudar lá, muda aqui.
 * Workflows: "Orçamento — portfólio" e "Contato — portfólio" no n8n.
 */
export const WEBHOOK_ORCAMENTO = "https://n8n.pietramartin.dev/webhook/orcamento";
export const WEBHOOK_CONTATO = "https://n8n.pietramartin.dev/webhook/contato";

/** Depois disso, desiste e oferece o WhatsApp. */
export const TIMEOUT_ENVIO_MS = 12_000;
