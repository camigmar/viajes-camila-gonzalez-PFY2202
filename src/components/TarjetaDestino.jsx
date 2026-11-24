import Boton from './Boton.jsx'
import Etiqueta from './Etiqueta.jsx'
import Tarjeta from './Tarjeta.jsx'

// Tarjeta de un destino para la grilla de Destinos
function TarjetaDestino({ destino }) {
  const { id, nombre, pais, descripcion, emoji, actividades } = destino

  return (
    <Tarjeta como="article" className="flex h-full flex-col p-6">
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--celeste)] text-4xl"
      >
        {emoji}
      </span>
      <h2 className="mt-5 text-2xl font-medium">{nombre}</h2>
      <p className="text-sm text-[var(--texto-suave)]">{pais}</p>
      <p className="mt-3">{descripcion}</p>

      <h3 className="mt-5 text-sm">Actividades populares</h3>
      <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
        {actividades.map((actividad) => (
          <li key={actividad}>
            <Etiqueta>{actividad}</Etiqueta>
          </li>
        ))}
      </ul>

      {/* mt-auto empuja el botón al fondo para que todas las tarjetas queden parejas */}
      <div className="mt-auto pt-6">
        <Boton
          to={`/destinos/${id}`}
          className="w-full"
          aria-label={`Ver vuelos y hoteles de ${nombre}`}
        >
          Ver vuelos y hoteles
        </Boton>
      </div>
    </Tarjeta>
  )
}

export default TarjetaDestino
