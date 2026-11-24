// Campo de texto controlado para buscar destinos, con su label
// valor y onCambiar vienen del componente padre (useState)
function BuscadorDestinos({
  id = 'buscador-destinos',
  etiqueta = 'Destino',
  valor,
  onCambiar,
  placeholder = 'Ej: Cusco o Japón',
}) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold">
        {/* Ícono de ubicación */}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        {etiqueta}
      </label>
      <input
        id={id}
        type="search"
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-2 w-full rounded-full border border-solid border-[var(--borde)] bg-[var(--gris-fondo)] px-5 py-3 text-base text-[var(--texto)] [font-family:inherit] focus:border-[var(--negro)] focus:outline-2 focus:outline-offset-1 focus:outline-[var(--negro)]"
      />
    </div>
  )
}

export default BuscadorDestinos
