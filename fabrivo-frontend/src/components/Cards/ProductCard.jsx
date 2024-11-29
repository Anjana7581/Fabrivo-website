import React from "react";
import "./ProductCard.css";
import { IoMdHeartEmpty } from "react-icons/io";
import { useCart } from '../../context/cartcontext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <div className="product-card-image">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.title} />
                ) : (
                    <div className="product-card-placeholder">No Image</div>
                )}
            </div>
            <div className="product-card-details">
                <h3>{product.title}</h3>
                <p className="product-card-price">
                    Price: ${product.price}
                </p>
                {/* <p className="product-card-offer">
                    Offer Price: {product.offer_price ? `$${product.offer_price}` : "No Offer"}
                </p> */}
                <button className="wishlist"><IoMdHeartEmpty /></button>
                <button onClick={() => addToCart(product)}>Add to Cart</button>

            </div>
        </div>
    );
}

export default ProductCard;
