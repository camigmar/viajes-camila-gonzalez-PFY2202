import Contenedor from './Contenedor.jsx'

// Pie de página que se ve en todas las páginas
function Footer() {
  return (
    <footer className="mt-16 rounded-t-[var(--radio-grande)] bg-[var(--negro)] py-10 text-[#c5ccd2]">
      <Contenedor className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold text-[var(--blanco)]">
            <span aria-hidden="true">✈️ </span>Viajes Cami
          </p>
          <p className="text-sm">Vuelos, hoteles y destinos para tu próximo viaje.</p>
        </div>
        <p className="text-xs">© 2026 Viajes Cami · Sitio de ejemplo con datos simulados</p>
      </Contenedor>
    </footer>
  )
}

export default Footer
