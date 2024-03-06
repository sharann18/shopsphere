import { Container } from 'react-bootstrap'
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <main>
      <Header/>
      <main>
        <Container>
          <h1>Welcome</h1>
        </Container>
      </main>
      <Footer/>
    </main>
  )
}

export default App