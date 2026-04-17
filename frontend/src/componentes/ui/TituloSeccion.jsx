function TituloSeccion({ subtitulo, titulo, descripcion }) {
return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
    {subtitulo && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        {subtitulo}
        </p>
    )}

    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {titulo}
    </h2>

    {descripcion && (
        <p className="mt-4 text-base leading-7 text-slate-600">
        {descripcion}
        </p>
    )}
    </div>
);
}

export default TituloSeccion;