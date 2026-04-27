import api from './api';

export const getProyectos = async () => {
    const response = await api.get('/proyectos/');
    return response.data;
};

export const getProyectosDestacados = async () => {
    const response = await api.get('/proyectos/destacados/');
    return response.data;
};

export const obtenerDetalleProyecto = async (slug) => {
    const response = await api.get(`/proyectos/${slug}/`);
    return response.data;
};
