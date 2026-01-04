import React from 'react';
export function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Next.js', level: 80 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 75 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'REST APIs', level: 90 },
      ],
    },
    {
      category: 'Ferramentas',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>Habilidades</h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            Habilidades híbridas de Design (Figma, UI) e Código (React, JS, Python)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="bg-surface-elevated rounded-xl p-8 border border-brand-primary/20 hover:border-brand-primary/50 transition-all glass-effect glow-purple-hover"
            >
              <h3 className="text-xl font-bold text-text-primary mb-8 pb-4 border-b border-brand-primary/20" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-3">
                      <span className="text-text-primary font-medium">{skill.name}</span>
                      <span className="text-brand-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-background-primary/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-primary to-accent-cta rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}