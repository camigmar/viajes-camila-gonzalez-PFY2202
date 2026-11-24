// Peticiones REST de destinos; MSW responde en estas direcciones
// "signal" permite cancelar la petición (por ejemplo si se sale de la página)
const urlDestinos = `${import.meta.env.BASE_URL}api/destinos`

// Hace la petición y traduce los problemas de red a un mensaje claro
async function pedir(url, signal) {
  try {
    return await fetch(url, { signal })
  } catch (error) {
    // La cancelación se deja pasar tal cual para que el hook la ignore
    if (error.name === 'AbortError') throw error
    throw new Error('No pudimos conectarnos con el servidor. Revisa tu conexión.', {
      cause: error,
    })
  }
}

// Crea un error con el código HTTP en "estado" (por ejemplo 404)
function crearError(mensaje, estado) {
  const error = new Error(mensaje)
  error.estado = estado
  return error
}

// Lista de todos los destinos
export async function obtenerDestinos(signal) {
  const res = await pedir(urlDestinos, signal)
  if (!res.ok) {
    throw crearError(`No se pudieron cargar los destinos (error ${res.status}).`, res.status)
  }
  return res.json()
}

// Un destino por su id
export async function obtenerDestino(id, signal) {
  const res = await pedir(`${urlDestinos}/${encodeURIComponent(id)}`, signal)
  if (res.status === 404) {
    throw crearError('El destino que buscas no existe.', 404)
  }
  if (!res.ok) {
    throw crearError(`No se pudo cargar el destino (error ${res.status}).`, res.status)
  }
  return res.json()
}
