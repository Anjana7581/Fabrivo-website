import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"


const DefaultLayout = ({children}) =>{
    return(
        <div className="default-layout">
            <Navbar/>
            <div className="layout-content">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default DefaultLayout;