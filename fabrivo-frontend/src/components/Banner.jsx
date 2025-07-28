import React from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa"; // Example icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Banner = () => {
    const navigate = useNavigate(); // Initialize navigation
  
  return (
    <div className="relative h-[300px] flex items-center justify-center bg-gray-100">
      {/* Content */}
      <div className="relative text-center px-6 max-w-3xl mx-auto">
        {/* Icon or Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <FaTag className="text-4xl text-blue-600 mx-auto" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold mb-2 text-blue-900"
        >
          Elevate Your Style with Exclusive Fashion
        </motion.h1>

        {/* Secondary Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl font-semibold mb-4 text-blue-800"
        >
          Limited Time Offer: Up to 50% Off!
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base mb-6 text-blue-700"
        >
          Discover trendy and elegant clothing that blends fashion with comfort. Shop the latest collections and redefine your wardrobe.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-4"
        >
<button 
  onClick={() => navigate('/productlist')} // Navigate to the product list page
  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-700 transition transform hover:scale-105"
>
  Shop Now
</button>

          {/* <button className="bg-transparent border border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;