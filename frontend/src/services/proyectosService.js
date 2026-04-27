import api, { extraerLista } from './api';

export const getProyectos = async () => {
    const response = await api.get('/proyectos/');
    return extraerLista(response.data, 'proyectos');
};

export const getProyectosDestacados = async () => {
    const response = await api.get('/proyectos/destacados/');
    return extraerLista(response.data, 'proyectos destacados');
};

export const obtenerDetalleProyecto = async (slug) => {
    const response = await api.get(`/proyectos/${slug}/`);
    return response.data;
};
