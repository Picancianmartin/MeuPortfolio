import { About } from "../components/About";
import { Navigation } from "../components/Navigation";
import { Skills } from "../components/Skills";
import { useMeta } from "../hooks/useMeta";

export default function Sobre() {
  useMeta(
    "Sobre | Pietra Martin",
    "Desenvolvedora full-stack. Formação, trajetória e as tecnologias que uso no dia a dia para construir sites, apps e automações.",
  );

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300 pb-20 md:pb-0">
      <Navigation />
      <div className="pt-16">
        <About mostrarCurriculo />
        <Skills />
      </div>
    </div>
  );
}
