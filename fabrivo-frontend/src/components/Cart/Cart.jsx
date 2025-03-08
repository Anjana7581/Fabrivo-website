import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/cartcontext';
import DefaultLayout from '../DefaultLayout/DefaultLayout';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const [authMessage, setAuthMessage] = useState('');
    const navigate = useNavigate();

    // Debug cart data
    console.log('Cart Data:', cart);

    const handleCheckout = () => {
        const isAuthenticated = localStorage.getItem('token'); // Check if token exists
        if (!isAuthenticated) {
            setAuthMessage('Please log in to proceed to checkout.');
        } else if (cart.length > 0) {
            navigate('/checkout', { state: { cart } });
        } else {
            setAuthMessage('Your cart is empty!');
        }
    };

    return (
        <DefaultLayout>
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-20">
                <h3 className="text-2xl font-bold text-center mb-6">Your Cart</h3>
                {cart.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                            <ul className="space-y-6">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-6">
                                        {/* Product Image */}
                                        <div className="w-32 h-32 flex-shrink-0">
                                            <img
                                                src={item.image || 'https://via.placeholder.com/150'} // Use a placeholder if no image is available
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold">{item.title}</h4>
                                            <p className="text-gray-600">
                                                Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                                            </p>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <button
                                                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="text-gray-700">{item.quantity}</span>
                                                <button
                                                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        {/* Remove Button */}
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Subtotal Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal ({cart.length} items):</span>
                                    <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    className="w-full px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                                {authMessage && (
                                    <p className="mt-4 text-center text-red-600">
                                        {authMessage} <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Cart;