import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { enviarMensajeContacto } from '../services/contactoService';
import BarraNavegacion from '../componentes/layout/BarraNavegacion';
import Footer from '../componentes/layout/Footer';
import { obtenerPerfilEmpresa } from '../services/coreService';

function Contacto() {
  const [perfil, setPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [errores, setErrores] = useState({});

  const { mostrarExito, mostrarError, mostrarCargando, ocultarToast } = useToast();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await obtenerPerfilEmpresa();
        setPerfil(data);
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      } finally {
        setCargandoPerfil(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrores((prev) => {
      if (!prev[name]) return prev;
      const nuevosErrores = { ...prev };
      delete nuevosErrores[name];
      return nuevosErrores;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposRequeridos = [
      { id: 'nombre', label: 'Nombre' },
      { id: 'email', label: 'Email' },
      { id: 'mensaje', label: 'Mensaje' },
    ];

    const campoFaltante = camposRequeridos.find(({ id }) => !form[id]?.trim());

    if (campoFaltante) {
      setErrores({ [campoFaltante.id]: true });
      mostrarError(`Debes rellenar el campo ${campoFaltante.label}`);
      return;
    }

    try {
      setErrores({});
      mostrarCargando();

      const payload = {
        nombre: form.nombre,
        correo: form.email,
        mensaje: form.mensaje,
      };

      await enviarMensajeContacto(payload);

      ocultarToast();
      mostrarExito('Mensaje enviado correctamente.');

      setForm({
        nombre: '',
        email: '',
        mensaje: '',
      });
    } catch (error) {
      console.error(error);
      ocultarToast();
      mostrarError('No se pudo enviar el mensaje.');
    }
  };

  return (
    <>
      <BarraNavegacion perfil={perfil} cargando={cargandoPerfil} />
      <section className="min-h-screen bg-slate-50 pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Contacto
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Hablemos de tu proximo proyecto
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm text-slate-600 sm:text-base">
              Cuentanos que necesitas y te responderemos con una propuesta clara,
              moderna y pensada para llevar tu negocio a un siguiente nivel.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Conversemos
              </p>

              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Disenamos paginas web modernas, rapidas y administrables.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300">
                Si tienes una idea, un negocio o quieres renovar tu presencia digital,
                este es el lugar para comenzar. Trabajamos con soluciones visuales,
                profesionales y adaptables a distintos rubros.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Correo
                  </p>
                  <p className="mt-2 text-lg text-white">
                    {perfil?.correo || 'contacto@tusitio.cl'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Tiempo de respuesta
                  </p>
                  <p className="mt-2 text-lg text-white">
                    Dentro de 24 horas habiles
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Ideal para
                  </p>
                  <p className="mt-2 text-lg text-white">
                    Empresas, pymes, marcas personales y servicios profesionales
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:mt-10 md:mt-0 md:p-10">
              <h3 className="text-2xl font-bold text-slate-900">
                Listo para el primer paso?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Completa el formulario y cuentanos brevemente que necesitas.
              </p>

              <form id="form-contacto" tabIndex="-1" onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${
                      errores.nombre
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-slate-400 focus:ring-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${
                      errores.email
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-slate-400 focus:ring-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    placeholder="Cuentanos tu idea, negocio o lo que necesitas desarrollar..."
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full rounded-2xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${
                      errores.mensaje
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-slate-400 focus:ring-slate-200'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer perfil={perfil} />
    </>
  );
}

export default Contacto;
