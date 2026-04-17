import api from './api';

export const obtenerPerfilEmpresa = async () => {
    try {
        const response = await api.get('/core/empresa/');
        return response.data;
    } catch (error) {
        if (error?.response?.status === 404) {
            return null;
        }

        throw error;
    }
};
