import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import Antetitulo from '../components/Antetitulo.jsx'
import Boton from '../components/Boton.jsx'
import Cargando from '../components/Cargando.jsx'
import Contenedor from '../components/Contenedor.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import MensajeError from '../components/MensajeError.jsx'
import TarjetaHotel from '../components/TarjetaHotel.jsx'
import TarjetaVuelo from '../components/TarjetaVuelo.jsx'
import { GET_OPCIONES_VIAJE } from '../graphql/queries.js'
import { useDestino } from '../hooks/useDestino.js'

// Pestañas para elegir qué se muestra
const pestanas = [
  { valor: 'vuelos', texto: 'Vuelos' },
  { valor: 'hoteles', texto: 'Hoteles' },
]

// Detalle de un destino: datos por REST y vuelos/hoteles por GraphQL
function DetalleDestino() {
  const { id } = useParams()
  const [tipo, setTipo] = useState('vuelos')
  const [soloDisponibles, setSoloDisponibles] = useState(false)

  // REST: nombre, país, descripción y actividades
  const { datos: destino, cargando, error, reintentar } = useDestino(id)

  // GraphQL: vuelos y hoteles. notifyOnNetworkStatusChange hace que
  // "loading" vuelva a true al reintentar, así se ve el aviso de carga
  const {
    data,
    loading: cargandoOpciones,
    error: errorOpciones,
    refetch,
  } = useQuery(GET_OPCIONES_VIAJE, {
    variables: { destinoId: id },
    notifyOnNetworkStatusChange: true,
  })

  // Si el destino no existe no tiene sentido mostrar vuelos ni hoteles
  const noExiste = error?.estado === 404

  // Lista que se muestra según la pestaña y el filtro
  const vuelos = (data?.vuelos ?? []).filter((v) => !soloDisponibles || v.disponibilidad)
  const hoteles = (data?.hoteles ?? []).filter((h) => !soloDisponibles || h.disponible)
  const lista = tipo === 'vuelos' ? vuelos : hoteles
  const total = tipo === 'vuelos' ? (data?.vuelos.length ?? 0) : (data?.hoteles.length ?? 0)

  function reintentarOpciones() {
    // refetch devuelve una promesa que falla si vuelve a haber error;
    // el error ya se muestra con errorOpciones, así que aquí se ignora
    refetch().catch(() => {})
  }

  return (
    <>
      {/* Encabezado celeste con los datos del destino (REST) */}
      <div className="rounded-b-[var(--radio-grande)] bg-[var(--celeste)] pt-4 pb-12 sm:pb-16">
        <Contenedor>
          <Boton to="/destinos" variante="contorno" tamano="chico">
            <span aria-hidden="true">←</span> Volver a destinos
          </Boton>

          {cargando && <Cargando mensaje="Cargando destino…" />}

          {error && (
            <MensajeError
              titulo={noExiste ? 'Destino no encontrado' : 'No pudimos cargar el destino'}
              mensaje={error.message}
              onReintentar={noExiste ? undefined : reintentar}
            >
              {noExiste && <Boton to="/destinos">Ver todos los destinos</Boton>}
            </MensajeError>
          )}

          {destino && (
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <span
                aria-hidden="true"
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[var(--radio)] bg-[var(--blanco)] text-6xl shadow-[var(--sombra)]"
              >
                {destino.emoji}
              </span>
              <div>
                <Antetitulo>{destino.pais}</Antetitulo>
                <h1 className="mt-2 text-[2.4rem] sm:text-[3.2rem]">{destino.nombre}</h1>
                <p className="mt-2 max-w-2xl text-[var(--texto-suave)] sm:text-lg">
                  {destino.descripcion}
                </p>
                <h2 className="sr-only">Actividades populares</h2>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                  {destino.actividades.map((actividad) => (
                    <li key={actividad}>
                      <Etiqueta variante="blanca">{actividad}</Etiqueta>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Contenedor>
      </div>

      {/* Vuelos y hoteles (GraphQL) */}
      {!noExiste && (
        <Contenedor como="section" className="pt-12">
          <h2 className="text-[2rem] sm:text-[2.4rem]">Opciones de viaje</h2>
          <p className="mt-2 text-[var(--texto-suave)]">
            Vuelos desde Santiago y hoteles en {destino?.nombre ?? 'el destino'}.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Botones tipo pestaña; aria-pressed indica cuál está activo */}
            <div
              role="group"
              aria-label="Tipo de opción"
              className="inline-flex self-start rounded-full bg-[var(--gris-fondo)] p-1"
            >
              {pestanas.map((pestana) => (
                <button
                  key={pestana.valor}
                  type="button"
                  aria-pressed={tipo === pestana.valor}
                  onClick={() => setTipo(pestana.valor)}
                  className={`cursor-pointer rounded-full border-0 px-6 py-2 text-base font-semibold [font-family:inherit] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--negro)] ${
                    tipo === pestana.valor
                      ? 'bg-[var(--negro)] text-[var(--blanco)]'
                      : 'bg-transparent text-[var(--texto)] hover:bg-[var(--blanco)]'
                  }`}
                >
                  {pestana.texto}
                </button>
              ))}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(evento) => setSoloDisponibles(evento.target.checked)}
                className="h-5 w-5 cursor-pointer accent-[var(--negro)]"
              />
              Solo disponibles
            </label>
          </div>

          <div className="mt-8">
            {cargandoOpciones ? (
              <Cargando mensaje="Buscando vuelos y hoteles…" />
            ) : errorOpciones ? (
              <MensajeError
                titulo="No pudimos cargar los vuelos y hoteles"
                mensaje={errorOpciones.message}
                onReintentar={reintentarOpciones}
              />
            ) : (
              data && (
                <>
                  <p aria-live="polite" className="mb-6 text-sm text-[var(--texto-suave)]">
                    Mostrando {lista.length} de {total} {tipo}
                  </p>

                  {lista.length === 0 ? (
                    <p className="rounded-[var(--radio)] bg-[var(--gris-fondo)] p-8 text-center">
                      {soloDisponibles
                        ? `No quedan ${tipo} disponibles para este destino.`
                        : `No hay ${tipo} para este destino.`}
                    </p>
                  ) : (
                    <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                      {tipo === 'vuelos'
                        ? vuelos.map((vuelo) => (
                            <li key={vuelo.id}>
                              <TarjetaVuelo vuelo={vuelo} />
                            </li>
                          ))
                        : hoteles.map((hotel) => (
                            <li key={hotel.id}>
                              <TarjetaHotel hotel={hotel} />
                            </li>
                          ))}
                    </ul>
                  )}
                </>
              )
            )}
          </div>
        </Contenedor>
      )}
    </>
  )
}

export default DetalleDestino
