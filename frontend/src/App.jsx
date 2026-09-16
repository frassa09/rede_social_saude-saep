import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './tabs/Home'
import CriarAtividade from './tabs/CriarAtividade'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/criaratividade' element={<CriarAtividade></CriarAtividade>}></Route>
    </Routes>
  )
}

export default App
