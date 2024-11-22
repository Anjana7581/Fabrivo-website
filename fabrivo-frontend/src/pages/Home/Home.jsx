
import Banner from '../../components/Banner/Banner'
import Easylist from '../../components/Easylist/Easylist'
import Footer from '../../components/Footer/Footer'
import MaterialDetails from '../../components/MaterialDetails/MaterialDetails'
import MaterialDetailstwo from '../../components/MaterialDetailstwo/MaterialDetailstwo'
import Navbar from '../../components/Navbar/Navbar'
import NewArrival from '../../components/NewArrival/NewArrival'
import TrendingOn from '../../components/TrendingOn/TrendingOn'
import './Home.css'

function Home() {

  return (
    <div>
      <Navbar/>
      <Easylist/>
      <Banner/>
      <TrendingOn/>
      <MaterialDetails/>
      <NewArrival/>
      <MaterialDetailstwo/>
      <Footer/>
    </div>
  )
}

export default Home
