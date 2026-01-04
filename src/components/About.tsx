import React from 'react';
import image_code from '../assets/code.jpg';
import image_me from '../assets/foto.jpeg';
import { GraduationCap, Code2, Briefcase, Target } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Formação Acadêmica',
      description: 'Análise e Desenvolvimento de Sistemas',
    },
    {
      icon: Code2,
      title: 'Desenvolvimento',
      description: 'Full Stack com foco em soluções escaláveis',
    },
    {
      icon: Briefcase,
      title: 'Experiência',
      description: 'Projetos em diversas tecnologias modernas',
    },
    {
      icon: Target,
      title: 'Objetivo',
      description: 'Criar impacto através da tecnologia',
    },
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>Sobre Mim</h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative glow-purple-hover transition-all duration-300">
              <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl blur-2xl"></div>
              <img
                src={image_me}
                alt="Technology"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-video border border-brand-primary/30"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-text-secondary leading-relaxed">
              Sou uma desenvolvedora apaixonada por transformar ideias em realidade através
              do código. Com formação em Análise e Desenvolvimento de Sistemas (FACENS-2025), busco
              constantemente aprender novas tecnologias e aprimorar minhas habilidades.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Meu foco está em criar aplicações web modernas, responsivas e de alto
              desempenho, sempre priorizando a experiência do usuário e as melhores
              práticas de desenvolvimento.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-surface-elevated rounded-xl border border-brand-primary/20 hover:border-brand-primary/50 transition-all hover:shadow-lg glass-effect glow-purple-hover"
                >
                  <item.icon className="text-brand-primary mb-3" size={32} />
                  <h3 className="text-text-primary font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}