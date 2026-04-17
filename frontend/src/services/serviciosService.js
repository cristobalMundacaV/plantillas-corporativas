import api from './api';

export const obtenerServicios = async () => {
    const response = await api.get('/servicios/');
    return response.data;
};

export const obtenerDetalleServicio = async (slug) => {
    const response = await api.get(`/servicios/${slug}/`);
    return response.data;
};