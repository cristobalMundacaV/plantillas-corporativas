import axios from 'axios';

const obtenerApiUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    if (typeof window !== 'undefined' && window.location.hostname.endsWith('.vercel.app')) {
        return '/backend/api';
    }

    return '/api';
};

const API_URL = obtenerApiUrl();

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
    },
});

export const extraerLista = (data, recurso = 'recurso') => {
    if (Array.isArray(data)) {
        return data;
    }

    if (data && Array.isArray(data.results)) {
        return data.results;
    }

    throw new Error(`La respuesta de ${recurso} no es una lista valida.`);
};

export default api;
