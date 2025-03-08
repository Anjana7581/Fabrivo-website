import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { useCart } from '../context/cartcontext'; // Import useCart
import DefaultLayout from './DefaultLayout/DefaultLayout';

const Checkout = () => {
    const { state } = useLocation();
    const { cart } = state || { cart: [] };
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD
    const navigate = useNavigate();
    const { clearCart } = useCart(); // Get clearCart from cartContext

    const handleCheckout = async (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Prepare order data
        const orderData = {
            user_id: 1, // Replace with actual user ID from authentication
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
            clearCart(); // Clear the cart after successful order placement
            navigate('/order-confirmation', { state: { order: response.data.order } });
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <DefaultLayout>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
                <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Shipping Address:</label>
                        <input
                            type="text"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Payment Method:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="COD">Cash on Delivery</option>
                            <option value="stripe">Stripe</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
        </DefaultLayout>
    );
};

export default Checkout;