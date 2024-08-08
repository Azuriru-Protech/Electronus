import './Test.scss'
import { useAppSelector, useAppDispatch } from '../../store'
import { increment, decrement, incrementByAmount } from '../../features/counter/counterSlice'
export default function Test(): JSX.Element {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  )
}
