import image_me from '../assets/foto.jpeg';
import { GraduationCap, Code2, Briefcase, Target } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Formação Acadêmica',
      description: 'Análise e Desenv. de Sistemas (Facens)',
    },
    {
      icon: Code2,
      title: 'Desenvolvimento',
      description: 'Full Stack com foco em soluções escaláveis',
    },
    {
      icon: Briefcase,
      title: 'Experiência',
      description: 'Atleta Profissional (8 anos) & Dev',
    },
    {
      icon: Target,
      title: 'Objetivo',
      description: 'Criar impacto através da tecnologia',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 " style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>Sobre Mim</h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div>
            <div className="relative glow-purple-hover w-full aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto ">

              <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-3xl"></div>
              <img
                src={image_me}
                alt="Technology"
                className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-brand-primary/30"
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Como ex-atleta profissional com 8 anos de experiência, 
            entendi que o sucesso é fruto de dedicação, colaboração e superação de limites. 
            Minha jornada me ensinou o real significado de liderança, trabalho em equipe e resiliência sob pressão. 
            Agora, estou aplicando a mesma disciplina e paixão no meu desenvolvimento na área de tecnologia, um setor que sempre me fascinou. 
            Minha capacidade de me comunicar de forma assertiva e de me adaptar a novos desafios me prepara para atuar de forma significativa, 
            usando a mentalidade de um atleta para superar limites e contribuir com o avanço e a inovação tecnológica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-surface-elevated rounded-xl border border-brand-primary/20 hover:border-brand-primary/50 transition-all hover:shadow-lg glass-effect glow-purple-hover hover:-translate-y-1"
                >
                  <item.icon className="text-brand-primary mb-2 sm:mb-3" size={28} />
                  <h3 className="text-text-primary font-bold mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}