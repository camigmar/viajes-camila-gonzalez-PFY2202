import { Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Destinos from './pages/Destinos.jsx'
import DetalleDestino from './pages/DetalleDestino.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './layouts/Layout.jsx'

function App() {
  return (
    // Rutas de la app, todas dentro del Layout
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/destinos/:id" element={<DetalleDestino />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
