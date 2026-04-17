import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import TituloSeccion from '../componentes/ui/TituloSeccion';
import ServicioCard from '../componentes/ui/ServicioCard';
import { obtenerServicios } from '../services/serviciosService';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SeccionServicio() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const data = await obtenerServicios();
        setServicios(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los servicios.');
      } finally {
        setCargando(false);
      }
    };

    cargarServicios();
  }, []);

  return (
    <section id="servicios" className="bg-slate-50 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TituloSeccion
          subtitulo="Nuestros servicios"
          titulo="Soluciones pensadas para empresas que quieren crecer"
          descripcion="Diseñamos experiencias web corporativas modernas, claras y orientadas a resultados, con una base técnica sólida y fácil de escalar."
        />

        {cargando && (
          <p className="text-center text-slate-500">Cargando servicios...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!cargando && !error && servicios.length > 0 && (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="servicios-swiper h-full pb-14"
            >
              {servicios.map((servicio) => (
                <SwiperSlide key={servicio.id} className="h-auto flex">
                  <div className="h-full w-full px-1 pb-2">
                    <ServicioCard servicio={servicio} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

export default SeccionServicio;
