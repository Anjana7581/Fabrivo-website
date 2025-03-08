import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { motion } from "framer-motion";
import ProductCard from "../components/Cards/ProductCard"; // Import ProductCard

const NewTrend = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/products/section/trending")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trending products:", error);
        setError("Failed to fetch trending products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 mt-20">
      {/* Section Title */}
      <motion.h2
        className="text-2xl font-bold text-center mb-8 text-gray-900 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm">TRENDING</span>
        Trending Products
      </motion.h2>

      {/* Product Grid */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">Loading trending products...</p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No trending products available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default NewTrend;
