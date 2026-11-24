import { formatearFecha } from '../utils/formatearFecha.js'
import { formatearPrecio } from '../utils/formatearPrecio.js'
import BotonReservar from './BotonReservar.jsx'
import { estadoDisponibilidad } from '../utils/estadoDisponibilidad.js'
import EtiquetaDisponibilidad from './EtiquetaDisponibilidad.jsx'
import Tarjeta from './Tarjeta.jsx'

// Tarjeta con los datos de un hotel
function TarjetaHotel({ hotel }) {
  const agotado =
    estadoDisponibilidad(hotel.disponible, hotel.habitacionesDisponibles) === 'agotado'
  // Estrellas llenas y vacías, por ejemplo ★★★★☆
  const estrellas = '★'.repeat(hotel.estrellas) + '☆'.repeat(5 - hotel.estrellas)

  return (
    <Tarjeta como="article" className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg">{hotel.nombre}</h3>
        <EtiquetaDisponibilidad
          disponible={hotel.disponible}
          cantidad={hotel.habitacionesDisponibles}
        />
      </div>
      <p className="mt-1 text-[#9a6b00]">
        <span aria-hidden="true">{estrellas}</span>
        <span className="sr-only">{hotel.estrellas} de 5 estrellas</span>
      </p>

      <dl className="m-0 mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-[var(--texto-suave)]">Desde</dt>
        <dd className="m-0 font-medium">
          <time dateTime={hotel.fechaDesde}>{formatearFecha(hotel.fechaDesde)}</time>
        </dd>
        <dt className="text-[var(--texto-suave)]">Hasta</dt>
        <dd className="m-0 font-medium">
          <time dateTime={hotel.fechaHasta}>{formatearFecha(hotel.fechaHasta)}</time>
        </dd>
        <dt className="text-[var(--texto-suave)]">Habitaciones</dt>
        <dd className="m-0 font-medium">{hotel.habitacionesDisponibles}</dd>
      </dl>

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <p>
          <span className="block text-xs text-[var(--texto-suave)]">Precio por noche</span>
          <span className="text-2xl font-semibold">{formatearPrecio(hotel.precioNoche)}</span>
        </p>
        <BotonReservar agotado={agotado} nombre={hotel.nombre} />
      </div>
    </Tarjeta>
  )
}

export default TarjetaHotel
