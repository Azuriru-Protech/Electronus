// create a token slice

import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid'

export interface Session {
  session: {
    id: string
  }
}

const defaultSession: Session = {
  session: {
    id: v4()
  }
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: defaultSession,
  reducers: {
    setSessionId: (state, action) => {
      state.session.id = action.payload
    }
  },
  selectors: {
    getSessionId: (state) => {
      return state.session.id
    }
  }
})

export const { setSessionId } = sessionSlice.actions
export const { getSessionId } = sessionSlice.selectors
export default sessionSlice.reducer
