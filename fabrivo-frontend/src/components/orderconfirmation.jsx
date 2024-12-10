import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const { state } = useLocation();
    const { order } = state || {};

    if (!order) {
        return <p>No order information found.</p>;
    }

    return (
        <div className="order-confirmation-container">
            <h2>Thank you for your order!</h2>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total Price: ${order.total_price}</p>
            <h3>Items:</h3>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.product_id} - Quantity: {item.quantity} - Price: ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderConfirmation;
