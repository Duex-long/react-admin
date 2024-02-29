import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import store from './store'
import { decremented } from './store/example'

function App() {
  const [count] = useState(0)
  const countRedux = useSelector((state: ReturnType<typeof store.getState>) => {
    return state.counter.value
  })
  const dispatch = useDispatch()
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React </h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={() => dispatch(decremented())}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        {countRedux}
      </p>
    </>
  )
}

export default App
