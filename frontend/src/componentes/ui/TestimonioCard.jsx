import { useState } from 'react';
import { User, Expand } from 'lucide-react';
import { motion } from 'framer-motion';
import ModalImagen from '../common/ModalImagen';
import { getMediaUrl } from '../../utils/media';

function TestimonioCard({ testimonio }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const urlImagenTrabajo = getMediaUrl(testimonio?.foto);

  const layoutIdImagen = `testimonio-imagen-${testimonio.id}`;

  return (
    <>
      <div className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
        {urlImagenTrabajo && (
          <div className="mb-5 overflow-hidden rounded-2xl bg-slate-100 p-2 shadow-inner">
            <motion.button
              type="button"
              layoutId={layoutIdImagen}
              onClick={() => setModalAbierto(true)}
              className="group relative block w-full overflow-hidden rounded-xl"
            >
              <img
                src={urlImagenTrabajo}
                alt={`Trabajo relacionado con ${testimonio.nombre_cliente}`}
                className="h-auto w-full rounded-xl"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-300 group-hover:bg-slate-900/20">
                <div className="translate-y-2 rounded-full bg-white/90 p-3 text-slate-900 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="h-5 w-5" />
                </div>
              </div>
            </motion.button>
          </div>
        )}

        <div className="flex gap-1 text-lg text-yellow-400">
          {Array.from({ length: testimonio.puntuacion || 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <p className="mb-6 text-sm leading-8 text-slate-600 sm:text-base">
          "{testimonio.contenido}"
        </p>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <User className="h-5 w-5 text-slate-500" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {testimonio.nombre_cliente}
            </p>
            <p className="text-xs text-slate-500">
              {[testimonio.cargo, testimonio.empresa].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>
      </div>

      <ModalImagen
        abierto={modalAbierto}
        imagen={urlImagenTrabajo}
        alt={`Trabajo relacionado con ${testimonio.nombre_cliente}`}
        onClose={() => setModalAbierto(false)}
        layoutId={layoutIdImagen}
      />
    </>
  );
}

export default TestimonioCard;
