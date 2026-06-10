import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'

const rootElement = document.getElementById('root')!

const router = createBrowserRouter(routes)

if (import.meta.env.PROD) {
  hydrateRoot(rootElement, <RouterProvider router={router} />)
} else {
  createRoot(rootElement).render(
    <RouterProvider router={router} />
  )
}

