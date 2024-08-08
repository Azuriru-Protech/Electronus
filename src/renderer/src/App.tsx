import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Fallback from './pages/Fallback/Fallback'
import Template from './pages/Template'
import Test from './pages/Test/Test'
import Settings from './pages/Settings/Settings'
import Privacy from './pages/Settings/Privacy/Privacy'

function App(): JSX.Element {
  const router = createBrowserRouter([
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
      element: <Settings />
    },
    {
      path: '/settings/privacy',
      element: <Privacy />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
