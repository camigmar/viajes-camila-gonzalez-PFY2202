import Antetitulo from './Antetitulo.jsx'
import Contenedor from './Contenedor.jsx'

// Franja celeste al inicio de cada página (continúa el fondo del menú)
// antetitulo, titulo y descripcion son opcionales; children va debajo
function EncabezadoPagina({ antetitulo, titulo, descripcion, children }) {
  return (
    <div className="rounded-b-[var(--radio-grande)] bg-[var(--celeste)] pt-6 pb-12 sm:pb-16">
      <Contenedor>
        {antetitulo && <Antetitulo className="mb-3">{antetitulo}</Antetitulo>}
        {titulo && <h1 className="text-[2.4rem] sm:text-[3.2rem]">{titulo}</h1>}
        {descripcion && (
          <p className="mt-3 max-w-2xl text-[var(--texto-suave)] sm:text-lg">{descripcion}</p>
        )}
        {children}
      </Contenedor>
    </div>
  )
}

export default EncabezadoPagina
