import { createBrowserRouter } from 'react-router-dom'
import Test from './pages/Test/Test'
import Fallback from './pages/Fallback/Fallback'
import Template from './pages/Template'
import Settings from './pages/Settings/Settings'
import Privacy from './pages/Settings/Privacy/Privacy'
import Login from './pages/Login/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
