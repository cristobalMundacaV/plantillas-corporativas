import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useNavigateAndScroll from '../../hooks/useNavigateAndScroll';
import { getMediaUrl } from '../../utils/media';

function Navbar({ perfil, cargando = false }) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const goTo = useNavigateAndScroll();
    const urlLogo = getMediaUrl(perfil?.logo);

    const handleIrAInicio = () => {
    goTo('/');
    setMenuAbierto(false);
    };

    const handleIrAContacto = () => {
    goTo('/contacto');
    setMenuAbierto(false);
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

    setMenuAbierto(false);
    };

    return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={handleIrAInicio}
            className="flex items-center gap-3 text-left"
          >
            {cargando ? (
              <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200" />
            ) : (
              <>
                {urlLogo && (
                  <img
                    src={urlLogo}
                    alt={perfil?.nombre_empresa || 'Logo empresa'}
                    className="h-12 w-auto object-contain"
                  />
                )}
              </>
            )}
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={handleIrAInicio}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Inicio
            </button>

            <button
              type="button"
              onClick={handleIrAServicios}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Servicios
            </button>

            <button
              type="button"
              onClick={handleIrAContacto}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Contacto
            </button>
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={handleIrAContacto}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Cotizar
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuAbierto(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuAbierto && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
              onClick={() => setMenuAbierto(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  {urlLogo && !cargando ? (
                    <img
                      src={urlLogo}
                      alt={perfil?.nombre_empresa || 'Logo empresa'}
                      className="h-10 w-auto object-contain"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-slate-200" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setMenuAbierto(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:bg-slate-50"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.div
                className="flex h-[calc(100%-81px)] flex-col justify-between px-6 py-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: 0.08 }}
              >
                <nav className="space-y-3">
                  <button
                    type="button"
                    onClick={handleIrAInicio}
                    className="block w-full rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Inicio
                  </button>

                  <button
                    type="button"
                    onClick={handleIrAServicios}
                    className="block w-full rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Servicios
                  </button>

                  <button
                    type="button"
                    onClick={handleIrAContacto}
                    className="block w-full rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Contacto
                  </button>
                </nav>

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleIrAContacto}
                    className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Solicitar cotización
                  </button>

                  <p className="text-sm leading-7 text-slate-500">
                    Hablemos de tu proyecto y construyamos una presencia digital sólida,
                    moderna y administrable.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
    );
}

export default Navbar;
