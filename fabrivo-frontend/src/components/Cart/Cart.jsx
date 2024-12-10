import {useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import { useCart } from '../../context/cartcontext';
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [authMessage, setAuthMessage] = useState('');
    const navigate = useNavigate();

    const handleCheckout = () => {
        const isAuthenticated = localStorage.getItem('token'); // Check if token exists
        if (!isAuthenticated) {
            setAuthMessage('Please log in to proceed to checkout.');
            // navigate('/login'); // Redirect to login page
        }
        else if (cart.length > 0) {
            navigate('/checkout', { state: { cart } });
        } else  {
            setAuthMessage('Your cart is empty!');
        }
    };

    return (
        <DefaultLayout>
            <div className="cart-container">
                <h3 className="cart-title">Your Cart</h3>
                {cart.length === 0 ? (
                    <p className="cart-empty-message">Your cart is empty.</p>
                ) : (
                    <div className="cart-items-container">
                        <ul className="cart-items-list">
                            {cart.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <div className="cart-item-details">
                                        <h4 className="cart-item-name">{item.title}</h4>
                                        <p className="cart-item-price">Price: ${item.price}</p>
                                        <div className="cart-item-quantity">
                                            <button 
                                                className="cart-item-quantity-button" 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="cart-item-quantity-text"> Quantity: {item.quantity} </span>
                                            <button 
                                                className="cart-item-quantity-button" 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="cart-item-remove-button" 
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <h4 className="cart-total">Total: ${getCartTotal()}</h4>
                            <button className="cart-checkout-button" onClick={handleCheckout}>
                                Checkout
                            </button>
                            {authMessage && <p className="auth-message">{authMessage}<Link to='/login'>login</Link>
                            </p>}

                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Cart;
