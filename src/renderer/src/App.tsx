import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './i18n/config'
import { router } from './routing'

function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
