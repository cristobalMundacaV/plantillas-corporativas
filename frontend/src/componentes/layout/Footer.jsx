function Footer({ perfil }) {
  const direccion = perfil?.direccion;

  const mapaUrl = direccion
    ? `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`
    : null;

  const googleMapsUrl = direccion
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`
    : null;

  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Fila superior */}
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {perfil?.nombre_empresa || 'Plantilla Corporativa'}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {perfil?.subtitulo_hero ||
                'Creamos páginas web modernas, rápidas y administrables para empresas que quieren crecer.'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Navegación
            </h4>

            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#inicio" className="transition hover:text-white">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="transition hover:text-white">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/contacto" className="transition hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Contacto
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>{perfil?.correo || 'contacto@tusitio.cl'}</li>
              <li>{perfil?.telefono || '+56 9 1234 5678'}</li>
              {direccion && <li>{direccion}</li>}
            </ul>
          </div>
        </div>

        {/* Ubicación abajo ocupando todo el ancho */}
        <div className="mt-12">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Ubicación
          </h4>

          {mapaUrl ? (
            <div className="mt-4">
              <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-lg">
                <iframe
                  title="Mapa de ubicación de la empresa"
                  src={mapaUrl}
                  className="h-64 w-full border-0 md:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  Abrir en Google Maps →
                </a>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Ubicación no configurada.
            </p>
          )}
        </div>

        <div className="mt-20 rounded-[2.5rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-5 py-16 text-center shadow-xl sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            ¿Qué esperas?
          </p>

          <h4 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            ¿Necesitas una web profesional?
          </h4>

          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400 md:text-base">
            Creamos soluciones modernas, rápidas y administrables para que tu negocio crezca y capte clientes.
          </p>

          <a
            href="/contacto"
            className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-slate-200 sm:w-auto sm:px-10 sm:text-lg"
          >
            <span className="whitespace-nowrap">Solicita tu cotización</span>
            <span className="shrink-0 text-xl leading-none">→</span>
          </a>
        </div>

        <div className="my-8 h-px bg-slate-800"></div>

        <div className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()}{' '}
          {perfil?.nombre_empresa || 'Plantilla Corporativa'}. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
