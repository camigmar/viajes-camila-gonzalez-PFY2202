import { estadoDisponibilidad } from '../utils/estadoDisponibilidad.js'

// Cada estado tiene texto e ícono, así no depende solo del color
const estados = {
  disponible: {
    texto: 'Disponible',
    icono: '✓',
    clases: 'bg-[var(--verde-suave)] text-[var(--verde)]',
  },
  pocas: {
    texto: 'Pocas unidades',
    icono: '!',
    clases: 'bg-[var(--ambar-suave)] text-[var(--ambar)]',
  },
  agotado: {
    texto: 'Agotado',
    icono: '✕',
    clases: 'bg-[var(--rojo-suave)] text-[var(--rojo)]',
  },
}

// Pastilla con el estado de un vuelo u hotel
function EtiquetaDisponibilidad({ disponible, cantidad }) {
  const estado = estados[estadoDisponibilidad(disponible, cantidad)]

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${estado.clases}`}
    >
      <span aria-hidden="true">{estado.icono}</span>
      {estado.texto}
    </span>
  )
}

export default EtiquetaDisponibilidad
