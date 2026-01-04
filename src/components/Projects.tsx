import React from 'react';
import image_placeholder from '../assets/placeholder.jpg';
import { Github, ExternalLink } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Plataforma completa de e-commerce com carrinho, pagamentos e gestão de produtos.',
      image: image_placeholder,
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Task Management App',
      description: 'Aplicativo de gerenciamento de tarefas com kanban board e colaboração em tempo real.',
      image: image_placeholder,
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Dashboard analítico com gráficos interativos e visualização de dados em tempo real.',
      image: image_placeholder,
      tags: ['React', 'D3.js', 'Python', 'FastAPI'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>Projetos</h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi recentemente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-surface-elevated rounded-xl overflow-hidden border border-brand-primary/20 hover:border-brand-primary/50 transition-all hover:scale-105 group glass-effect glow-purple-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-primary/50 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{project.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 rounded-full text-xs font-medium text-brand-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors font-medium"
                  >
                    <Github size={20} />
                    Código
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors font-medium"
                  >
                    <ExternalLink size={20} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}