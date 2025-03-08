import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HeroBanner = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation
  const handleShopNow = () => {
    navigate("/productlist"); // Navigate to /productlist
  };

  return (
    <div className="relative h-[500px] flex items-center justify-center bg-white mt-20">
      {/* Content */}
      <div className="relative text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-blue-600"
        >
          Elevate Your Style with Exclusive Fashion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mb-8 text-gray-600"
        >
          Discover trendy and elegant clothing that blends fashion with comfort. Shop the latest collections and redefine your wardrobe.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition transform hover:scale-105"
          onClick={handleShopNow} // Add onClick handler
        >
          Shop Now
        </motion.button>
      </div>
    </div>
  );
};

export default HeroBanner;