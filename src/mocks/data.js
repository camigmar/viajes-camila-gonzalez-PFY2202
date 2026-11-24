// Datos de ejemplo del backend simulado (MSW)
// Los ids de vuelos y hoteles son únicos en toda la app para que la caché de Apollo no los mezcle

export const destinos = [
  {
    id: '1',
    nombre: 'Cancún',
    pais: 'México',
    descripcion: 'Playas de arena blanca y mar turquesa en el Caribe mexicano.',
    emoji: '🏖️',
    actividades: ['Snorkel en arrecifes', 'Visita a Chichén Itzá', 'Nado en cenotes', 'Paseo a Isla Mujeres'],
  },
  {
    id: '2',
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'La antigua capital inca, puerta de entrada a Machu Picchu.',
    emoji: '🏔️',
    actividades: ['Tour a Machu Picchu', 'Recorrido por el Valle Sagrado', 'Visita a la Montaña de Colores'],
  },
  {
    id: '3',
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    descripcion: 'Playas famosas, samba y vistas increíbles desde sus cerros.',
    emoji: '🌴',
    actividades: ['Subir al Cristo Redentor', 'Teleférico al Pan de Azúcar', 'Día en Copacabana', 'Show de samba'],
  },
  {
    id: '4',
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'La ciudad de la luz: arte, gastronomía y paseos junto al Sena.',
    emoji: '🗼',
    actividades: ['Subir a la Torre Eiffel', 'Visita al Museo del Louvre', 'Crucero por el Sena'],
  },
  {
    id: '5',
    nombre: 'Roma',
    pais: 'Italia',
    descripcion: 'Historia en cada esquina, del Coliseo a la Fontana di Trevi.',
    emoji: '🏛️',
    actividades: ['Tour por el Coliseo', 'Visita al Vaticano', 'Clase de pasta casera', 'Paseo por el Trastevere'],
  },
  {
    id: '6',
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Rascacielos, templos antiguos y la mejor comida callejera.',
    emoji: '🗾',
    actividades: ['Cruce de Shibuya', 'Templo Senso-ji', 'Excursión al monte Fuji', 'Mercado de Tsukiji'],
  },
]

// Vuelos por id de destino
export const vuelosPorDestino = {
  1: [
    { id: 'v1-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', destino: 'Cancún (CUN)', salida: '2026-12-10T08:30:00-03:00', llegada: '2026-12-10T16:45:00-05:00', precio: 689000, disponibilidad: true, asientosDisponibles: 14 },
    { id: 'v1-2', aerolinea: 'Copa Airlines', origen: 'Santiago (SCL)', destino: 'Cancún (CUN)', salida: '2027-01-15T06:10:00-03:00', llegada: '2027-01-15T15:20:00-05:00', precio: 612000, disponibilidad: true, asientosDisponibles: 5 },
    { id: 'v1-3', aerolinea: 'Aeroméxico', origen: 'Santiago (SCL)', destino: 'Cancún (CUN)', salida: '2027-02-20T23:55:00-03:00', llegada: '2027-02-21T09:30:00-05:00', precio: 745000, disponibilidad: false, asientosDisponibles: 0 },
  ],
  2: [
    { id: 'v2-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', destino: 'Cusco (CUZ)', salida: '2026-12-05T07:00:00-03:00', llegada: '2026-12-05T12:15:00-05:00', precio: 389000, disponibilidad: true, asientosDisponibles: 22 },
    { id: 'v2-2', aerolinea: 'Sky Airline', origen: 'Santiago (SCL)', destino: 'Cusco (CUZ)', salida: '2027-01-08T05:45:00-03:00', llegada: '2027-01-08T11:30:00-05:00', precio: 298000, disponibilidad: false, asientosDisponibles: 0 },
    { id: 'v2-3', aerolinea: 'JetSMART', origen: 'Santiago (SCL)', destino: 'Cusco (CUZ)', salida: '2027-03-12T09:20:00-03:00', llegada: '2027-03-12T15:05:00-05:00', precio: 275000, disponibilidad: true, asientosDisponibles: 3 },
  ],
  3: [
    { id: 'v3-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', destino: 'Río de Janeiro (GIG)', salida: '2026-12-28T10:15:00-03:00', llegada: '2026-12-28T15:40:00-03:00', precio: 459000, disponibilidad: false, asientosDisponibles: 0 },
    { id: 'v3-2', aerolinea: 'GOL', origen: 'Santiago (SCL)', destino: 'Río de Janeiro (GIG)', salida: '2027-02-03T13:30:00-03:00', llegada: '2027-02-03T18:50:00-03:00', precio: 398000, disponibilidad: true, asientosDisponibles: 18 },
    { id: 'v3-3', aerolinea: 'Sky Airline', origen: 'Santiago (SCL)', destino: 'Río de Janeiro (GIG)', salida: '2027-03-01T07:40:00-03:00', llegada: '2027-03-01T13:05:00-03:00', precio: 352000, disponibilidad: true, asientosDisponibles: 9 },
  ],
  4: [
    { id: 'v4-1', aerolinea: 'Air France', origen: 'Santiago (SCL)', destino: 'París (CDG)', salida: '2026-12-15T21:00:00-03:00', llegada: '2026-12-16T15:30:00+01:00', precio: 1290000, disponibilidad: true, asientosDisponibles: 7 },
    { id: 'v4-2', aerolinea: 'LATAM', origen: 'Santiago (SCL)', destino: 'París (CDG)', salida: '2027-01-22T19:45:00-03:00', llegada: '2027-01-23T14:10:00+01:00', precio: 1185000, disponibilidad: false, asientosDisponibles: 0 },
    { id: 'v4-3', aerolinea: 'Iberia', origen: 'Santiago (SCL)', destino: 'París (CDG)', salida: '2027-03-05T12:20:00-03:00', llegada: '2027-03-06T10:55:00+01:00', precio: 1049000, disponibilidad: true, asientosDisponibles: 12 },
  ],
  5: [
    { id: 'v5-1', aerolinea: 'ITA Airways', origen: 'Santiago (SCL)', destino: 'Roma (FCO)', salida: '2026-12-20T18:30:00-03:00', llegada: '2026-12-21T14:20:00+01:00', precio: 1240000, disponibilidad: true, asientosDisponibles: 4 },
    { id: 'v5-2', aerolinea: 'Iberia', origen: 'Santiago (SCL)', destino: 'Roma (FCO)', salida: '2027-02-10T11:50:00-03:00', llegada: '2027-02-11T11:35:00+01:00', precio: 1098000, disponibilidad: true, asientosDisponibles: 16 },
    { id: 'v5-3', aerolinea: 'Air France', origen: 'Santiago (SCL)', destino: 'Roma (FCO)', salida: '2027-03-18T21:00:00-03:00', llegada: '2027-03-19T19:40:00+01:00', precio: 1159000, disponibilidad: false, asientosDisponibles: 0 },
  ],
  6: [
    { id: 'v6-1', aerolinea: 'Qatar Airways', origen: 'Santiago (SCL)', destino: 'Tokio (NRT)', salida: '2027-01-05T14:00:00-03:00', llegada: '2027-01-07T07:30:00+09:00', precio: 1890000, disponibilidad: false, asientosDisponibles: 0 },
    { id: 'v6-2', aerolinea: 'American Airlines', origen: 'Santiago (SCL)', destino: 'Tokio (NRT)', salida: '2027-02-14T22:10:00-03:00', llegada: '2027-02-16T15:45:00+09:00', precio: 1725000, disponibilidad: true, asientosDisponibles: 8 },
    { id: 'v6-3', aerolinea: 'Delta', origen: 'Santiago (SCL)', destino: 'Tokio (NRT)', salida: '2027-03-25T20:35:00-03:00', llegada: '2027-03-27T14:20:00+09:00', precio: 1659000, disponibilidad: true, asientosDisponibles: 2 },
  ],
}

