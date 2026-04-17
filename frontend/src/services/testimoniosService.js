import api from './api';

export const getTestimonios = async () => {
    const response = await api.get('/testimonios/');
    return response.data;
};

export const getTestimoniosDestacados = async () => {
    const response = await api.get('/testimonios/destacados/');
    return response.data;
};
