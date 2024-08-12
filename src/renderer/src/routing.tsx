import { createHashRouter } from 'react-router-dom'
import Fallback from './pages/Fallback/Fallback'
import Settings from './pages/Settings/Settings'
import Privacy from './pages/Settings/Privacy/Privacy'
import Home from './pages/Home/Home'
import PersonalInformation from './pages/Settings/PersonalInformation/PersonalInformation'
import AccountSecurity from './pages/Settings/AccountSecurity/AccountSecurity'
import SystemSettings from './pages/Settings/SystemSettings/SystemSettings'
import Login from './pages/Login/Login'
import ShareInvite from './pages/Settings/ShareInvite/ShareInvite'
import Feedback from './pages/Settings/Feedback/Feedback'
import CustomerService from './pages/Settings/CustomerService/CustomerService'
import Blacklist from './pages/Settings/Privacy/Blacklist/Blacklist'
import DeviceManagement from './pages/Settings/AccountSecurity/DeviceManagement/DeviceManagement'
import ChangeLanguage from './pages/Settings/SystemSettings/ChangeLanguage/ChangeLanguage'
import Notification from './pages/Settings/SystemSettings/Notification/Notification'
import AboutUs from './pages/Settings/SystemSettings/AboutUs/AboutUs'

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Fallback />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
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
            path: 'account-security/device-management',
            element: <DeviceManagement />
          },
          {
            path: 'system-settings',
            element: <SystemSettings />
          },
          {
            path: 'share-invite',
            element: <ShareInvite />
          },
          {
            path: 'feedback',
            element: <Feedback />
          },
          {
            path: 'customer-service',
            element: <CustomerService />
          },
          {
            path: 'privacy/blacklist',
            element: <Blacklist />
          },
          {
            path: 'system-settings/notification',
            element: <Notification />
          },
          {
            path: 'system-settings/change-language',
            element: <ChangeLanguage />
          },
          {
            path: 'system-settings/about-us',
            element: <AboutUs />
          }
        ]
      }
    ]
  }
])
