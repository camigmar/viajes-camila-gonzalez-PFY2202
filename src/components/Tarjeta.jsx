// Contenedor blanco con esquinas muy redondeadas y sombra suave
// "como" elige la etiqueta (div, article, form...) y className agrega clases extra
// El resto de props (onSubmit, role...) pasan directo a la etiqueta
function Tarjeta({ como: Etiqueta = 'div', className = '', children, ...props }) {
  return (
    <Etiqueta
      className={`rounded-[var(--radio)] bg-[var(--blanco)] shadow-[var(--sombra)] ${className}`}
      {...props}
    >
      {children}
    </Etiqueta>
  )
}

export default Tarjeta
