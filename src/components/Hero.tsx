import React from 'react';
import image_code from '../assets/code.jpg';
import { Github, Linkedin, Mail, Download, Instagram } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-full text-brand-primary text-sm font-medium">
              Disponível para Oportunidades
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
              Desenvolvendo o futuro,
              <span className="block gradient-text mt-2">projetando experiências</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Formada em Análise e Desenvolvimento de Sistemas, apaixonada por criar
              soluções digitais inovadoras. Especialista em UI/UX Design e desenvolvimento 
              web moderno com React, TypeScript e Python.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-accent-cta hover:bg-accent-cta/90 text-[rgb(255,255,255)] font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Ver Projetos
              </button>
              <a
                href="/cv.pdf"
                download="CV-Desenvolvedora.pdf"
                className="px-8 py-4 bg-transparent hover:bg-brand-primary/10 text-text-primary border-2 border-brand-primary/30 hover:border-brand-primary font-medium rounded-lg transition-all flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:contato@email.com"
                className="p-3 bg-surface-elevated hover:bg-brand-primary/20 text-text-primary hover:text-brand-primary rounded-lg transition-all border border-brand-primary/20 hover:border-brand-primary/50"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto glow-purple">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-3xl"></div>
              <img
                src={image_code}
                alt="Developer Workspace"
                className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-brand-primary/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}