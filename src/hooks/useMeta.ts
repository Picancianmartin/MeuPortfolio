import { useEffect } from "react";

/**
 * Define título e descrição por rota.
 *
 * O site é uma SPA: sem isto, todas as páginas herdam o mesmo <title> e a mesma
 * descrição do index.html, e o Google não consegue diferenciá-las na busca.
 */
export function useMeta(titulo: string, descricao?: string) {
  useEffect(() => {
    const anterior = document.title;
    document.title = titulo;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const descricaoAnterior = tag?.content;

    if (descricao) {
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = descricao;
    }

    return () => {
      document.title = anterior;
      if (descricao && tag && descricaoAnterior !== undefined) {
        tag.content = descricaoAnterior;
      }
    };
  }, [titulo, descricao]);
}
