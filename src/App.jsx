import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './Components/Login'
import Home from './Components/Home'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route element={<Login/>} path='/*'/>
           <Route element={<Home/>} path='/home'/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