// Hoteles por id de destino (fechas en formato AAAA-MM-DD)
export const hotelesPorDestino = {
  1: [
    { id: 'h1-1', nombre: 'Hotel Caribe Azul', estrellas: 5, precioNoche: 185000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 6 },
    { id: 'h1-2', nombre: 'Posada Coral', estrellas: 3, precioNoche: 68000, fechaDesde: '2026-12-01', fechaHasta: '2027-02-28', disponible: true, habitacionesDisponibles: 11 },
    { id: 'h1-3', nombre: 'Resort Playa Turquesa', estrellas: 4, precioNoche: 132000, fechaDesde: '2027-01-10', fechaHasta: '2027-03-31', disponible: false, habitacionesDisponibles: 0 },
  ],
  2: [
    { id: 'h2-1', nombre: 'Casa Andina Plaza', estrellas: 4, precioNoche: 89000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 8 },
    { id: 'h2-2', nombre: 'Hostal Inti', estrellas: 2, precioNoche: 32000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: false, habitacionesDisponibles: 0 },
    { id: 'h2-3', nombre: 'Palacio del Inka', estrellas: 5, precioNoche: 210000, fechaDesde: '2027-01-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 3 },
  ],
  3: [
    { id: 'h3-1', nombre: 'Copacabana Sol', estrellas: 4, precioNoche: 115000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: false, habitacionesDisponibles: 0 },
    { id: 'h3-2', nombre: 'Pousada Ipanema', estrellas: 3, precioNoche: 72000, fechaDesde: '2026-12-15', fechaHasta: '2027-03-15', disponible: true, habitacionesDisponibles: 9 },
    { id: 'h3-3', nombre: 'Gran Hotel Atlântico', estrellas: 5, precioNoche: 198000, fechaDesde: '2026-12-01', fechaHasta: '2027-02-28', disponible: true, habitacionesDisponibles: 4 },
  ],
  4: [
    { id: 'h4-1', nombre: 'Hôtel Le Marais', estrellas: 4, precioNoche: 245000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 5 },
    { id: 'h4-2', nombre: 'Petit Montmartre', estrellas: 3, precioNoche: 158000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 7 },
    { id: 'h4-3', nombre: 'Palais de la Seine', estrellas: 5, precioNoche: 420000, fechaDesde: '2027-01-15', fechaHasta: '2027-03-31', disponible: false, habitacionesDisponibles: 0 },
  ],
  5: [
    { id: 'h5-1', nombre: 'Albergo del Coliseo', estrellas: 4, precioNoche: 198000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: false, habitacionesDisponibles: 0 },
    { id: 'h5-2', nombre: 'Hotel Trastevere', estrellas: 3, precioNoche: 124000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 10 },
    { id: 'h5-3', nombre: 'Villa Borghese Suites', estrellas: 5, precioNoche: 365000, fechaDesde: '2026-12-10', fechaHasta: '2027-03-20', disponible: true, habitacionesDisponibles: 2 },
  ],
  6: [
    { id: 'h6-1', nombre: 'Shinjuku Sky Hotel', estrellas: 4, precioNoche: 175000, fechaDesde: '2027-01-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 6 },
    { id: 'h6-2', nombre: 'Ryokan Asakusa', estrellas: 3, precioNoche: 112000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: false, habitacionesDisponibles: 0 },
    { id: 'h6-3', nombre: 'Imperial Ginza', estrellas: 5, precioNoche: 398000, fechaDesde: '2026-12-01', fechaHasta: '2027-03-31', disponible: true, habitacionesDisponibles: 3 },
  ],
}
