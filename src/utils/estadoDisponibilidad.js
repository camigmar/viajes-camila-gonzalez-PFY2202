// Estado de un vuelo u hotel según si está disponible y cuántas unidades quedan
// 'agotado' si no está disponible o no quedan; 'pocas' si quedan menos de 5
export function estadoDisponibilidad(disponible, cantidad) {
  if (!disponible || cantidad <= 0) return 'agotado'
  if (cantidad < 5) return 'pocas'
  return 'disponible'
}
