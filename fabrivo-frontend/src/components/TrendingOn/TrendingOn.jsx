import React, { useEffect, useState ,} from "react";
import axiosInstance from "../../axiosInstance"; // Import your axiosInstance
import ProductCard from "../Cards/ProductCard"; // Import the ProductCard component
import {useNavigate} from "react-router-dom"
import './TrendingOn.css'; // Import the CSS file

function TrendingOn() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    // Fetch trending products from the API
    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await axiosInstance.get("/sections/trending"); // Call the API route you defined
                setProducts(response.data); // Store the fetched trending products in state
            } catch (error) {
                console.error("Error fetching trending products:", error);
            }
        };
        fetchTrendingProducts();
    }, []); // Empty dependency array to only run once on component mount

    return (
        <div className="trendingon-container">
            <div className="trend-head">
                <h1 className="trend-title">TRENDING NOW</h1>
                <p className="trend-description">Get in on the trend with our curated selection of best-selling styles.</p>

                {/* Display ProductCards for each trending product */}
                <div className="product-cards-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Button to view all trending products */}
                <button onClick={() => navigate('/allproducts')}  className="trend-button">See All</button>

            </div>
        </div>
    );
}

export default TrendingOn;
