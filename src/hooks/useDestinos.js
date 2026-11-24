import { useEffect, useState } from 'react'
import { obtenerDestinos } from '../api/destinosApi.js'

// Trae la lista de destinos (REST)
// Devuelve los datos, si está cargando, el error y una función para reintentar
export function useDestinos() {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  // Al cambiar este número el efecto vuelve a pedir los datos
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    // Permite cancelar la petición si el componente se desmonta
    const controlador = new AbortController()

    obtenerDestinos(controlador.signal)
      .then((destinos) => {
        setDatos(destinos)
        setCargando(false)
      })
      .catch((err) => {
        // Cancelar no es un error real, se ignora
        if (err.name === 'AbortError') return
        setError(err)
        setCargando(false)
      })

    return () => controlador.abort()
  }, [intento])

  function reintentar() {
    setError(null)
    setCargando(true)
    setIntento((n) => n + 1)
  }

  return { datos, cargando, error, reintentar }
}
