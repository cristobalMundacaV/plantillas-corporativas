import api from './api';

export const obtenerPerfilEmpresa = async () => {
    const response = await api.get('/core/empresa/');
    return response.data;
};