import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // Added filled heart icon
import { useCart } from "../../context/cartcontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Navigate to product details page
  const handleCardClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "button" && !e.target.closest("button")) {
      navigate(`/products/${product.id}`);
    }
  };

  // Handle Add to Cart and Navigate to Cart Page
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate("/cart"); // Navigate to Cart page after adding to cart
  };

  // Handle Wishlist Toggle
  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // Implement Wishlist Functionality (e.g., update state or API)
    console.log(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 mt-20 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h3>
        <p className="text-gray-600 mb-2">Price: ${product.price}</p>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={handleWishlist}
            className="text-gray-600 hover:text-red-500 transition duration-300"
          >
            {isWishlisted ? (
              <IoMdHeart className="w-6 h-6 text-red-500" />
            ) : (
              <IoMdHeartEmpty className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
