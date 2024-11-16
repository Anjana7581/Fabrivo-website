import { FiSearch,  } from "react-icons/fi"; // Import arrow icons
import { GrCart } from "react-icons/gr";

import './Navbar.css'

function Navbar() {

  return (
    <div className="navbar">
      <div className="nav-left">
        <h1 className="logo">FabRivo</h1>
        <>
          <input type="search" name="search" id="" className='search' />
          <FiSearch className='search-icon' />
        </>
      </div>
      <div className="nav-right">
        <h3>Features</h3>
        <h3>Contact Us</h3>
        <GrCart className='crt' />
        </div>
        <button className='btn-ln'>Signup</button>

    </div>
  )
}

export default Navbar
