import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Expand, Layers3 } from 'lucide-react';
import ModalImagen from '../common/ModalImagen';
import { getMediaUrl } from '../../utils/media';

function ProyectoCard({ proyecto }) {
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modalImagenAbierta, setModalImagenAbierta] = useState(false);

  const urlImagenTrabajo = getMediaUrl(proyecto?.imagen);
  const layoutIdImagen = `proyecto-imagen-${proyecto.id}`;

  return (
    <>
      <div className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
        {urlImagenTrabajo && (
          <div className="mb-5 overflow-hidden rounded-2xl bg-slate-100 p-2 shadow-inner">
            <motion.button
              type="button"
              layoutId={layoutIdImagen}
              onClick={() => setModalImagenAbierta(true)}
              className="group relative block w-full overflow-hidden rounded-xl"
            >
              <img
                src={urlImagenTrabajo}
                alt={proyecto.titulo}
                className="h-56 w-full rounded-xl object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-300 group-hover:bg-slate-900/20">
                <div className="translate-y-2 rounded-full bg-white/90 p-3 text-slate-900 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="h-5 w-5" />
                </div>
              </div>
            </motion.button>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            {proyecto.tipo_proyecto}
          </span>
          {proyecto.destacado && (
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Destacado
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          {proyecto.titulo}
        </h3>

        <p className="mb-5 mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {proyecto.descripcion_corta}
        </p>

        {proyecto.tecnologias && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Layers3 className="h-5 w-5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Tecnologias
              </p>
              <p className="text-sm text-slate-700">
                {proyecto.tecnologias}
              </p>
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setModalDetalleAbierto(true)}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Ver detalle
          </button>

          {proyecto.url_proyecto && (
            <a
              href={proyecto.url_proyecto}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Ver proyecto
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <ModalImagen
        abierto={modalImagenAbierta}
        imagen={urlImagenTrabajo}
        alt={proyecto.titulo}
        onClose={() => setModalImagenAbierta(false)}
        layoutId={layoutIdImagen}
      />

      <AnimatePresence>
        {modalDetalleAbierto && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setModalDetalleAbierto(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex min-h-full items-center justify-center p-4 md:p-8">
              <motion.div
                className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {urlImagenTrabajo && (
                  <motion.img
                    layoutId={layoutIdImagen}
                    src={urlImagenTrabajo}
                    alt={proyecto.titulo}
                    className="h-72 w-full object-cover sm:h-80"
                  />
                )}

                <div className="space-y-5 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                      {proyecto.tipo_proyecto}
                    </span>
                    {proyecto.destacado && (
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Destacado
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {proyecto.titulo}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-slate-600">
                      {proyecto.descripcion_larga}
                    </p>
                  </div>

                  {proyecto.tecnologias && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tecnologias
                      </p>
                      <p className="mt-2 text-sm text-slate-700 sm:text-base">
                        {proyecto.tecnologias}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setModalDetalleAbierto(false)}
                      className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cerrar
                    </button>

                    {proyecto.url_proyecto && (
                      <a
                        href={proyecto.url_proyecto}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Ir al proyecto
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProyectoCard;
