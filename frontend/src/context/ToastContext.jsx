import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ToastContainer from '../componentes/common/ToastContainer';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({
    visible: false,
    tipo: 'success',
    mensaje: '',
    });

    const mostrarToast = useCallback((tipo, mensaje = '') => {
    setToast({
        visible: true,
        tipo,
        mensaje,
    });

    if (tipo !== 'loading') {
        setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
        }, 3000);
    }
    }, []);

    const ocultarToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
    }, []);

    const mostrarExito = useCallback((mensaje) => {
    mostrarToast('success', mensaje);
    }, [mostrarToast]);

    const mostrarError = useCallback((mensaje) => {
    mostrarToast('error', mensaje);
    }, [mostrarToast]);

    const mostrarCargando = useCallback(() => {
    mostrarToast('loading');
    }, [mostrarToast]);

    const value = useMemo(() => ({
    toast,
    mostrarToast,
    mostrarExito,
    mostrarError,
    mostrarCargando,
    ocultarToast,
    }), [toast, mostrarToast, mostrarExito, mostrarError, mostrarCargando, ocultarToast]);

return (
    <ToastContext.Provider value={value}>
        {children}
        <ToastContainer toast={toast} />
    </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
    }

    return context;
}
