import api from './api';

export const enviarMensajeContacto = async (datos) => {
    const response = await api.post('/contacto/', datos);
    return response.data
};
