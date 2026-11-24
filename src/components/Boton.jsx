import { Link } from 'react-router'

// Clases que comparten todos los botones (forma de píldora)
const clasesBase =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full [font-family:inherit] no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--negro)] disabled:cursor-not-allowed'

// Colores de cada variante (incluye el estilo de deshabilitado)
const clasesVariante = {
  primario:
    'border-0 bg-[var(--negro)] text-[var(--blanco)] hover:bg-[var(--negro-hover)] disabled:bg-[#e3e7ea] disabled:text-[var(--texto-suave)] disabled:hover:bg-[#e3e7ea]',
  contorno:
    'border border-solid border-[var(--negro)] bg-transparent text-[var(--negro)] hover:bg-[var(--negro)] hover:text-[var(--blanco)] disabled:border-[#ccc] disabled:text-[#999] disabled:hover:bg-transparent disabled:hover:text-[#999]',
}

// Tamaño del botón
const clasesTamano = {
  normal: 'px-7 py-3 text-base font-semibold',
  grande: 'px-10 py-4 text-lg font-semibold',
  chico: 'px-4 py-2 text-sm font-semibold',
}

// Botón reutilizable: si recibe "to" es un enlace, si no es un botón
// variante: 'primario' | 'contorno'   tamano: 'normal' | 'grande' | 'chico'
// className queda para ubicarlo en la página (márgenes, ancho), no para cambiar su estilo
function Boton({
  to,
  type = 'button',
  variante = 'primario',
  tamano = 'normal',
  className = '',
  children,
  ...props
}) {
  const clases = `${clasesBase} ${clasesVariante[variante]} ${clasesTamano[tamano]} ${className}`

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={clases} {...props}>
      {children}
    </button>
  )
}

export default Boton
