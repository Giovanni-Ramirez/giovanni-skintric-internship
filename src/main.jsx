import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Pages
import App from './App.jsx';
import Testing from './pages/testing/testing.jsx';
import Result from './pages/result/result.jsx';
import Analysis from './pages/analysis/analysis.jsx';
import Summary from './pages/summary/summary.jsx';
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
  },
  {
    path: '/result',
    element: <Result />,
    errorElement: <NotFound />,
  },
  {
    path: '/analysis',
    element: <Analysis />,
    errorElement: <NotFound />,
  },
  {
    path: '/summary',
    element: <Summary />,
    // errorElement: <NotFound />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
