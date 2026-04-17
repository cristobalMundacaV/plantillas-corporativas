import { Check, X, Loader2 } from 'lucide-react';

function Toast({ tipo = 'success', mensaje = '', visible = false }) {
    if (!visible) return null;

    const configuracion = {
    success: {
        fondo: 'bg-emerald-500',
        icono: <Check className="h-5 w-5 text-emerald-600" />,
        texto: mensaje,
    },
    error: {
        fondo: 'bg-red-500',
        icono: <X className="h-5 w-5 text-red-600" />,
        texto: mensaje,
    },
    loading: {
        fondo: 'bg-slate-500',
        icono: <Loader2 className="h-5 w-5 animate-spin text-slate-600" />,
        texto: 'Cargando...',
    },
    };

    const actual = configuracion[tipo] || configuracion.success;

    return (
    <div
        className={`pointer-events-auto flex min-w-[320px] max-w-md items-center gap-4 rounded-2xl ${actual.fondo} px-5 py-4 text-white shadow-2xl`}
    >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
        {actual.icono}
        </div>

        <p className="text-sm font-medium leading-6">
        {actual.texto}
        </p>
    </div>
    );
}

export default Toast;