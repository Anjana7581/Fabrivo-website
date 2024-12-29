import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi"; // For hamburger icon
import { AiOutlineClose } from "react-icons/ai"; // For close icon
import './Navbar.css';
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu toggle state

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/user'); // Assumes you have a '/user' endpoint
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user details:", error.response?.data || error.message);
        }
      }
    };
    fetchUser();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar">
      <div className="nav-left">
        <h1 className="logo"><Link to='/'>FabRivo</Link></h1>
        <div className="search-container">
          <input type="search" name="search" className='search' />
          <FiSearch className='search-icon' />
        </div>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </div>
      <div className={`nav-right ${isMenuOpen ? "open" : ""}`}>
        <Link to='/featured-course'>FEATURES</Link>
        <Link to='/contact-us'>CONTACT US</Link>
        <Link to='/cart'><GrCart className='crt' /></Link>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to='/admin-dashboard'>AdminDashboard</Link>
            )}
            <CgProfile
              className="profile-icon"
              onClick={() => navigate('/profile')}
              title="Go to Profile"
            />
          </>
        ) : (
          <button onClick={() => navigate('/register')} className='btn-ln'>Signup</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
