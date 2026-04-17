import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerDetalleServicio } from '../services/serviciosService';
import { obtenerPerfilEmpresa } from '../services/coreService';
import GaleriaServicio from '../componentes/ui/GaleriaServicio';
import Footer from '../componentes/layout/Footer';
import { getMediaUrl } from '../utils/media';

function DetalleServicio() {
const { slug } = useParams();
const [perfil, setPerfil] = useState(null);
const [servicio, setServicio] = useState(null);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState('');

    useEffect(() => {
    const cargarServicio = async () => {
        try {
        const data = await obtenerDetalleServicio(slug);
        setServicio(data);
        } catch (err) {
        console.error(err);
        setError('No se pudo cargar el servicio.');
        } finally {
        setCargando(false);
        }
    };

    cargarServicio();
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

    const urlImagen = getMediaUrl(servicio?.imagen);

    if (cargando) {
    return (
        <div className="flex min-h-screen items-center justify-center text-slate-500">
        Cargando servicio...
        </div>
    );
    }

    if (error || !servicio) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Servicio no encontrado</h1>
        <p className="text-slate-500">{error || 'No pudimos encontrar este servicio.'}</p>
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
                Servicio
                </p>

                <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {servicio.titulo}
                </h1>

                <div className="mt-6 text-lg leading-8 text-slate-300">
                <p>
                    {servicio.descripcion_completa || servicio.descripcion_corta}
                </p>
                </div>
            </div>

            {urlImagen && (
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <img
                    src={urlImagen}
                    alt={servicio.titulo}
                    className="h-full w-full object-cover"
                />
                </div>
            )}
            </div>
        </div>
        </section>

        <GaleriaServicio
        imagenes={servicio.imagenes || []}
        tituloServicio={servicio.titulo}
        />

        <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-8 py-14 text-center text-white shadow-2xl md:px-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Sigamos avanzando
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            ¿Te interesa este servicio para tu negocio?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Podemos ayudarte a desarrollar una solución moderna, profesional y administrable,
            pensada para mostrar valor real y ayudarte a crecer digitalmente.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
                to="/contacto"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
                Solicitar cotización
            </Link>

            <Link
                to="/"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
                Volver al inicio
            </Link>
            </div>
        </div>
        </section>
        <Footer perfil={perfil} />
    </div>
    );
}

export default DetalleServicio;
