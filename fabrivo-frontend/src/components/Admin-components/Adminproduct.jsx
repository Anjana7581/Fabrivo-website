import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import "./Adminproduct.css"; // Import the CSS file

function Adminproduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/products/${id}`).then(() => {
            setProducts(products.filter((product) => product.id !== id));
        });
    };

    return (
        <div className="admin-product-container">
            <h1>Product Management</h1>
            <table className="admin-product-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Offer Price</th>
                        <th>Color</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.offer_price ? `$${product.offer_price}` : "No Offer"}</td>
                            <td>{product.color}</td>
                            <td>{product.type}</td>
                            <td>{product.description}</td>
                            <td>{product.rating}</td>
                            <td>
                                {product.image ? (
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.title}
                                        className="admin-product-image"
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td className="admin-product-actions">
                                <button className="edit-button" onClick={() => handleEdit(product.id)}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Adminproduct;
