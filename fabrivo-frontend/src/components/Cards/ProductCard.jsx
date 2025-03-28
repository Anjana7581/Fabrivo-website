import React, { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/WishlistContext"; // Import WishlistContext
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Use WishlistContext
  const navigate = useNavigate();
  const isWishlisted = wishlist.some((item) => item.id === product.id); // Check if product is in wishlist

  // Navigate to product details page
  const handleCardClick = (e) => {
    if (!e.target.closest("button")) {
      navigate(`/products/${product.id}`);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate("/cart");
  };

  // Handle Wishlist Toggle
  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id); // Remove from wishlist
    } else {
      addToWishlist(product); // Add to wishlist
    }
  };

  return (
    <motion.div
      key={product.id}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
      whileHover={{ scale: 1.02 }}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="w-full h-60 flex items-center justify-center relative">
        {product.image_url ? (
          <motion.img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-contain p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          {product.offer_price ? (
            <>
              <p className="text-lg font-bold text-gray-900">
                ₹{product.offer_price}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
          )}
        </div>

        {/* Cart & Wishlist in One Line */}
        <div className="flex items-center justify-between">
          <motion.button
            className="py-2.5 px-4 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>

          <button
            onClick={handleWishlist}
            className="text-gray-600 hover:text-red-500 transition w-10 h-10 flex items-center justify-center"
          >
            {isWishlisted ? (
              <IoMdHeart className="w-6 h-6 text-red-500" />
            ) : (
              <IoMdHeartEmpty className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;