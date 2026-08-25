import { Contact } from "../components/Contact";
import { Navigation } from "../components/Navigation";
import { useMeta } from "../hooks/useMeta";

export default function Contato() {
  useMeta(
    "Contato | Pietra Martin",
    "Fale comigo sobre seu projeto de site, app ou automação. Respondo em até um dia útil.",
  );

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300 pb-20 md:pb-0">
      <Navigation />
      <div className="pt-16">
        <Contact />
      </div>
    </div>
  );
}
