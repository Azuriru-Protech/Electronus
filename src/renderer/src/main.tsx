import './styles/globals.scss'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { getStore } from './lib/store'
import { cometchatInit } from './chat'

cometchatInit()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={getStore()}>
    <App />
  </Provider>
)
