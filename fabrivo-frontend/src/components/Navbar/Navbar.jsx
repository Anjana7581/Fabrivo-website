import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // Added FiX for clear search icon
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Update searchQuery state based on the URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query); // Set searchQuery from the URL
    } else {
      setSearchQuery(""); // Clear searchQuery if no query parameter
    }
  }, [location.search]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productlist?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Clear search query and refresh the page
  const clearSearch = () => {
    navigate("/productlist"); // Navigate to the product list without the query parameter
    setSearchQuery(""); // Clear the search input
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 transition duration-500 transform hover:scale-105">
              FabRivo
            </Link>
          </div>

          {/* Search Bar */}
          <form className="hidden lg:flex flex-grow mx-8" onSubmit={handleSearch}>
            <div className="relative w-full max-w-md">
              <input
                type="search"
                className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 border-2 border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-3">
                <FiSearch className="text-gray-500 hover:text-blue-600 transition duration-500 transform hover:scale-110" />
              </button>
              {/* Clear Search Button (Only "X" Icon) */}
              {location.pathname === "/productlist" && searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-10 top-3 text-gray-500 hover:text-gray-600 transition duration-300"
                >
                </button>
              )}
            </div>
          </form>

          <div className="hidden lg:flex lg:space-x-8 items-center">
            <Link to="/" className="text-blue-600">Home</Link>
            <Link to="/about" className="text-blue-600">About</Link>
            <Link to="/productlist" className="text-blue-600">Shop</Link>
            <Link to="/contact-us" className="text-blue-600">Reach Us</Link>
            {user ? (
              <>
                {user.role === "admin" && <Link to="/admin-dashboard" className="text-blue-600">AdminDashboard</Link>}
                <CgProfile className="text-blue-600 cursor-pointer" onClick={() => navigate("/profile")} title="Go to Profile" />
              </>
            ) : (
              <button onClick={() => navigate("/register")} className="btn-ln">Signup</button>
            )}
          </div>

          <button className="lg:hidden text-blue-600" onClick={toggleMenu}>
            <GiHamburgerMenu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 text-xl font-medium transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
        <button className="absolute top-6 right-6 text-blue-600" onClick={toggleMenu}>
        </button>
        
        <form className="w-full max-w-xs px-4" onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="search"
              className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 border-2 border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-3">
              <FiSearch className="text-gray-500 hover:text-blue-600 transition duration-500 transform hover:scale-110" />
            </button>
          </div>
        </form>
        
        <Link to="/" className="text-blue-600" onClick={toggleMenu}>Home</Link>
        <Link to="/about" className="text-blue-600" onClick={toggleMenu}>About</Link>
        <Link to="/productlist" className="text-blue-600" onClick={toggleMenu}>Shop</Link>
        <Link to="/contact-us" className="text-blue-600" onClick={toggleMenu}>Reach Us</Link>
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin-dashboard" className="text-blue-600">AdminDashboard</Link>}
            <CgProfile className="text-blue-600 cursor-pointer" onClick={() => navigate("/profile")} title="Go to Profile" />
          </>
        ) : (
          <button onClick={() => navigate("/register")} className="btn-ln">Signup</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;