import { Navigation } from "../components/Navigation";
import { Projects } from "../components/Projects";
import { useMeta } from "../hooks/useMeta";

export default function Projetos() {
  useMeta(
    "Projetos | Pietra Martin",
    "Case studies de desenvolvimento web e mobile: landing pages, e-commerce, apps nativos e automação. Problema, solução e stack de cada projeto.",
  );

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300 pb-20 md:pb-0">
      <Navigation />
      <div className="pt-16">
        <Projects
          titulo="Projetos"
          descricao="Cada projeto aqui começou num problema real de alguém. Abaixo estão o contexto, a solução e as decisões técnicas de cada um."
        />
      </div>
    </div>
  );
}
