import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ApolloProvider } from '@apollo/client'
import './styles/global.css'
import './styles/tailwind.css'
import App from './App.jsx'
import { apolloClient } from './api/apolloClient.js'

// Ruta base del sitio (la "base" de vite.config.js), sin la barra final
const rutaBase = import.meta.env.BASE_URL.replace(/\/$/, '')

// Inicia MSW (el backend simulado). Corre también en producción,
// porque GitHub Pages no tiene backend
async function enableMocking() {
  const { worker } = await import('./mocks/browser.js')
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    // Lo que no tenga handler (imágenes, scripts...) pasa normal
    onUnhandledRequest: 'bypass',
  })
}

// Se renderiza recién cuando MSW está listo, así ninguna petición se escapa
await enableMocking()

// BrowserRouter para las rutas y ApolloProvider para las consultas GraphQL
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename={rutaBase}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
