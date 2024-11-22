import { Link } from "react-router-dom"
import "./Easylist.css"
function EasyLinkst (){
 return(
<div className="easylist-container">
<div className="easylist">
    <ul>
    <li><Link to='/allproducts'>ALL</Link></li>
    <li><Link to='*'>FABRICS</Link></li>
    <li><Link to='*'>NEW ARRIVAL</Link></li>
    <li><Link to='*'>TRENDING</Link></li>
    <li><Link to='*'>SUPPORT</Link></li>
    <li><Link to='*'>WISHLLIST</Link></li>
    <li><Link to='*'>MY AVATHAR</Link></li>
    <li><Link to='*'>TRY ON</Link></li>
    </ul>
</div>
</div>
 )
}
export default EasyLinkst