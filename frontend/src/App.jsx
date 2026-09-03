import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './tabs/Home'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
    </Routes>
  )
}

export default App
