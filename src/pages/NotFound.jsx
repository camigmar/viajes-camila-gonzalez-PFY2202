import Boton from '../components/Boton.jsx'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'

// Página para las rutas que no existen
function NotFound() {
  return (
    <EncabezadoPagina
      antetitulo="Error 404"
      titulo="Página no encontrada"
      descripcion="Parece que este destino no está en nuestro mapa. Revisa la dirección o vuelve al inicio."
    >
      <Boton to="/" className="mt-8">
        Volver al inicio
      </Boton>
    </EncabezadoPagina>
  )
}

export default NotFound
