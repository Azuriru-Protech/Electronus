// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer, { CounterState } from './features/counter/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  counter: CounterState
}

export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
