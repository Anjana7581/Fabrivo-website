import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import Pagenotfound from './pages/Pagenotfound/Pagenotfound.jsx'
import AllProducts from './pages/AllProducts/AllProducts.jsx'
import Login from './pages/Login/Login.jsx'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/allproducts' element = {<AllProducts/>}/>
        <Route path='/login' element = {<Login/>}/>

        <Route path='*' element = {<Pagenotfound/>}/>
      </Routes>
    </Router>
  )
}

export default App
