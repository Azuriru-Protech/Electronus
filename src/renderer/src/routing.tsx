import { createBrowserRouter } from 'react-router-dom'
import Test from './pages/Test/Test'
import Fallback from './pages/Fallback/Fallback'
import Template from './pages/Template'
import Settings from './pages/Settings/Settings'
import Privacy from './pages/Settings/Privacy/Privacy'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
    errorElement: <Fallback />
  },
  {
    path: '/template',
    element: <Template />
  },
  {
    path: '/settings',
    element: <Settings />,
    children: [
      {
        path: 'privacy',
        element: <Privacy />
      }
    ]
  }
])
