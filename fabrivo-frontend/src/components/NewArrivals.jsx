import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { motion } from "framer-motion";
import ProductCard from "../components/Cards/ProductCard"; // Import the ProductCard component

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadNewArrivals();
  }, []);

  const loadNewArrivals = async () => {
    try {
      const response = await axiosInstance.get("/products/section/new-arrivals");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching New Arrivals:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 mt-20">
      {/* Section Title */}
      <motion.h2
        className="text-2xl font-bold text-center mb-8 text-gray-900 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm">NEW</span>
        New Arrivals
      </motion.h2>

      {/* Product Grid */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Reusing ProductCard */}
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No new arrivals available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default NewArrivals;
