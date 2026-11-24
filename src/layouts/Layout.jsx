import { Outlet } from 'react-router'
import Footer from '../components/Footer.jsx'
import MenuSuperior from '../components/MenuSuperior.jsx'

// Estructura que comparten todas las páginas
function Layout() {
  return (
    // Columna del alto de la pantalla
    <div className="flex min-h-screen flex-col">
      {/* Menú de arriba */}
      <MenuSuperior />

      {/* Aquí se muestra la página actual, ocupa el espacio que sobra */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* El footer queda siempre abajo */}
      <Footer />
    </div>
  )
}

export default Layout
