import { useState } from 'react'
import { useNavigate } from 'react-router'
import Antetitulo from '../components/Antetitulo.jsx'
import Boton from '../components/Boton.jsx'
import BuscadorDestinos from '../components/BuscadorDestinos.jsx'
import Contenedor from '../components/Contenedor.jsx'
import Seccion from '../components/Seccion.jsx'
import Tarjeta from '../components/Tarjeta.jsx'

// Lo que ofrece la agencia (tarjetas de abajo del hero)
const ofertas = [
  {
    emoji: '✈️',
    titulo: 'Vuelos',
    texto: 'Vuelos desde Santiago a destinos de América, Europa y Asia, con precios claros.',
  },
  {
    emoji: '🏨',
    titulo: 'Hoteles',
    texto: 'Desde hostales sencillos hasta hoteles de cinco estrellas, según tu presupuesto.',
  },
  {
    emoji: '🗺️',
    titulo: 'Destinos',
    texto: 'Ideas de actividades en cada lugar para que aproveches al máximo tu viaje.',
  },
]

// Página de inicio: hero celeste con buscador y lo que ofrecemos
function Home() {
  const navigate = useNavigate()
  const [destino, setDestino] = useState('')

  // Al buscar, va a Destinos con el texto en la URL (?q=...)
  function buscar(evento) {
    evento.preventDefault()
    const texto = destino.trim()
    navigate(texto ? `/destinos?q=${encodeURIComponent(texto)}` : '/destinos')
  }

  return (
    <>
      {/* Hero: sigue el fondo celeste del menú */}
      <section
        aria-labelledby="titulo-hero"
        className="rounded-b-[var(--radio-grande)] bg-[var(--celeste)] pb-14 sm:pb-20"
      >
        <Contenedor>
          <div className="grid items-center gap-6 pt-2 md:grid-cols-[1.4fr_1fr] md:pt-8">
            {/* Emojis de decoración (en vez de fotos) */}
            <div
              aria-hidden="true"
              className="relative mx-auto h-36 w-full max-w-[280px] select-none md:order-2 md:h-72 md:max-w-none"
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -rotate-12 text-[5rem] leading-none md:text-[8.5rem]">
                ✈️
              </span>
              <span className="absolute bottom-0 left-2 text-[3.2rem] leading-none md:text-[5rem]">
                🌴
              </span>
              <span className="absolute right-2 bottom-1 text-[3.2rem] leading-none md:text-[4.5rem]">
                🏝️
              </span>
            </div>

            <div className="md:order-1">
              <Antetitulo>Es hora de viajar</Antetitulo>
              <h1 id="titulo-hero" className="mt-3 text-[2.4rem] sm:text-[3.4rem]">
                No solo lo imagines, haz que pase: viaja
              </h1>
              <p className="mt-4 max-w-lg text-[var(--texto-suave)] sm:text-lg">
                ¿Sueñas con playas de agua turquesa o con recorrer ciudades llenas de historia?
                Busca tu destino y revisa vuelos y hoteles en un solo lugar.
              </p>
            </div>
          </div>

          {/* Tarjeta blanca de búsqueda */}
          <Tarjeta
            como="form"
            role="search"
            aria-label="Buscar destinos"
            onSubmit={buscar}
            className="mt-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:p-6"
          >
            <BuscadorDestinos
              id="buscar-destino"
              valor={destino}
              onCambiar={setDestino}
              placeholder="¿A dónde quieres ir?"
            />
            <Boton type="submit">
              {/* Ícono de lupa */}
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
              Buscar
            </Boton>
          </Tarjeta>
        </Contenedor>
      </section>

      <Contenedor className="pt-16 sm:pt-24">
        <Seccion
          titulo="Descubre lo que ofrecemos"
          descripcion="Todo lo que necesitas para planificar tu viaje desde Santiago, en un solo lugar."
        >
          <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
            {ofertas.map((oferta) => (
              <li key={oferta.titulo}>
                <Tarjeta className="h-full p-8 text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--celeste)] text-3xl"
                  >
                    {oferta.emoji}
                  </span>
                  <h3 className="mt-5 text-xl">{oferta.titulo}</h3>
                  <p className="mt-2 text-[var(--texto-suave)]">{oferta.texto}</p>
                </Tarjeta>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Boton to="/destinos" variante="contorno">
              Ver todos los destinos
            </Boton>
          </div>
        </Seccion>
      </Contenedor>
    </>
  )
}

export default Home
