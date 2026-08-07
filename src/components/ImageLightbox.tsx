import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = {
  label: string;
  src: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null) {
        onNavigate((index + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && index !== null) {
        onNavigate((index - 1 + images.length) % images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <X size={22} />
          </motion.button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Imagem anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index! - 1 + images.length) % images.length);
                }}
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Próxima imagem"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index! + 1) % images.length);
                }}
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.div
            key={current.src}
            className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.label}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            <p className="mt-4 text-sm sm:text-base text-white/80 text-center">
              {current.label}
              {images.length > 1 && (
                <span className="text-white/40">
                  {" "}
                  — {index! + 1}/{images.length}
                </span>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
