import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/media';

function ServicioCard({ servicio }) {
  const urlImagen = getMediaUrl(servicio?.imagen);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        {urlImagen ? (
          <img
            src={urlImagen}
            alt={servicio.titulo}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 sm:h-60">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-700 shadow-sm">
              {servicio.icono ? servicio.icono.slice(0, 2).toUpperCase() : 'SR'}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold text-slate-900">
          {servicio.titulo}
        </h3>

        <p className="mt-3 flex-1 text-base leading-7 text-slate-600">
          {servicio.descripcion_corta}
        </p>

        <div className="mt-6">
          <Link
            to={`/servicios/${servicio.slug}`}
            className="text-sm font-semibold text-slate-900 transition group-hover:text-slate-600"
          >
            Conocer más {'->'}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ServicioCard;
