import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
        <Header/>
        <main>
          <Container className='my-4'>
          <Routes>
            <Route path='/' element={<HomePage/>} exact />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/cart/:id?' element={<CartPage/>}/>
          </Routes>
          </Container>
        </main>
        <Footer/>
    </Router>
  )
}

export default App