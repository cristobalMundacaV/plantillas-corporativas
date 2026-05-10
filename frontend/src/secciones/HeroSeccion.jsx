import useNavigateAndScroll from '../hooks/useNavigateAndScroll';
import { getMediaUrl } from '../utils/media';

function HeroSeccion({ perfil, cargando }) {
  const goTo = useNavigateAndScroll();

  const urlImagenHero = getMediaUrl(perfil?.imagen_hero);

  const handleIrAContacto = () => {
    goTo('/contacto');
  };

  const handleIrAServicios = () => {
    if (window.location.pathname !== '/') {
      goTo('/');
      setTimeout(() => {
        document.getElementById('servicios')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 150);
    } else {
      document.getElementById('servicios')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0">
        {cargando ? (
          <div className="h-full w-full bg-slate-900" />
        ) : urlImagenHero ? (
          <img
            src={urlImagenHero}
            alt={perfil?.titulo_hero || 'Imagen principal'}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-slate-900" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/35" />

      <div className="relative mx-auto flex min-h-[auto] max-w-7xl items-center px-6 py-16 md:min-h-[calc(100vh-80px)] md:py-20">
        <div className="max-w-3xl">
          {cargando ? (
            <div className="animate-pulse">
              <div className="mb-4 h-4 w-40 rounded bg-slate-700/80" />
              <div className="h-12 w-full max-w-xl rounded bg-slate-700/80 md:h-16" />
              <div className="mt-4 h-12 w-5/6 rounded bg-slate-800/80 md:h-16" />
              <div className="mt-6 h-5 w-full max-w-2xl rounded bg-slate-700/80" />
              <div className="mt-3 h-5 w-4/5 rounded bg-slate-800/80" />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="h-12 w-44 rounded-full bg-slate-700/80" />
                <div className="h-12 w-40 rounded-full bg-slate-800/80" />
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200 sm:text-sm">
                {perfil?.rubro || 'RUBRO NO CONFIGURADO'}
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {perfil?.titulo_hero || 'Título no configurado'}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {perfil?.subtitulo_hero || 'Subtítulo no configurado'}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleIrAContacto}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 sm:w-auto"
                >
                  Solicitar cotización
                </button>

                <button
                  type="button"
                  onClick={handleIrAServicios}
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Ver servicios
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSeccion;
