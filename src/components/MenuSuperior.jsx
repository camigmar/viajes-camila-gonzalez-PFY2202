import { Link, NavLink } from 'react-router'

// Clases del enlace: el de la página actual va en negrita
function clasesEnlace({ isActive }) {
  const base = 'rounded-full px-3 py-2 no-underline transition-colors'
  return isActive
    ? `${base} font-bold text-[var(--texto)]`
    : `${base} text-[var(--texto-suave)] hover:text-[var(--texto)]`
}

// Menú de arriba: nombre del sitio a la izquierda y enlaces a la derecha
// En móvil los elementos bajan a otra línea (flex-wrap)
function MenuSuperior() {
  return (
    <header className="bg-[var(--celeste)]">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-[var(--texto)] no-underline"
        >
          <span aria-hidden="true">✈️</span>
          Viajes Cami
        </Link>
        <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
          <li>
            {/* "end" para que Inicio solo se marque en "/" */}
            <NavLink to="/" end className={clasesEnlace}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/destinos" className={clasesEnlace}>
              Destinos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MenuSuperior
