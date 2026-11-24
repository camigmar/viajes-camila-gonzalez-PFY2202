import { http, graphql, HttpResponse, delay } from 'msw'
import { destinos, vuelosPorDestino, hotelesPorDestino } from './data.js'

// Respuestas del backend simulado (REST y GraphQL)
// Todas esperan 700 ms para que se note el estado de carga
export const handlers = [
  // REST: lista de destinos
  http.get('*/api/destinos', async () => {
    await delay(700)
    return HttpResponse.json(destinos)
  }),

  // REST: detalle de un destino, o 404 si no existe
  http.get('*/api/destinos/:id', async ({ params }) => {
    await delay(700)
    const destino = destinos.find((d) => d.id === params.id)
    if (!destino) {
      return HttpResponse.json({ mensaje: 'Destino no encontrado' }, { status: 404 })
    }
    return HttpResponse.json(destino)
  }),

  // GraphQL: vuelos y hoteles de un destino
  graphql.query('GetOpcionesViaje', async ({ variables }) => {
    await delay(700)
    const { destinoId } = variables
    if (!destinos.some((d) => d.id === destinoId)) {
      return HttpResponse.json({ errors: [{ message: 'Destino no encontrado' }] })
    }
    // __typename lo pide Apollo para guardar cada objeto en su caché
    return HttpResponse.json({
      data: {
        vuelos: vuelosPorDestino[destinoId].map((v) => ({ __typename: 'Vuelo', ...v })),
        hoteles: hotelesPorDestino[destinoId].map((h) => ({ __typename: 'Hotel', ...h })),
      },
    })
  }),
]
