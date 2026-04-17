import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import TituloSeccion from '../componentes/ui/TituloSeccion';
import {
  getProyectos,
  getProyectosDestacados,
} from '../services/proyectosService';
import ProyectoCard from '../componentes/ui/ProyectoCard';

function SeccionProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const puedeUsarLoop = proyectos.length > 3;

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const destacados = await getProyectosDestacados();

        if (destacados.length > 0) {
          setProyectos(destacados);
        } else {
          const todos = await getProyectos();
          setProyectos(todos);
        }
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los proyectos.');
      } finally {
        setCargando(false);
      }
    };

    cargarProyectos();
  }, []);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TituloSeccion
          subtitulo="Proyectos"
          titulo="Resultados reales que reflejan nuestra forma de trabajar"
          descripcion="Mostramos proyectos destacados con una vista clara del tipo de solucion, stack utilizado y detalle de cada entrega."
        />

        {cargando && (
          <p className="text-center text-slate-500">Cargando proyectos...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!cargando && !error && proyectos.length === 0 && (
          <p className="text-center text-slate-500">
            Aun no hay proyectos cargados.
          </p>
        )}

        {!cargando && !error && proyectos.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={puedeUsarLoop}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="testimonios-swiper h-full pb-14"
          >
            {proyectos.map((proyecto) => (
              <SwiperSlide key={proyecto.id} className="h-auto flex">
                <div className="h-full w-full px-1 pb-2">
                  <ProyectoCard proyecto={proyecto} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default SeccionProyectos;
