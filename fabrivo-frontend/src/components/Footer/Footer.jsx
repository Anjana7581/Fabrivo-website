import './Footer.css'

function Footer(){
    return(
        <div className="footer-main">
            
          <div className="footer-one">
             <h1>FabRivo</h1>
             <p>Social Media</p>

          </div>
          <div className="footer-two">
             <h4>Shop</h4>
             <li>Products</li>
             <li>Overview</li>
             <li>Prizing</li>
             <li>Releases</li>
             
          </div>
          <div className="footer-three">
             <h4>Company</h4>
               <li>About Us</li>
               <li>Contact</li>
               <li>News</li>
               <li>Support</li>
          </div>
          <div className="footer-four">
         <h4>Stay Up To Date</h4>
         <button type="submit" >Enter Your Email</button>
          </div>
        </div>
    )
}

export default Footer