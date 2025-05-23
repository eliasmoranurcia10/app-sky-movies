import './App.css'
import {HashRouter, Routes, Route } from "react-router-dom"
import HomePage from './home/HomePage'
import MovieDetail from '../ui/MovieDetail'
import GenericList from '../ui/GenericList'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movie/:slug' element={<MovieDetail />} />
          <Route path='/movies' element={<GenericList />} />
          <Route path='*' element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
