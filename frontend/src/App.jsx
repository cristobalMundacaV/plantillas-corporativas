import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Inicio from './paginas/Inicio';
import DetalleServicio from './paginas/DetalleServicio';
import DetalleProyecto from './paginas/DetalleProyecto';
import Contacto from './paginas/Contacto';

function TransicionPagina({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.995 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <TransicionPagina>
              <Inicio />
            </TransicionPagina>
          }
        />
        <Route
          path="/contacto"
          element={
            <TransicionPagina>
              <Contacto />
            </TransicionPagina>
          }
        />
        <Route
          path="/servicios/:slug"
          element={
            <TransicionPagina>
              <DetalleServicio />
            </TransicionPagina>
          }
        />
        <Route
          path="/proyectos/:slug"
          element={
            <TransicionPagina>
              <DetalleProyecto />
            </TransicionPagina>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
