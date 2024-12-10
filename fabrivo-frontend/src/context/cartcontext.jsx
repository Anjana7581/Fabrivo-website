// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        setCart(storedCart);
    }
}, []);

// Save cart data to localStorage whenever it changes
useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);








    const addToCart = (product) => {
        setCart(prevCart => {
            // Check if item already exists in cart
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // Update quantity if product is already in the cart
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Add new product to cart
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
