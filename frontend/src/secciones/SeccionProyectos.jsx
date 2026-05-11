import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper-carousel.css';

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
  const swiperRef = useRef(null);
  const puedeUsarLoop = proyectos.length > 1;
  const usaAnchoCompleto = proyectos.length > 3;

  const irAProyecto = (direccion) => {
    const swiper = swiperRef.current;

    if (!swiper || proyectos.length <= 1) {
      return;
    }

    const siguienteIndice =
      direccion === 'next'
        ? (swiper.realIndex + 1) % proyectos.length
        : (swiper.realIndex - 1 + proyectos.length) % proyectos.length;

    swiper.slideToLoop(siguienteIndice);
  };

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
          descripcion="Explora algunos de los proyectos desarrollados, donde aplicamos diseño moderno, rendimiento y soluciones pensadas para cada tipo de negocio."
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
          <div
            className={`relative ${
              usaAnchoCompleto ? 'swiper-carousel-full-width' : ''
            }`}
            style={
              usaAnchoCompleto
                ? { '--carousel-edge-color': '#ffffff' }
                : undefined
            }
          >
            <div className="proyectos-swiper-controls">
              <button
                type="button"
                onClick={() => irAProyecto('prev')}
                className="carousel-nav-button carousel-nav-prev"
                aria-label="Ver proyecto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => irAProyecto('next')}
                className="carousel-nav-button carousel-nav-next"
                aria-label="Ver siguiente proyecto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <Swiper
              modules={[Pagination]}
              loop={puedeUsarLoop}
              loopedSlides={1}
              loopAdditionalSlides={1}
              centeredSlides={false}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={usaAnchoCompleto ? 'auto' : 1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={
                usaAnchoCompleto
                  ? undefined
                  : {
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
                    }
              }
              className="servicios-swiper h-full pb-14"
            >
              {proyectos.map((proyecto) => (
                <SwiperSlide
                  key={proyecto.id}
                  className={`h-auto flex ${
                    usaAnchoCompleto ? 'swiper-carousel-slide-fixed' : ''
                  }`}
                >
                  <div className="h-full w-full px-1 pb-2">
                    <ProyectoCard proyecto={proyecto} />
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

export default SeccionProyectos;
