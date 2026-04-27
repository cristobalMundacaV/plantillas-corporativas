import api, { extraerLista } from './api';

export const getTestimonios = async () => {
    const response = await api.get('/testimonios/');
    return extraerLista(response.data, 'testimonios');
};

export const getTestimoniosDestacados = async () => {
    const response = await api.get('/testimonios/destacados/');
    return extraerLista(response.data, 'testimonios destacados');
};
