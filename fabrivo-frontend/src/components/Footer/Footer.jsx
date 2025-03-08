function Footer() {
    return (
      <div className="bg-blue-900 text-white py-12">
        {/* Footer Content */}
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: Brand and Social Media */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">FabRivo</h1>
            <p className="text-white">Social Media</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-200 transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200 transition">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200 transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
  
          {/* Section 2: Shop Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">SHOP</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-gray-200 transition">Products</a></li>
              <li><a href="#" className="text-white hover:text-gray-200 transition">Overview</a></li>
              <li><a href="#" className="text-white hover:text-gray-200 transition">Pricing</a></li>
              <li><a href="#" className="text-white hover:text-gray-200 transition">Releases</a></li>
            </ul>
          </div>
  
          {/* Section 3: Company Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">COMPANY</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-gray-200 transition">About Us</a></li>
              <li><a href="#" className="text-white hover:text-gray-200 transition">Contact</a></li>
              <li><a href="#" className="text-white hover:text-gray-200 transition">News</a></li>
              <li><a href="#" className="text-white hover:text-gray-200 transition">Support</a></li>
            </ul>
          </div>
  
          {/* Section 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">STAY UP TO DATE</h4>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="border-t border-blue-500 mt-8 pt-6">
          <div className="container mx-auto px-6 flex justify-center space-x-6 text-white">
            <a href="#" className="hover:text-gray-200 transition">Terms</a>
            <a href="#" className="hover:text-gray-200 transition">Privacy</a>
            <a href="#" className="hover:text-gray-200 transition">Cookies</a>
          </div>
        </div>
      </div>
    );
  }
  
  export default Footer;