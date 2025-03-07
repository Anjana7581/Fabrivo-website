import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import './EditProduct.css';

function EditProduct() {
    const { id } = useParams(); // Get product ID from the route
    const navigate = useNavigate(); // For navigation after update
    const [product, setProduct] = useState({
        title: "",
        price: "",
        offer_price: "",
        color: "",
        type: "",
        description: "",
        rating: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            setError("Failed to fetch product details");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/products/${id}`, product);
            navigate("/admin-dashboard/admin-product"); // Absolute path
        } catch (err) {
            setError("Failed to update the product");
        }
    };

    return (
        <div className="edit-product-page-container">
            <h1>Edit Product</h1>
            {error && <p className="edit-product-page-error">{error}</p>}
            <form className="edit-product-page-form" onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Offer Price</label>
                    <input
                        type="number"
                        name="offer_price"
                        value={product.offer_price || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type</label>
                    <input
                        type="text"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={product.rating || ""}
                        onChange={handleChange}
                        min="0"
                        max="5"
                    />
                    <div>
                    <label>Rating</label>
                    <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
                    </div>
       

                </div>
                <button className="edit-product-page-button" type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditProduct;
