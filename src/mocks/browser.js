import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.js'

// Service worker que intercepta las peticiones del navegador
export const worker = setupWorker(...handlers)
