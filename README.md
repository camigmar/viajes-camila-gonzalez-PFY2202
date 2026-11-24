# Viajes Cami ✈️

Sitio web de **Viajes Cami**, una agencia de viajes ficticia. Lo hice para el ramo **Desarrollo Frontend II (PFY2202)** de Duoc UC.

En el sitio se pueden buscar destinos por nombre o país, ver las actividades populares de cada uno y revisar los vuelos desde Santiago y los hoteles disponibles, con fechas, precios y disponibilidad.

- **Sitio publicado:** https://camigmar.github.io/viajes-camila-gonzalez-PFY2202/
- **Repositorio:** https://github.com/camigmar/viajes-camila-gonzalez-PFY2202

Los datos son de ejemplo. No hay un backend real: las respuestas las entrega un backend simulado con MSW que corre dentro del navegador (ver [Por qué MSW funciona también en producción](#por-qué-msw-funciona-también-en-producción)).

## Tecnologías

| Tecnología | Para qué la uso |
|---|---|
| React | Componentes y estado de la interfaz (`useState`, `useEffect`) |
| Vite | Servidor de desarrollo y build |
| React Router | Rutas de las páginas (`BrowserRouter`, `Routes`, `NavLink`, `useParams`, `useSearchParams`, `useNavigate`) |
| Tailwind CSS | Todos los estilos de componentes y páginas |
| Apollo Client | Consultas GraphQL de vuelos y hoteles (`ApolloProvider`, `useQuery`) |
| MSW (Mock Service Worker) | Backend simulado: responde las peticiones REST y GraphQL desde un service worker |
| gh-pages | Publicar la carpeta `dist` en la rama `gh-pages` (GitHub Pages) |

## Cómo correrlo

Necesitas tener Node.js instalado (yo uso la versión 22). En la carpeta del proyecto:

```bash
npm install       # instala las dependencias
npm run dev       # servidor de desarrollo
npm run build     # genera la carpeta dist (y dist/404.html)
npm run preview   # sirve la carpeta dist para revisarla antes de publicar
npm run lint      # revisa el código con oxlint
```

El sitio usa la ruta base `/viajes-camila-gonzalez-PFY2202/` (está en `vite.config.js`), así que también en desarrollo la dirección la incluye. Con `npm run dev` normalmente es:

```
http://localhost:5173/viajes-camila-gonzalez-PFY2202/
```

### Publicar en GitHub Pages

1. Primero subo los cambios a `main` (`git push`).
2. Después ejecuto:

```bash
npm run deploy
```

`predeploy` hace el build y `deploy` sube la carpeta `dist` a la rama `gh-pages` con el mensaje "Publico el sitio". GitHub Pages publica esa rama (carpeta raíz).

**El truco del `404.html`:** GitHub Pages solo sirve archivos que existen. Si alguien recarga en una ruta interna como `/destinos/4`, no hay ningún archivo ahí y GitHub Pages entrega su página `404.html`. Por eso el build copia `index.html` como `404.html` con el script `scripts/copiar-404.js`. Así esa "página de error" es en realidad la app completa, que carga igual, y React Router muestra la página correcta según la URL.

## Páginas y rutas

Todas las rutas están en `src/App.jsx` y comparten el `Layout` (menú superior y footer).

| Ruta | Página | Qué hace |
|---|---|---|
| `/` | `Home` | Hero celeste con una tarjeta de búsqueda (campo "Destino" y botón **Buscar**) y la sección "Descubre lo que ofrecemos" con Vuelos, Hoteles y Destinos. Al buscar, lleva a `/destinos?q=texto`. |
| `/destinos` | `Destinos` | Grilla de destinos (1, 2 o 3 columnas según el ancho) con buscador por nombre o país. Si la URL trae `?q=`, ese texto es la búsqueda inicial. Si no hay resultados muestra un mensaje y un botón para ver todos. |
| `/destinos/:id` | `DetalleDestino` | Datos del destino (REST) y sus vuelos y hoteles (GraphQL), con botones **Vuelos** / **Hoteles** y el filtro **Solo disponibles**. Si el id no existe muestra "Destino no encontrado". |
| cualquier otra | `NotFound` | "Página no encontrada" con un botón para volver al inicio. |

El menú de arriba tiene **Inicio** y **Destinos**; el enlace de la página actual va en negrita. En celular los elementos bajan a otra línea.

## API REST simulada

Los handlers están en `src/mocks/handlers.js` y los datos en `src/mocks/data.js`. Todas las respuestas esperan 700 ms (`delay(700)`) para que se note el estado de carga. Las funciones que las llaman están en `src/api/destinosApi.js`.

| Método | Endpoint | Respuesta |
|---|---|---|
| GET | `api/destinos` | Lista con los 6 destinos |
| GET | `api/destinos/:id` | Un destino, o **404** si no existe |

Los endpoints van después de la ruta base, por ejemplo `/viajes-camila-gonzalez-PFY2202/api/destinos`. Los handlers usan `*/api/destinos` para que funcionen con cualquier ruta base.

Ejemplo: `GET api/destinos/2`

```json
{
  "id": "2",
  "nombre": "Cusco",
  "pais": "Perú",
  "descripcion": "La antigua capital inca, puerta de entrada a Machu Picchu.",
  "emoji": "🏔️",
  "actividades": [
    "Tour a Machu Picchu",
    "Recorrido por el Valle Sagrado",
    "Visita a la Montaña de Colores"
  ]
}
```

Error: `GET api/destinos/99` responde con estado **404** y:

```json
{ "mensaje": "Destino no encontrado" }
```

En `destinosApi.js`, si la respuesta no es `ok` se lanza un `Error` con un mensaje claro ("El destino que buscas no existe." para el 404) y el código HTTP en `error.estado`. Si falla la conexión, el mensaje es "No pudimos conectarnos con el servidor. Revisa tu conexión."

## API GraphQL simulada

El cliente está en `src/api/apolloClient.js` (`ApolloClient` con `HttpLink` a `graphql` y `InMemoryCache`) y la consulta en `src/graphql/queries.js`. El handler usa `graphql.query('GetOpcionesViaje', ...)`, así que **el nombre de la operación tiene que ser el mismo** en la consulta y en el handler.

```graphql
query GetOpcionesViaje($destinoId: ID!) {
  vuelos(destinoId: $destinoId) {
    id
    aerolinea
    origen
    destino
    salida
    llegada
    precio
    disponibilidad
    asientosDisponibles
  }
  hoteles(destinoId: $destinoId) {
    id
    nombre
    estrellas
    precioNoche
    fechaDesde
    fechaHasta
    disponible
    habitacionesDisponibles
  }
}
```

Ejemplo con `{ "destinoId": "2" }` (recortado a un vuelo y un hotel; en realidad vienen 3 de cada uno):

```json
{
  "data": {
    "vuelos": [
      {
        "__typename": "Vuelo",
        "id": "v2-2",
        "aerolinea": "Sky Airline",
        "origen": "Santiago (SCL)",
        "destino": "Cusco (CUZ)",
        "salida": "2027-01-08T05:45:00-03:00",
        "llegada": "2027-01-08T11:30:00-05:00",
        "precio": 298000,
        "disponibilidad": false,
        "asientosDisponibles": 0
      }
    ],
    "hoteles": [
      {
        "__typename": "Hotel",
        "id": "h2-1",
        "nombre": "Casa Andina Plaza",
        "estrellas": 4,
        "precioNoche": 89000,
        "fechaDesde": "2026-12-01",
        "fechaHasta": "2027-03-31",
        "disponible": true,
        "habitacionesDisponibles": 8
      }
    ]
  }
}
```

- Los ids de vuelos y hoteles son únicos en toda la app (`v2-1`, `h4-3`...) para que la caché de Apollo no mezcle los de distintos destinos.
- El handler agrega `__typename` porque Apollo lo usa para guardar cada objeto en su caché.
- Las fechas de los vuelos son ISO con zona horaria. Las de los hoteles son `AAAA-MM-DD`.

Error: con un `destinoId` que no existe (por ejemplo `"99"`) responde:

```json
{ "errors": [{ "message": "Destino no encontrado" }] }
```

Apollo lo entrega como `error` en `useQuery` y la página muestra el mensaje con un botón **Reintentar** (que llama a `refetch`).

## Por qué MSW funciona también en producción

GitHub Pages solo publica archivos estáticos: no puede ejecutar un backend. Si MSW solo corriera en desarrollo, el sitio publicado pediría `api/destinos` y `graphql` y no recibiría respuesta.

Por eso en `src/main.jsx` la función `enableMocking()` inicia MSW **siempre**, sin condicionarla a `import.meta.env.DEV`:

- `worker.start()` registra el service worker `public/mockServiceWorker.js` (lo creó `npx msw init public/ --save`). Vite lo copia a `dist`, así que también se publica.
- La dirección del worker usa `import.meta.env.BASE_URL`, porque en GitHub Pages el sitio no está en la raíz del dominio.
- `onUnhandledRequest: 'bypass'` deja pasar normal todo lo que no tiene handler (scripts, estilos, imágenes).
- La app se renderiza recién después de `await enableMocking()`, así ninguna petición sale antes de que el worker esté listo.

### Por qué versiones fijas

En `package.json` las versiones quedan en estas líneas mayores:

| Paquete | Versión | Por qué |
|---|---|---|
| `@apollo/client` | 3.14.1 | Apollo 4 cambió la forma de importar los hooks y otras APIs; el proyecto usa la de Apollo 3 (`useQuery` desde `'@apollo/client'`). |
| `graphql` | 16 | Es la versión que usa Apollo 3. |
| `msw` | 2 | La API de los handlers (`http`, `graphql`, `HttpResponse`, `delay`) es la de MSW 2. |

Si se instala la última versión de cada uno, Apollo 4 no es compatible con este código.

## Estado

No hay estado global: cada página maneja su propio estado con `useState`, y las peticiones REST se hacen con `useEffect` dentro de hooks propios.

| Estado | Dónde | Qué hace |
|---|---|---|
| `datos`, `cargando`, `error` | `useDestinos` y `useDestino(id)` (`useState` + `useEffect`) | Piden los datos REST al montar (y al cambiar el id). Devuelven también `reintentar`. |
| Texto de búsqueda | `Home` (`useState`) | Valor del campo "Destino". Al enviar, se navega a `/destinos?q=texto` con `useNavigate`. |
| Búsqueda de destinos | `Destinos` (`useState`) | Su valor inicial sale de `?q=` con `useSearchParams`. La lista filtrada no se guarda: se calcula en cada render con `.filter()`, sin tildes ni mayúsculas (por eso "rio" encuentra "Río de Janeiro"). |
| Pestaña Vuelos / Hoteles | `DetalleDestino` (`useState`) | Qué lista se muestra. Los botones tienen `aria-pressed`. |
| Filtro "Solo disponibles" | `DetalleDestino` (`useState`) | Checkbox que oculta las opciones agotadas. |
| Aviso al reservar | `BotonReservar` (`useState`) | Como todavía no hay reservas en línea, muestra "La reserva en línea estará disponible pronto." |

Los vuelos y hoteles no usan `useState`: los maneja Apollo con `useQuery`, que entrega `data`, `loading`, `error` y `refetch`.

### Carga y errores

- **REST (`useDestinos`, `useDestino`):** cada efecto crea un `AbortController` y cancela la petición si el componente se desmonta o cambia el id. El `AbortError` que se produce al cancelar se ignora, porque no es un error real. `reintentar` vuelve a poner `cargando` en `true` y suma 1 a un contador que está en las dependencias del efecto, así la petición se repite.
- **GraphQL (`useQuery`):** se usa `notifyOnNetworkStatusChange: true` para que `loading` vuelva a `true` al reintentar y se vea el aviso de carga.
- En el detalle, la carga y el error de REST y de GraphQL se muestran **por separado**: el encabezado depende de REST y la sección "Opciones de viaje" de GraphQL.
- Mientras carga se ve `Cargando` (`role="status"`). Si hay error se ve `MensajeError` (`role="alert"`) con el botón **Reintentar**. Si el destino no existe (404) no se ofrece Reintentar, sino un botón para ver todos los destinos, y no se muestra la sección de vuelos y hoteles.

## Estructura de carpetas

```
├── public/            favicon.svg y mockServiceWorker.js (service worker de MSW)
├── scripts/           copiar-404.js (copia dist/index.html a dist/404.html)
├── src/
│   ├── api/           apolloClient.js (GraphQL) y destinosApi.js (REST)
│   ├── components/    componentes reutilizables
│   ├── graphql/       queries.js (GET_OPCIONES_VIAJE)
│   ├── hooks/         useDestinos y useDestino
│   ├── layouts/       Layout con el menú y el footer
│   ├── mocks/         backend simulado: datos, handlers y worker de MSW
│   ├── pages/         una página por ruta
│   ├── styles/        global.css y tailwind.css
│   ├── utils/         funciones de ayuda
│   ├── App.jsx        rutas
│   └── main.jsx       punto de entrada (inicia MSW, ApolloProvider y BrowserRouter con la ruta base)
├── index.html
├── vite.config.js
└── package.json
```

### Componentes (`src/components/`)

| Componente | Responsabilidad |
|---|---|
| `Boton` | Botón o enlace (si recibe `to`) en forma de píldora. Tiene `variante` (`primario` negro o `contorno`) y `tamano` (`normal`, `grande` o `chico`), con estilo de deshabilitado. |
| `Tarjeta` | Contenedor blanco con esquinas muy redondeadas y sombra suave. Con `como` se elige la etiqueta (`div`, `article`, `form`) y el resto de props pasan a la etiqueta. |
| `Contenedor` | Limita el ancho del contenido a 1100px y deja margen a los lados. |
| `Seccion` | Sección con su título centrado y una descripción opcional. |
| `Etiqueta` | Pastilla con un texto corto (las actividades). Variante `celeste` o `blanca` según el fondo. |
| `Antetitulo` | Texto chico con una línea a la izquierda que va sobre los títulos ("Es hora de viajar"). |
| `EncabezadoPagina` | Franja celeste al inicio de cada página, con antetítulo, título y descripción. |
| `BuscadorDestinos` | Campo de texto controlado con su `label`. Se usa en Inicio y en Destinos. |
| `TarjetaDestino` | Emoji, nombre, país, descripción, actividades populares y el botón "Ver vuelos y hoteles". |
| `TarjetaVuelo` | Aerolínea, origen y destino, salida y llegada, asientos, precio y botón Reservar. |
| `TarjetaHotel` | Nombre, estrellas, fechas, habitaciones, precio por noche y botón Reservar. |
| `EtiquetaDisponibilidad` | Muestra "Disponible", "Pocas unidades" (quedan menos de 5) o "Agotado". Tiene texto e ícono visibles, así que no depende solo del color. |
| `BotonReservar` | Botón Reservar; queda deshabilitado si la opción está agotada. |
| `Cargando` | Aviso de carga con un círculo que gira (`role="status"`). |
| `MensajeError` | Caja de error (`role="alert"`) con botón Reintentar opcional. |
| `MenuSuperior`, `Footer` | Navegación y pie de página que usa el `Layout`. |

### Utilidades (`src/utils/`)

| Archivo | Qué hace |
|---|---|
| `formatearPrecio.js` | Muestra pesos chilenos sin decimales: `$389.000`. |
| `formatearFecha.js` | `formatearFechaHora` para los vuelos (con `Intl.DateTimeFormat('es-CL')`, siempre en hora de Chile) y `formatearFecha` para las fechas de hotel (en UTC, para que `2026-12-01` no se muestre como el 30 de noviembre). |
| `estadoDisponibilidad.js` | Devuelve `'disponible'`, `'pocas'` o `'agotado'` según si está disponible y cuántas unidades quedan. |

## Convención de estilos

El diseño sigue una landing de agencia de viajes: hero celeste, secciones blancas, texto casi negro, titulares grandes y livianos, botones negros en forma de píldora, esquinas muy redondeadas, sombras suaves y mucho espacio en blanco. En vez de fotos se usan emojis grandes.

- **Tailwind** para todo el estilo de componentes y páginas, con clases escritas en el JSX. Para usar los colores del sitio uso las variables, por ejemplo `bg-[var(--celeste)]`.
- **`src/styles/global.css`** solo tiene las variables (`:root`) y los estilos base (`box-sizing`, `body`, `h1`–`h3`, `p`), dentro de la capa `base` para que las clases de Tailwind les ganen.
- **`src/styles/tailwind.css`** importa solo el tema y las utilidades de Tailwind (sin preflight), para que no cambie los estilos base.
- No hay archivos `.css` por componente ni por página.
- Mobile-first: las clases sin prefijo son para celular y `sm:`, `md:` y `lg:` agregan cambios en pantallas más grandes.

Variables de `global.css`:

| Variable | Valor | Para qué |
|---|---|---|
| `--celeste` | `#d4f7fb` | Fondo del menú, del hero y de los encabezados |
| `--celeste-medio` | `#a9ebf3` | Círculo del aviso de carga |
| `--negro` | `#111418` | Botones principales, pestaña activa y footer |
| `--negro-hover` | `#2c3239` | Hover de los botones negros |
| `--blanco` | `#ffffff` | Fondo de la página y de las tarjetas |
| `--gris-fondo` | `#f3f6f7` | Fondo de los campos, de las pestañas y de los mensajes vacíos |
| `--borde` | `#d5dde1` | Borde de los campos de texto |
| `--texto` | `#1b1f23` | Texto normal y títulos |
| `--texto-suave` | `#55606a` | Textos secundarios |
| `--verde` / `--verde-suave` | `#1d6b3a` / `#e2f5e8` | Etiqueta "Disponible" |
| `--ambar` / `--ambar-suave` | `#7a4f00` / `#fff1cf` | Etiqueta "Pocas unidades" |
| `--rojo` / `--rojo-suave` | `#b3261e` / `#fde3df` | Etiqueta "Agotado" y mensajes de error |
| `--radio` | `24px` | Esquinas de las tarjetas |
| `--radio-grande` | `40px` | Esquinas del hero, los encabezados y el footer |
| `--sombra` | `0 10px 30px rgba(17, 20, 24, 0.07)` | Sombra suave de las tarjetas |
| `--fuente` | `system-ui, ...` | Tipografía del sitio |

Los colores van en variables para cambiarlos en un solo lugar y que todo el sitio use los mismos.

## Recorrido para revisar

| Paso | Qué hacer | Resultado esperado |
|---|---|---|
| 1 | Entrar al sitio | Se ve Inicio con el hero celeste, el buscador y "Descubre lo que ofrecemos". |
| 2 | Escribir "rio" en Destino y presionar **Buscar** | Se abre `/destinos?q=rio` con solo Río de Janeiro y "1 de 6 destinos". |
| 3 | Borrar la búsqueda | Se ven los 6 destinos. |
| 4 | Buscar "japon" | Aparece Tokio. |
| 5 | Buscar "xyz" | Aparece el mensaje de que no hay destinos y el botón para ver todos. |
| 6 | En Cusco, presionar "Ver vuelos y hoteles" | Primero se ven los avisos de carga y después el destino y 3 vuelos. Sky Airline dice "Agotado" y su botón Reservar está deshabilitado. |
| 7 | Presionar **Hoteles** y marcar **Solo disponibles** | Quedan 2 de 3 hoteles (Hostal Inti desaparece). |
| 8 | Recargar el navegador en `/destinos/2` | La página carga normal (no queda en blanco ni da error). |
| 9 | Entrar a `/destinos/99` | Se ve "Destino no encontrado" con un botón para ver todos los destinos. |
| 10 | Entrar a una ruta que no existe | Se ve "Página no encontrada" con el botón para volver al inicio. |

## Pruebas en navegadores

| Navegador | Escritorio | Móvil |
|---|---|---|
| Chrome | ✓ Funciona | ✓ Funciona (vista móvil simulada en las herramientas de desarrollo, iPhone SE 375 × 667) |
| Edge | ✓ Funciona | No probado |

Fecha de las pruebas: 23-11-2026. Se probó el sitio publicado en GitHub Pages.

Lo revisado:

- Inicio y hero.
- Búsqueda ("rio").
- Detalle de un destino con las pestañas Vuelos / Hoteles y el filtro "Solo disponibles".
- `/destinos/99` (error).
- Recarga con F5 en una ruta interna.
- Entrada directa a `/destinos/1`.

## Autoría

Camila González — Desarrollo Frontend II (PFY2202), Duoc UC.
