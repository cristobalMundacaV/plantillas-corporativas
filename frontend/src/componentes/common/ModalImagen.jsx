import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function ModalImagen({ abierto, imagen, alt, onClose, layoutId }) {
    useEffect(() => {
    const manejarTecla = (event) => {
        if (event.key === 'Escape') {
        onClose();
        }
    };

    if (abierto) {
        document.addEventListener('keydown', manejarTecla);
        document.body.style.overflow = 'hidden';
    }

    return () => {
        document.removeEventListener('keydown', manejarTecla);
        document.body.style.overflow = 'auto';
    };
    }, [abierto, onClose]);

    return createPortal(
    <AnimatePresence>
        {abierto && imagen && (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.45)_100%)]" />

            <motion.button
            onClick={onClose}
            className="absolute right-5 top-5 z-[10001] rounded-full border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
            aria-label="Cerrar imagen"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            >
            <X className="h-6 w-6" />
            </motion.button>

            <div
            className="relative z-[10000] flex h-full w-full items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
            >
            <div className="w-full max-w-7xl">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-slate-100">
                  {/* barra tipo navegador */}
                    <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <div className="ml-4 h-8 flex-1 rounded-full bg-slate-100" />
                    </div>

                    <motion.img
                    layoutId={layoutId}
                    src={imagen}
                    alt={alt || 'Vista ampliada'}
                    className="max-h-[85vh] w-full object-contain"
                    transition={{
                        type: 'spring',
                        stiffness: 325,
                        damping: 35,
                    }}
                    />
                </div>
                </div>
            </div>
        </div>
        </motion.div>
        )}
    </AnimatePresence>,
    document.body
    );
}

export default ModalImagen;