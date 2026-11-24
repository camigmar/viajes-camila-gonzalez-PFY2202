import { gql } from '@apollo/client'

// Vuelos y hoteles de un destino
// El nombre "GetOpcionesViaje" debe ser igual al del handler de MSW
export const GET_OPCIONES_VIAJE = gql`
  query GetOpcionesViaje($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      origen
      destino
      salida
      llegada
      precio
      disponibilidad
      asientosDisponibles
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      estrellas
      precioNoche
      fechaDesde
      fechaHasta
      disponible
      habitacionesDisponibles
    }
  }
`
