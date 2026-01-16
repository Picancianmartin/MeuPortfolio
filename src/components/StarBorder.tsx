import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'cyan', 
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style
      }}
    >
      {/* --- CONTEÚDO INTERNO --- 
          ESTRATÉGIA DE ALTO CONTRASTE:
          - Light Mode (Padrão): Fundo Zinc-900 (Quase preto), Texto Branco.
          - Dark Mode (dark:): Fundo transparente/escuro, Texto Branco.
          
          Isso faz o botão ser sempre um elemento de destaque escuro,
          permitindo que a luz (Star) brilhe mesmo se o site estiver branco.
      */}
      <div className="relative z-10 
                      bg-zinc-900 dark:bg-white/5 
                      backdrop-blur-md 
                      border border-zinc-800 dark:border-white/10
                      text-white 
                      text-center text-[16px] py-3 px-6 rounded-[19px] h-full flex items-center justify-center transition-colors duration-300">
        {children}
      </div>

      {/* --- LUZES --- */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
    </Component>
  );
};

export default StarBorder;