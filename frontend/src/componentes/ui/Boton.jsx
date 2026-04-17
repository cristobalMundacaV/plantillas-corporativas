function Boton({ children, className = '', ...props }) {
return (
    <button
    className={`rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 ${className}`}
    {...props}
    >
    {children}
    </button>
);
}

export default Boton;