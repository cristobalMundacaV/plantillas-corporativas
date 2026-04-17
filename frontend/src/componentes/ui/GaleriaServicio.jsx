import { useState } from 'react';
import { Expand } from 'lucide-react';
import ModalImagen from '../common/ModalImagen';
import { getMediaUrl } from '../../utils/media';

function GaleriaServicio({ imagenes = [], tituloServicio }) {
    const [imagenActiva, setImagenActiva] = useState(null);

    if (!imagenes.length) return null;

    const obtenerUrlImagen = (imagen) => {
    if (!imagen?.imagen) return null;
    return getMediaUrl(imagen.imagen);
    };

    return (
    <>
        <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Portafolio visual
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Conoce cómo llevamos cada proyecto a la realidad. 
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Esta sección muestra el paso a paso de nuestro proceso, junto con evidencias visuales y resultados reales que garantizan la calidad de nuestros servicios.
            </p>
        </div>

        <div className="space-y-10">
            {imagenes.map((item, index) => {
            const urlImagen = obtenerUrlImagen(item);
            const invertido = index % 2 !== 0;

            return (
                <article
                key={item.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
                >
                <div className="grid md:grid-cols-2">
                  {/* Imagen */}
                    <div
                    className={`bg-white p-6 md:p-8 ${
                        invertido ? 'md:order-2' : 'md:order-1'
                    }`}
                    >
                    <button
                        type="button"
                        onClick={() => setImagenActiva(item)}
                        className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-slate-50"
                    >
                        <img
                        src={urlImagen}
                        alt={item.titulo || tituloServicio}
                        className="h-auto w-full rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-[1.02]"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-300 group-hover:bg-slate-900/20">
                        <div className="translate-y-2 rounded-full bg-white/90 p-3 text-slate-900 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <Expand className="h-5 w-5" />
                        </div>
                        </div>
                    </button>
                    </div>

                  {/* Texto */}
                    <div
                    className={`flex items-center bg-sky-100/70 p-8 md:p-10 ${
                        invertido ? 'md:order-1' : 'md:order-2'
                    }`}
                    >
                    <div>

                        <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        {item.titulo || 'Vista del servicio'}
                        </h3>

                        <p className="mt-5 text-base leading-8 text-slate-700">
                        {item.descripcion ||
                            `Imagen relacionada con el servicio ${tituloServicio}, utilizada para mostrar resultados, ejemplos visuales o material asociado al trabajo realizado.`}
                        </p>
                    </div>
                    </div>
                </div>
                </article>
            );
            })}
        </div>
        </section>

        <ModalImagen
        abierto={!!imagenActiva}
        imagen={imagenActiva ? obtenerUrlImagen(imagenActiva) : null}
        alt={imagenActiva?.titulo || tituloServicio}
        onClose={() => setImagenActiva(null)}
        />
    </>
    );
}

export default GaleriaServicio;