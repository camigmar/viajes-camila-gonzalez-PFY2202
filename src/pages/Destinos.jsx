import { useState } from 'react'
import { useSearchParams } from 'react-router'
import Boton from '../components/Boton.jsx'
import BuscadorDestinos from '../components/BuscadorDestinos.jsx'
import Cargando from '../components/Cargando.jsx'
import Contenedor from '../components/Contenedor.jsx'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import MensajeError from '../components/MensajeError.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import TarjetaDestino from '../components/TarjetaDestino.jsx'
import { useDestinos } from '../hooks/useDestinos.js'

// Minúsculas y sin tildes, para que "rio" encuentre "Río de Janeiro"
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Lista de destinos (REST) con buscador por nombre o país
function Destinos() {
  // La búsqueda inicial viene de la URL (?q=...), por ejemplo desde el buscador del inicio
  const [searchParams] = useSearchParams()
  const [busqueda, setBusqueda] = useState(searchParams.get('q') ?? '')
  const { datos: destinos, cargando, error, reintentar } = useDestinos()

  const texto = normalizar(busqueda.trim())
  const filtrados = (destinos ?? []).filter(
    (destino) => normalizar(destino.nombre).includes(texto) || normalizar(destino.pais).includes(texto),
  )

  return (
    <>
      <EncabezadoPagina
        antetitulo="Elige tu próximo viaje"
        titulo="Destinos"
        descripcion="Revisa nuestros destinos y descubre qué hacer en cada uno."
      >
        <Tarjeta className="mt-8 p-5 sm:p-6">
          <BuscadorDestinos
            etiqueta="Buscar por nombre o país"
            valor={busqueda}
            onCambiar={setBusqueda}
          />
        </Tarjeta>
      </EncabezadoPagina>

      <Contenedor className="pt-10">
        {cargando && <Cargando mensaje="Cargando destinos…" />}

        {error && (
          <MensajeError
            titulo="No pudimos cargar los destinos"
            mensaje={error.message}
            onReintentar={reintentar}
          />
        )}

        {destinos && (
          <>
            {/* aria-live avisa al lector de pantalla cuando cambia la cantidad */}
            <p aria-live="polite" className="mb-6 text-sm text-[var(--texto-suave)]">
              {filtrados.length === destinos.length
                ? `${destinos.length} destinos`
                : `${filtrados.length} de ${destinos.length} destinos`}
            </p>

            {filtrados.length === 0 ? (
              <div className="rounded-[var(--radio)] bg-[var(--gris-fondo)] p-8 text-center">
                <p className="text-lg">No encontramos destinos para “{busqueda.trim()}”.</p>
                <p className="mt-1 text-[var(--texto-suave)]">
                  Prueba con otro nombre o país, por ejemplo “Perú”.
                </p>
                <Boton variante="contorno" className="mt-5" onClick={() => setBusqueda('')}>
                  Ver todos los destinos
                </Boton>
              </div>
            ) : (
              // Grilla: 1 columna en móvil, 2 en tablet y 3 en escritorio
              <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {filtrados.map((destino) => (
                  <li key={destino.id}>
                    <TarjetaDestino destino={destino} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Contenedor>
    </>
  )
}

export default Destinos
