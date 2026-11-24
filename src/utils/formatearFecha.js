// Fecha y hora de un vuelo, siempre en hora de Chile: "10-12-2026, 08:30"
const formatoFechaHora = new Intl.DateTimeFormat('es-CL', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/Santiago',
})

// Solo fecha, para las fechas de los hoteles: "1 dic 2026"
// Se usa UTC porque "2026-12-01" sin hora se lee como medianoche UTC
// (con la zona de Chile mostraría el día anterior)
const formatoFecha = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

// Recibe un texto ISO con hora, por ejemplo "2026-12-10T08:30:00-03:00"
export function formatearFechaHora(iso) {
  return formatoFechaHora.format(new Date(iso))
}

// Recibe un texto "AAAA-MM-DD"
export function formatearFecha(fecha) {
  return formatoFecha.format(new Date(fecha))
}
