import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axiosInstance.get("/user");
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
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 transition duration-500 transform hover:scale-105"
            >
              <span className="text-blue-600">FabRivo</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-grow mx-8">
            <div className="relative w-full max-w-md">
              <input
                type="search"
                name="search"
                className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 border-2 border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-500 hover:border-indigo-500"
                placeholder="Search..."
              />
              <FiSearch className="absolute right-4 top-3 text-gray-500 hover:text-blue-600 transition duration-500 transform hover:scale-110" />
            </div>
          </div>

          {/* Desktop Menu with Hover Underline Animation */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link
              to="/"
              className="text-blue-600 transition duration-500 relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link
              to="/about"
              className="text-blue-600 transition duration-500 relative group"
            >
              About
              <span className="absolute left-0 bottom-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link
              to="/allproducts"
              className="text-blue-600 transition duration-500 relative group"
            >
              Shop
              <span className="absolute left-0 bottom-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link
              to="/contact-us"
              className="text-blue-600 transition duration-500 relative group"
            >
              Reach Us
              <span className="absolute left-0 bottom-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-500"></span>
            </Link>
            {user ? (
          <>
            {user.role === 'admin' && (
              <Link to='/admin-dashboard'
              className="text-blue-600 transition duration-500 transform hover:scale-105"
              >
                AdminDashboard
                </Link>
            )}
            <CgProfile
              className="text-blue-600 transition duration-500 transform hover:scale-105"

              onClick={() => navigate('/profile')}
              title="Go to Profile"
            />
          </>
        ) : (
          <button onClick={() => navigate('/register')} className='btn-ln'>Signup</button>
        )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-blue-600 transition duration-500 transform hover:scale-110"
            onClick={toggleMenu}
          >
            <GiHamburgerMenu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 text-xl font-medium transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-blue-600 transition duration-500 transform hover:scale-110"
          onClick={toggleMenu}
        >
          <AiOutlineClose size={28} />
        </button>
        {/* Mobile Search Bar */}
        <div className="w-full max-w-xs px-4">
          <div className="relative">
            <input
              type="search"
              name="search"
              className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 border-2 border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-500 hover:border-indigo-500"
              placeholder="Search..."
            />
            <FiSearch className="absolute right-4 top-3 text-gray-500 hover:text-blue-600 transition duration-500 transform hover:scale-110" />
          </div>
        </div>
        <Link
          to="/"
          className="text-blue-600 transition duration-500 transform hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-blue-600 transition duration-500 transform hover:scale-105"
        >
          About
        </Link>
        <Link
          to="/shop"
          className="text-blue-600 transition duration-500 transform hover:scale-105"
        >
          Shop
        </Link>
        <Link
          to="/contact-us"
          className="text-blue-600 transition duration-500 transform hover:scale-105"
        >
          Reach Us
        </Link>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to='/admin-dashboard'
              className="text-blue-600 transition duration-500 transform hover:scale-105"
              >
                AdminDashboard
                </Link>
            )}
            <CgProfile
              className="text-blue-600 transition duration-500 transform hover:scale-105"

              onClick={() => navigate('/profile')}
              title="Go to Profile"
            />
          </>
        ) : (
          <button onClick={() => navigate('/register')} className='btn-ln'>Signup</button>
        )}
      </div>
    </nav >
  );
}

export default Navbar;