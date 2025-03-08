
import Banner from '../../components/Banner'
import Contact from '../../components/ContactSection'
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'
import HeroBanner from '../../components/HeroBanner'
import NewArrivals from '../../components/NewArrivals'
import NewTrend from '../../components/NewTrend'
import Stats from '../../components/stats'
// import OfferZone from '../../components/OfferZone'
import './Home.css'

function Home() {

  return (
    <div>
      <DefaultLayout>
        <HeroBanner/>
      {/* <Banner/> */}
      {/* <TrendingOn/> */}
      
      {/* <MaterialDetails/> */}
      {/* <NewArrival/> */}
      {/* <MaterialDetailstwo/> */}
      <NewArrivals/>
      {/* <OfferZone/> */}
<Banner/>
      <NewTrend/>
      <Stats/>

      <Contact/>
      </DefaultLayout>   

     </div>
  )
}

export default Home
