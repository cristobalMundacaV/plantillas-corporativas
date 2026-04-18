import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Expand, Layers3 } from 'lucide-react';
import ModalImagen from '../common/ModalImagen';
import { getMediaUrl } from '../../utils/media';

function ProyectoCard({ proyecto }) {
  const [modalImagenAbierta, setModalImagenAbierta] = useState(false);

  const urlImagenTrabajo = getMediaUrl(proyecto?.imagen);
  const layoutIdImagen = `proyecto-imagen-${proyecto.id}`;

  return (
    <>
      <div className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
        {urlImagenTrabajo && (
          <div className="mb-5 overflow-hidden rounded-2xl bg-slate-100">
            <motion.button
              type="button"
              layoutId={layoutIdImagen}
              onClick={() => setModalImagenAbierta(true)}
              className="group relative block w-full overflow-hidden rounded-xl"
            >
              <img
                src={urlImagenTrabajo}
                alt={proyecto.titulo}
                className="h-auto w-full rounded-xl transition duration-500 group-hover:scale-[1.02]"
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
          <Link
            to={`/proyectos/${proyecto.slug}`}
            className="transition hover:text-slate-700"
          >
            {proyecto.titulo}
          </Link>
        </h3>

        <p className="mb-5 mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {proyecto.descripcion_corta}
        </p>

        {proyecto.tecnologias && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
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

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to={`/proyectos/${proyecto.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            Ver detalles
          </Link>

          {proyecto.url_proyecto && (
            <a
              href={proyecto.url_proyecto}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
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
    </>
  );
}

export default ProyectoCard;
