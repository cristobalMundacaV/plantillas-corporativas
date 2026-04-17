import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import TituloSeccion from '../componentes/ui/TituloSeccion';
import {
  getTestimonios,
  getTestimoniosDestacados,
} from '../services/testimoniosService';
import TestimonioCard from '../componentes/ui/TestimonioCard';

function SeccionTestimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const puedeUsarLoop = testimonios.length > 3;

  useEffect(() => {
    const cargarTestimonios = async () => {
      try {
        const destacados = await getTestimoniosDestacados();

        if (destacados.length > 0) {
          setTestimonios(destacados);
        } else {
          const todos = await getTestimonios();
          setTestimonios(todos);
        }
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los testimonios.');
      } finally {
        setCargando(false);
      }
    };

    cargarTestimonios();
  }, []);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TituloSeccion
          subtitulo="Testimonios"
          titulo="La confianza de nuestros clientes respalda nuestro trabajo"
          descripcion="Cada proyecto es una oportunidad para crear experiencias digitales solidas, modernas y orientadas a resultados reales."
        />

        {cargando && (
          <p className="text-center text-slate-500">Cargando testimonios...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!cargando && !error && testimonios.length === 0 && (
          <p className="text-center text-slate-500">
            Aun no hay testimonios cargados.
          </p>
        )}

        {!cargando && !error && testimonios.length > 0 && (
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
            {testimonios.map((testimonio) => (
              <SwiperSlide key={testimonio.id} className="h-auto flex">
                <div className="h-full w-full px-1 pb-2">
                  <TestimonioCard testimonio={testimonio} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default SeccionTestimonios;
