import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { InputForm } from './InputForm'
import { Route, Routes } from 'react-router-dom'
import { SeatPage } from './SeatPage'


function App() {

  


  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<InputForm/>}></Route>
      <Route path='/seatPage' element={<SeatPage/>}></Route>
     
      </Routes>
    </div>
  )
}

export default App
