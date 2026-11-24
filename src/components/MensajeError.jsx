import Boton from './Boton.jsx'

// Caja de error con un botón para reintentar
// role="alert" hace que los lectores de pantalla lo anuncien de inmediato
// onReintentar es opcional (sin él no se muestra el botón) y children agrega más botones
function MensajeError({ titulo = 'Algo salió mal', mensaje, onReintentar, children }) {
  return (
    <div
      role="alert"
      className="mx-auto my-8 max-w-lg rounded-[var(--radio)] bg-[var(--rojo-suave)] p-6 text-center"
    >
      <p aria-hidden="true" className="text-3xl">
        ⚠️
      </p>
      <p className="mt-2 font-semibold text-[var(--rojo)]">{titulo}</p>
      {mensaje && <p className="mt-1">{mensaje}</p>}
      {(onReintentar || children) && (
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {onReintentar && <Boton onClick={onReintentar}>Reintentar</Boton>}
          {children}
        </div>
      )}
    </div>
  )
}

export default MensajeError
