import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string; // Esta será a cor da animação no HOVER
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'cyan', // Cor padrão do brilho ao passar o mouse
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      // 1. Adicionamos 'group' aqui para que o hover neste elemento controle os filhos
      className={`relative inline-block overflow-hidden rounded-[20px] group ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style
      }}
    >
      {/* --- ANIMAÇÃO INFERIOR --- */}
      <div
        // MUDANÇA AQUI:
        // - opacity-0: Invisível por padrão
        // - group-hover:opacity-100: Fica visível quando o mouse está no pai ('group')
        // - transition-opacity duration-500: Suaviza a aparição
        className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          // A cor do gradiente usa a prop 'color' que definimos
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>

      {/* --- ANIMAÇÃO SUPERIOR --- */}
      <div
        // MUDANÇA AQUI (Mesma lógica da inferior):
        className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>

      {/* --- CONTEÚDO INTERNO (Borda Estática) --- */}
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] transition-colors duration-500 group-hover:border-transparent">
        {/*
           Explicação do container interno:
           - border-gray-800: É a cor da borda quando NÃO está em hover.
           - group-hover:border-transparent: No hover, a borda cinza some para dar lugar ao brilho colorido.
           - transition-colors: Suaviza essa troca de borda.
        */}
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;