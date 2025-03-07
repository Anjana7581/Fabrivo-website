import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useCart } from "../context/cartcontext";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import DefaultLayout from "./DefaultLayout/DefaultLayout";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image_url: "",
    rating: 0,
    reviews: 0,
  });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.image_url);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Add to Cart and Navigate to Cart Page
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate("/cart");
  };

  // Handle Wishlist Toggle
  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (!product) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto mt-25 mb-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="w-full h-96 overflow-hidden flex items-center justify-center border border-gray-200 rounded-lg">
              <img
                src={mainImage}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400";
                }}
              />
            </div>
            <div className="flex space-x-4">
              {[product.image_url, "https://via.placeholder.com/200", "https://via.placeholder.com/200"].map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-20 overflow-hidden flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer"
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderRating(product.rating)}</div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
              >
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Additional Information */}
            <div className="mt-6 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Shipping:</span> Free shipping for orders above $50.
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Return Policy:</span> 30-day return policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ProductDetail;