import { formatearFechaHora } from '../utils/formatearFecha.js'
import { formatearPrecio } from '../utils/formatearPrecio.js'
import BotonReservar from './BotonReservar.jsx'
import { estadoDisponibilidad } from '../utils/estadoDisponibilidad.js'
import EtiquetaDisponibilidad from './EtiquetaDisponibilidad.jsx'
import Tarjeta from './Tarjeta.jsx'

// Tarjeta con los datos de un vuelo
function TarjetaVuelo({ vuelo }) {
  const agotado =
    estadoDisponibilidad(vuelo.disponibilidad, vuelo.asientosDisponibles) === 'agotado'

  return (
    <Tarjeta como="article" className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg">{vuelo.aerolinea}</h3>
        <EtiquetaDisponibilidad
          disponible={vuelo.disponibilidad}
          cantidad={vuelo.asientosDisponibles}
        />
      </div>
      <p className="mt-1 text-sm text-[var(--texto-suave)]">
        {vuelo.origen} <span aria-hidden="true">→</span>
        <span className="sr-only">a</span> {vuelo.destino}
      </p>

      <dl className="m-0 mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-[var(--texto-suave)]">Salida</dt>
        <dd className="m-0 font-medium">
          <time dateTime={vuelo.salida}>{formatearFechaHora(vuelo.salida)}</time>
        </dd>
        <dt className="text-[var(--texto-suave)]">Llegada</dt>
        <dd className="m-0 font-medium">
          <time dateTime={vuelo.llegada}>{formatearFechaHora(vuelo.llegada)}</time>
        </dd>
        <dt className="text-[var(--texto-suave)]">Asientos</dt>
        <dd className="m-0 font-medium">{vuelo.asientosDisponibles}</dd>
      </dl>
      <p className="mt-2 text-xs text-[var(--texto-suave)]">Horarios en hora de Chile.</p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <p>
          <span className="block text-xs text-[var(--texto-suave)]">Precio por persona</span>
          <span className="text-2xl font-semibold">{formatearPrecio(vuelo.precio)}</span>
        </p>
        <BotonReservar agotado={agotado} nombre={`vuelo de ${vuelo.aerolinea}`} />
      </div>
    </Tarjeta>
  )
}

export default TarjetaVuelo
