
import Banner from '../../components/Banner/Banner'
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'
import Easylist from '../../components/Easylist/Easylist'
// import Footer from '../../components/Footer/Footer'
import MaterialDetails from '../../components/MaterialDetails/MaterialDetails'
import MaterialDetailstwo from '../../components/MaterialDetailstwo/MaterialDetailstwo'
// import Navbar from '../../components/Navbar/Navbar'
import NewArrival from '../../components/NewArrival/NewArrival'
import TrendingOn from '../../components/TrendingOn/TrendingOn'
import './Home.css'

function Home() {

  return (
    <div>
      <DefaultLayout>
      <Easylist/>
      <Banner/>
      {/* <TrendingOn/> */}
      <MaterialDetails/>
      {/* <NewArrival/> */}
      <MaterialDetailstwo/>
      </DefaultLayout>   
     </div>
  )
}

export default Home
