import Toast from './Toast';

function ToastContainer({ toast }) {
    return (
    <div className="pointer-events-none fixed right-6 top-6 z-[9999] flex flex-col gap-3">
    <Toast
        tipo={toast.tipo}
        mensaje={toast.mensaje}
        visible={toast.visible}
    />
    </div>
);
}

export default ToastContainer;