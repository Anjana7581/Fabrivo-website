import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance"; // Make sure to replace with your correct axiosInstance import
import ProductCard from "../Cards/ProductCard"; // Import the ProductCard component
import { useNavigate } from "react-router-dom"
import './NewArrival.css';


function NewArrival() {
    const [products, setProducts] = useState([]);
   const navigate =useNavigate();
    // Fetch the products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/sections/new-arrival");
                setProducts(response.data); // Store the products in the state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="newarrival-container">
            <div className='newarrival-head'>
                <h1>NEW ARRIVAL</h1>
            </div>

            {/* Display ProductCards for each product */}
            <div className="product-cards-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* See All button below the product cards */}
            <div className="see-all-button-container">
                <button onClick={() => navigate('/allproducts')}   className='newarrival-b'>See All</button>
            </div>
        </div>
    );
}

export default NewArrival;
