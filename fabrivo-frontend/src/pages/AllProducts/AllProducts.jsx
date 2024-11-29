import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance"; // Import your axiosInstance
import ProductCard from "../../components/Cards/ProductCard"; // Import the ProductCard component
import './AllProducts.css'

function  AllProducts(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axiosInstance.get("products"); // Call the API route you defined
                setProducts(response.data); // Store the fetched trending products in state
            } catch (error) {
                console.error("Error fetching trending products:", error);
            }
        };
        fetchAllProducts();
    }, []); // Empty dependency array to only run once on component mount
    return(
        <DefaultLayout>
        <div className="allproduct-container">
            <div className="allproduct-head">
                {/* <h1 className="allproduct-title">TRENDING NOW</h1> */}
                {/* <p className="allproduct-description">Get in on the trend with our curated selection of best-selling styles.</p> */}

                {/* Display ProductCards for each trending product */}
                <div className="product-cards-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Button to view all trending products */}
                {/* <button className="allproduct-button">See All</button> */}
            </div>
        </div>
        </DefaultLayout>
    )
}

export default AllProducts

