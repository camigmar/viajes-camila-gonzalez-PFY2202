// Aviso de carga con un círculo que gira
// role="status" hace que los lectores de pantalla anuncien el mensaje
function Cargando({ mensaje = 'Cargando…' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-12 text-[var(--texto-suave)]">
      <span
        aria-hidden="true"
        className="h-10 w-10 rounded-full border-4 border-solid border-[var(--celeste-medio)] border-t-[var(--negro)] motion-safe:animate-spin"
      />
      <p>{mensaje}</p>
    </div>
  )
}

export default Cargando
