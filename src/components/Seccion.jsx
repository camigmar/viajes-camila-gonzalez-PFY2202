// Sección con su título centrado y una descripción opcional
function Seccion({ titulo, descripcion, className = '', children }) {
  return (
    <section className={className}>
      <h2 className="text-center text-[2rem] sm:text-[2.5rem]">{titulo}</h2>
      {descripcion && (
        <p className="mx-auto mt-3 max-w-xl text-center text-[var(--texto-suave)]">{descripcion}</p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  )
}

export default Seccion
