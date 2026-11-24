import { useState } from 'react'
import Boton from './Boton.jsx'

// Botón "Reservar" de vuelos y hoteles
// Si está agotado queda deshabilitado. Todavía no hay reservas en línea,
// así que al presionarlo se avisa con un mensaje
function BotonReservar({ agotado, nombre }) {
  const [presionado, setPresionado] = useState(false)

  return (
    <div className="flex flex-col items-end gap-1">
      <Boton
        tamano="chico"
        disabled={agotado}
        onClick={() => setPresionado(true)}
        aria-label={`Reservar ${nombre}`}
      >
        Reservar
      </Boton>
      {/* role="status" anuncia el mensaje cuando aparece */}
      <p role="status" className="text-right text-xs text-[var(--texto-suave)]">
        {presionado && 'La reserva en línea estará disponible pronto.'}
      </p>
    </div>
  )
}

export default BotonReservar
