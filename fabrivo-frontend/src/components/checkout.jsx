import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Checkout = () => {
    const { state } = useLocation();
    const { cart } = state || { cart: [] };
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const navigate = useNavigate();

    const handleCheckout = async (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Calculate total price
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderData = {
            user_id: 1, // Replace with the actual user ID (e.g., from authentication context)
            status: 'pending', // Default status for a new order
            total_price: totalPrice,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            items: cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        try {
            const response = await axiosInstance.post('/orders', orderData);
            alert('Order placed successfully!');
            navigate('/order-confirmation', { state: { order: response.data.order } });
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout}>
                <div className="form-group">
                    <label>Shipping Address:</label>
                    <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
