import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! (Esta é uma simulação)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@seuemail.com',
      link: 'mailto:contato@seuemail.com',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (11) 99999-9999',
      link: 'tel:+5511999999999',
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'São Paulo, SP - Brasil',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>Entre em Contato</h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            Estou sempre aberta a novas oportunidades e colaborações
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Vamos conversar!</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Se você está procurando uma desenvolvedora dedicada e apaixonada por
                tecnologia, ficarei feliz em conversar sobre como posso contribuir para
                seu projeto ou equipe.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-surface-elevated rounded-xl border border-brand-primary/20 hover:border-brand-primary/50 transition-all glass-effect glow-purple-hover"
                >
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <item.icon className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-bold mb-1">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-text-secondary hover:text-brand-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-secondary">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-elevated rounded-xl p-8 border border-brand-primary/20 glass-effect">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-primary/50 border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-primary/50 border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-text-primary font-medium mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-primary/50 border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background-primary/50 border border-brand-primary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  placeholder="Sua mensagem..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-accent-cta hover:bg-accent-cta/90 text-[rgb(255,255,255)] font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Send size={20} />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-brand-primary/20 text-center">
          <p className="text-text-secondary">
            © {new Date().getFullYear()} Portfolio. Desenvolvendo o futuro com React, TypeScript e Design
          </p>
        </div>
      </div>
    </section>
  );
}