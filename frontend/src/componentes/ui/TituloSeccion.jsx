import { motion } from 'framer-motion';

function TituloSeccion({ subtitulo, titulo, descripcion }) {
    return (
        <motion.div
            className="mx-auto mb-12 max-w-2xl text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {subtitulo && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {subtitulo}
                </p>
            )}

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {titulo}
            </h2>

            {descripcion && (
                <p className="mt-4 text-base leading-7 text-slate-600">
                    {descripcion}
                </p>
            )}
        </motion.div>
    );
}

export default TituloSeccion;