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

        <div className="mt-12 rounded-[2rem] border border-slate-800 bg-slate-900/70 px-6 py-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Cierre de proyecto
          </p>
          <h4 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            ¿Necesitas una web profesional?
          </h4>
          <a
            href="/contacto"
            className="mt-5 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Solicita tu cotización →
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
