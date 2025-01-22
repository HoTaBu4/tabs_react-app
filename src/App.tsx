import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' index element={<Home />}>
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
