import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { tokensSlice } from './features/tokens/tokensSlice'
import { userSlice } from './features/user/userSlice'
import { sessionSlice } from './features/session/sessionSlice'

const rootReducer = combineSlices(tokensSlice, userSlice, sessionSlice)

export type RootState = ReturnType<typeof rootReducer>

let store: AppStore | null = null

const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export const getStore = () => {
  if (!store) {
    store = makeStore()
  }
  return store
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
