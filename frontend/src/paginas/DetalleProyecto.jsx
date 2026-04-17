import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerDetalleProyecto } from '../services/proyectosService';
import { obtenerPerfilEmpresa } from '../services/coreService';
import GaleriaProyecto from '../componentes/ui/GaleriaProyecto';
import Footer from '../componentes/layout/Footer';
import { getMediaUrl } from '../utils/media';

function DetalleProyecto() {
  const { slug } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [proyecto, setProyecto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProyecto = async () => {
      try {
        const data = await obtenerDetalleProyecto(slug);
        setProyecto(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el proyecto.');
      } finally {
        setCargando(false);
      }
    };

    cargarProyecto();
  }, [slug]);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await obtenerPerfilEmpresa();
        setPerfil(data);
      } catch (err) {
        console.error('No se pudo cargar el perfil.', err);
      }
    };

    cargarPerfil();
  }, []);

  const urlImagen = getMediaUrl(proyecto?.imagen);

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Cargando proyecto...
      </div>
    );
  }

  if (error || !proyecto) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Proyecto no encontrado</h1>
        <p className="text-slate-500">{error || 'No pudimos encontrar este proyecto.'}</p>
        <Link
          to="/"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Link
            to="/"
            className="mb-8 inline-block text-sm font-medium text-slate-300 transition hover:text-white"
          >
            ← Volver
          </Link>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Proyecto{proyecto.tipo_proyecto ? ` - ${proyecto.tipo_proyecto}` : ''}
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {proyecto.titulo}
              </h1>

              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
                <p>
                  {proyecto.descripcion_larga || proyecto.descripcion_corta}
                </p>

                {proyecto.tecnologias && (
                  <p>
                    <span className="font-semibold text-white">Tecnologias:</span>{' '}
                    {proyecto.tecnologias}
                  </p>
                )}
              </div>
            </div>

            {urlImagen && (
              <div className="relative flex min-h-[460px] items-center justify-end md:min-h-[500px]">
                <div className="relative w-[135%] translate-x-16 md:w-[125%] md:translate-x-24">
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-sm">
                    <img
                      src={urlImagen}
                      alt={proyecto.titulo}
                      className="h-auto w-full rounded-xl object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <GaleriaProyecto
        imagenes={proyecto.imagenes || []}
        tituloProyecto={proyecto.titulo}
      />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-8 py-14 text-center text-white shadow-2xl md:px-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Sigamos avanzando
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            ¿Te interesa desarrollar un proyecto como este?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Podemos ayudarte a construir una solucion moderna, profesional y escalable,
            pensada para generar valor real y una presencia digital potente.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Solicitar cotizacion
            </Link>

            {proyecto.url_proyecto && (
              <a
                href={proyecto.url_proyecto}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver proyecto online
              </a>
            )}
          </div>
        </div>
      </section>
      <Footer perfil={perfil} />
    </div>
  );
}

export default DetalleProyecto;
