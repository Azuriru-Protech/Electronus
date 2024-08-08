import { createBrowserRouter } from 'react-router-dom'
import Fallback from './pages/Fallback/Fallback'
import Settings from './pages/Settings/Settings'
import Privacy from './pages/Settings/Privacy/Privacy'
import Home from './pages/Home/Home'
import PersonalInformation from './pages/Settings/PersonalInformation/PersonalInformation'
import AccountSecurity from './pages/Settings/AccountSecurity/AccountSecurity'
import SystemSettings from './pages/Settings/SystemSettings/SystemSettings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Fallback />,
    children: [
      {
        path: '/settings',
        element: <Settings />,
        children: [
          {
            path: 'privacy',
            element: <Privacy />
          },
          {
            path: 'personal-information',
            element: <PersonalInformation />
          },
          {
            path: 'account-security',
            element: <AccountSecurity />
          },
          {
            path: 'system-settings',
            element: <SystemSettings />
          }
        ]
      }
    ]
  }
])
