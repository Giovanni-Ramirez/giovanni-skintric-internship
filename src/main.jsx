import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Pages
import App from './App.jsx';
import Testing from './pages/testing/testing.jsx';
import NotFound from './pages/notFound.jsx';

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/testing',
    element: <Testing />,
    errorElement: <NotFound />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
