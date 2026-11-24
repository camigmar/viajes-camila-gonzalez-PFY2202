import { useEffect, useState } from 'react'
import { obtenerDestino } from '../api/destinosApi.js'

// Trae un destino por su id (REST)
// Devuelve los datos, si está cargando, el error y una función para reintentar
// Si el destino no existe, error.estado es 404
export function useDestino(id) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  // Al cambiar este número el efecto vuelve a pedir los datos
  const [intento, setIntento] = useState(0)

  // Si cambia el id, se limpia lo anterior durante el render
  // (así no se ve un momento el destino viejo)
  const [idAnterior, setIdAnterior] = useState(id)
  if (id !== idAnterior) {
    setIdAnterior(id)
    setDatos(null)
    setError(null)
    setCargando(true)
  }

  useEffect(() => {
    // Permite cancelar la petición si se cambia de destino o se sale de la página
    const controlador = new AbortController()

    obtenerDestino(id, controlador.signal)
      .then((destino) => {
        setDatos(destino)
        setCargando(false)
      })
      .catch((err) => {
        // Cancelar no es un error real, se ignora
        if (err.name === 'AbortError') return
        setError(err)
        setCargando(false)
      })

    return () => controlador.abort()
  }, [id, intento])

  function reintentar() {
    setError(null)
    setCargando(true)
    setIntento((n) => n + 1)
  }

  return { datos, cargando, error, reintentar }
}
