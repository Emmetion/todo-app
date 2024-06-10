import React from 'react'
import './App.css'
import Todo from './components/todo/Todo'

function App() {
  return (
    <React.StrictMode>
      <div className='h-[100vh] w-100'>
        <Todo/>
      </div>
    </React.StrictMode>
  )
}

export default App
