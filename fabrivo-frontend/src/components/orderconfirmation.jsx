import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const { state } = useLocation();
    const { order } = state || {};

    if (!order) {
        return <p>No order details available.</p>;
    }

    return (
        <div>
            <h2>Order Confirmation</h2>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total Price: ${order.total_price}</p>
            <p>Payment Method: {order.payment_method}</p>
            <p>Shipping Address: {order.shipping_address}</p>
        </div>
    );
};

export default OrderConfirmation;
