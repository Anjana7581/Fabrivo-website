import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
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
        
        {/* Logo */}
        <h1 className="text-3xl font-bold text-yellow-300 tracking-wide">
          <Link to="/">FabRivo</Link>
        </h1>

        {/* Search Bar (Hidden in Mobile) */}
        <div className="relative hidden md:flex w-80">
          <input 
            type="search" 
            name="search" 
            className="w-full px-4 py-2 rounded-full bg-white text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300" 
            placeholder="Search..." 
          />
          <FiSearch className="absolute right-4 top-3 text-gray-500" />
        </div>

        {/* Icons & Menu */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="hover:text-yellow-300 transition">
            <GrCart size={24} />
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" className="hidden md:inline-block text-lg font-medium hover:text-yellow-300 transition">Admin</Link>
              )}
              <CgProfile className="cursor-pointer text-2xl hover:text-yellow-300 transition" onClick={() => navigate("/profile")} title="Go to Profile" />
            </>
          ) : (
            <button onClick={() => navigate("/register")} className="bg-yellow-300 text-purple-800 px-5 py-2 rounded-full font-medium hover:bg-yellow-400 transition">
              Signup
            </button>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            <GiHamburgerMenu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-purple-700 flex flex-col items-center justify-center space-y-6 text-xl font-medium transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-6 right-6 text-white" onClick={toggleMenu}>
          <AiOutlineClose size={28} />
        </button>
        <Link to="/featured-course" className="hover:text-yellow-300 transition">FEATURES</Link>
        <Link to="/contact-us" className="hover:text-yellow-300 transition">CONTACT US</Link>
        {user && user.role === "admin" && (
          <Link to="/admin-dashboard" className="hover:text-yellow-300 transition">Admin</Link>
        )}
        <Link to="/cart" className="hover:text-yellow-300 transition">Cart</Link>
        {user ? (
          <CgProfile className="text-3xl cursor-pointer hover:text-yellow-300 transition" onClick={() => navigate("/profile")} />
        ) : (
          <button onClick={() => navigate("/register")} className="bg-yellow-300 text-purple-800 px-6 py-3 rounded-full font-medium hover:bg-yellow-400 transition">
            Signup
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

