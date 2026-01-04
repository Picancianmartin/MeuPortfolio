import React from 'react';
import image_placeholder from '../assets/placeholder.jpg';
import { CircularGallery } from './CircularGallery';

export function Projects() {
  const projects = [
    {
      image: image_placeholder,
      text: 'E-commerce Platform',
    },
    {
      image: image_placeholder,
      text: 'Task Management App',
    },
    {
      image: image_placeholder,
      text: 'Analytics Dashboard',
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

        <CircularGallery 
          items={projects}
          bend={3}
          textColor="#a78bfa"
          borderRadius={0.05}
          scrollEase={0.02}
          font="bold 30px Space Grotesk"
        />
      </div>
    </section>
  );
}