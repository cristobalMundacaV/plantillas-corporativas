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
      <div className="mx-auto grid min-h-[auto] max-w-7xl items-center gap-10 px-6 py-12 md:min-h-[calc(100vh-80px)] md:gap-12 md:py-20 lg:grid-cols-2">
        <div className="order-1">
          {cargando ? (
            <div className="animate-pulse">
              <div className="mb-4 h-4 w-40 rounded bg-slate-700" />
              <div className="h-12 w-full max-w-xl rounded bg-slate-700 md:h-16" />
              <div className="mt-4 h-12 w-5/6 rounded bg-slate-800 md:h-16" />
              <div className="mt-6 h-5 w-full max-w-2xl rounded bg-slate-700" />
              <div className="mt-3 h-5 w-4/5 rounded bg-slate-800" />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="h-12 w-44 rounded-full bg-slate-700" />
                <div className="h-12 w-40 rounded-full bg-slate-800" />
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 sm:text-sm">
                {perfil?.rubro || 'RUBRO NO CONFIGURADO'}
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {perfil?.titulo_hero || 'Título no configurado'}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {perfil?.subtitulo_hero || 'Subtítulo no configurado'}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleIrAContacto}
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-auto"
                >
                  Solicitar cotización
                </button>

                <button
                  type="button"
                  onClick={handleIrAServicios}
                  className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Ver servicios
                </button>
              </div>
            </>
          )}
        </div>

        <div className="order-2 mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur sm:p-4 md:p-5">
            <div className="overflow-hidden rounded-[1.75rem] bg-slate-900">
              {cargando ? (
                <div className="animate-pulse">
                  <div className="h-64 w-full bg-slate-800 sm:h-72 md:h-[420px]" />
                </div>
              ) : urlImagenHero ? (
                <img
                  src={urlImagenHero}
                  alt={perfil?.titulo_hero || 'Imagen principal'}
                  className="h-72 w-full object-cover object-center sm:h-80 md:h-[420px] lg:h-[460px]"
                />
              ) : (
                <div className="flex h-72 items-center justify-center bg-slate-800 text-sm text-slate-400 sm:h-80 md:h-[420px] lg:h-[460px]">
                  Imagen hero no configurada
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSeccion;
