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
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Contacts from './pages/Contacts/Contacts'
import NewMessages from './pages/Contacts/NewMessages/NewMessages'
import MyGroups from './pages/Contacts/MyGroups/MyGroups'
import GroupAssistant from './pages/Contacts/GroupAssistant/GroupAssistant'
import ContactsList from './pages/Contacts/ContactsList/ContactsList'
import Chat from './pages/Chat/Chat'
import ChatList from './pages/ChatList/ChatList'
import BlacklistUser from './pages/Settings/Privacy/Blacklist/BlacklistUser/BlacklistUser'

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Fallback />,
    children: [
      {
        path: 'chat',
        element: <ChatList />
      },
      {
        path: 'chat/:chatId',
        element: <Chat />
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            path: 'privacy',
            element: <Privacy />
          },
          {
            path: 'privacy/blacklist',
            element: <Blacklist />
          },
          {
            path: 'privacy/blacklist/:userId',
            element: <BlacklistUser />
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
      },
      {
        path: '/contacts',
        element: <Contacts />,
        children: [
          {
            path: 'new-messages',
            element: <NewMessages />
          },
          {
            path: 'my-group',
            element: <MyGroups />
          },
          {
            path: 'group-assistant',
            element: <GroupAssistant />
          },
          {
            path: ':userId',
            element: <ContactsList />
          }
        ]
      },
      {
        path: '/',
        element: ''
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  }
])
