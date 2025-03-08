
import Contact from '../../components/ContactSection'
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'
import NewArrivals from '../../components/NewArrivals'
import NewTrend from '../../components/NewTrend'
// import OfferZone from '../../components/OfferZone'
import './Home.css'

function Home() {

  return (
    <div>
      <DefaultLayout>
      {/* <Banner/> */}
      {/* <TrendingOn/> */}
      
      {/* <MaterialDetails/> */}
      {/* <NewArrival/> */}
      {/* <MaterialDetailstwo/> */}
      <NewArrivals/>
      {/* <OfferZone/> */}
      <NewTrend/>
      <Contact/>
      </DefaultLayout>   

     </div>
  )
}

export default Home
