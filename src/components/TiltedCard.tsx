import { X, ArrowLeft, Github, Linkedin } from 'lucide-react';

// --- Types ---
export interface GalleryItem {
  id: number | string;
  src: any; // Aceita string url ou import estático do Next.js
  alt: string;
  title: string;
  span: string;
  description?: string;
  prompt?: string;
}

interface GalleryProps {
  data: GalleryItem[];
  onImageClick: (item: GalleryItem) => void;
}

interface ImageModalProps {
  src: string | null;
  selectedItem: GalleryItem | null; 
  onClose: () => void;
}

// --- Components ---

export function Gallery({ data, onImageClick }: GalleryProps) {
  return (
    // CONTAINER GERAL: Define o fundo preto (#09090b) para toda a área da galeria
    <div className=" min-h-screen bg-[#09090b] flex flex-col text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="w-full max-w-[1600px] mx-auto px-6 py-8">
        <a 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <div className="p-2 rounded-md bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span>Voltar ao Portfólio</span>
        </a>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto text-center px-20 pb-20">
        
        {/* Título da Seção */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
            AI Studio
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mb-4 mx-auto"></div>
          <p className="text-zinc-500 max-w-xl text-lg text-center mx-auto">
            Explorações visuais e conceitos gerados através de inteligência artificial.
          </p>
        </div>

        {/* Grid de Imagens */}
        <div className="grid grid-cols-1 xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {data.map((img) => (
            <div
              key={img.id}
              className={`group cursor-pointer relative overflow-hidden rounded-lg bg-zinc-900 ${img.span}`}
              onClick={() => onImageClick(img)}
            >
              <img
                src={typeof img.src === 'string' ? img.src : img.src.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              
              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center backdrop-blur-[2px]">
                <h3 className="text-white text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </h3>
                <p className="text-zinc-300 text-xs mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 uppercase tracking-wider">
                  Ver Detalhes
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-900 bg-[#09090b]">
        <div className="max-w-[1600px] mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Pietra Cancian Martin
          </p>
          
          <div className="flex items-center gap-6">
            <SocialLink href="#" icon={<Github size={16} />} label="GitHub" />
            <SocialLink href="#" icon={<Linkedin size={16} />} label="LinkedIn" />
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente do Modal (Mantido igual)
export function ImageModal({ selectedItem, onClose }: ImageModalProps) {
  if (!selectedItem) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex justify-center items-center p-4 animate-in fade-in duration-200 backdrop-blur-sm"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-[60] p-2 hover:bg-white/10 rounded-full"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      <div 
        className="bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem no Modal */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative p-2">
           <img 
            src={typeof selectedItem.src === 'string' ? selectedItem.src : selectedItem.src.src} 
            alt={selectedItem.alt}
            className="max-h-[50vh] md:max-h-[85vh] w-full object-contain"
          />
        </div>

        {/* Detalhes no Modal */}
        <div className="w-full md:w-1/3 p-8 flex flex-col bg-[#09090b] border-t md:border-t-0 md:border-l border-zinc-800">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-white mb-2">
              {selectedItem.title}
            </h2>
            <div className="w-10 h-1 bg-indigo-500 mb-6 rounded-full"></div>

            <div className="text-zinc-400 leading-relaxed space-y-6 overflow-y-auto max-h-[40vh] md:max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              <p className="text-sm">
                {selectedItem.description || "Sem descrição disponível."}
              </p>
              
              {selectedItem.prompt && (
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2">
                    Prompt Utilizado
                  </p>
                  <p className="text-xs text-zinc-500 font-mono break-words leading-relaxed">
                    {selectedItem.prompt}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-6 mt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-600">
             <span>ID: #{selectedItem.id}</span>
             <span>AI Generated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para links sociais
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      className="text-zinc-500 hover:text-white transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
}