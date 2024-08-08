import { RouterProvider } from 'react-router-dom'
import './i18n/config'
import { router } from './routing'

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
