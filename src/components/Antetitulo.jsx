// Texto chico con una línea a la izquierda, va sobre los títulos ("— Es hora de viajar")
function Antetitulo({ className = '', children }) {
  return (
    <p className={`flex items-center gap-3 text-[var(--texto-suave)] ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-[var(--texto-suave)]" />
      {children}
    </p>
  )
}

export default Antetitulo
