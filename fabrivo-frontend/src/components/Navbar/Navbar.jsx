import { Link,useNavigate } from "react-router-dom";
import { FiSearch,  } from "react-icons/fi"; // Import arrow icons
import { GrCart } from "react-icons/gr";

import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div className="nav-left">
        <h1 className="logo"><Link to= '/'>FabRivo </Link></h1>
        <>
          <input type="search" name="search" id="" className='search' />
          <FiSearch className='search-icon' />
        </>
      </div>
      <div className="nav-right">
        <Link to='/featured-course'>FEATURES</Link>
        <Link to='/contact-us'>CONTACT US</Link>
        <GrCart className='crt' />
        </div>
        <button onClick={handleSignin} className='btn-ln'>Signup</button>

    </div>
  )
}

export default Navbar
