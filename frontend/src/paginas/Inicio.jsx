import { useEffect, useState } from 'react';
import Navbar from '../componentes/layout/BarraNavegacion'
import HeroSeccion from '../secciones/HeroSeccion';
import Footer from '../componentes/layout/Footer';
import { obtenerPerfilEmpresa } from '../services/coreService';
import SeccionTestimonios from '../secciones/SeccionTestimonios';
import SeccionServicio from '../secciones/SeccionServicio';

function Inicio() {
    const [perfil, setPerfil] = useState(null);
    const [cargandoPerfil, setCargandoPerfil] = useState(true);
    const [errorPerfil, setErrorPerfil] = useState('');

    useEffect(() => {
    const cargarPerfil = async () => {
        try {
        const data = await obtenerPerfilEmpresa();
        setPerfil(data);
        } catch (error) {
        console.error('Error al cargar el perfil:', error);
        setErrorPerfil('No se pudo cargar el perfil.');
        } finally {
        setCargandoPerfil(false);
        }
    };

    cargarPerfil();
    }, []);

return (
    <div className="min-h-screen bg-white text-slate-900">
        <Navbar perfil={perfil} cargando={cargandoPerfil} />
        <main>
        <HeroSeccion perfil={perfil} cargando={cargandoPerfil} error={errorPerfil} />
        <SeccionServicio />
        <SeccionTestimonios/>
        </main>
        <Footer perfil={perfil} />
    </div>
    );
}

export default Inicio;
