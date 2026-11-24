// Pastilla con un texto corto (por ejemplo una actividad)
// variante: 'celeste' (sobre fondo blanco) | 'blanca' (sobre fondo celeste)
const clasesVariante = {
  celeste: 'bg-[var(--celeste)]',
  blanca: 'bg-[var(--blanco)]',
}

function Etiqueta({ variante = 'celeste', className = '', children }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[0.8rem] font-medium text-[var(--texto)] ${clasesVariante[variante]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Etiqueta
