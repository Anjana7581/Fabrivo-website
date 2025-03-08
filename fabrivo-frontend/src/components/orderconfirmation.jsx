import React from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from './DefaultLayout/DefaultLayout';
import NewArrivals from './NewArrivals';

const OrderConfirmation = () => {
    const { state } = useLocation();
    const { order } = state || {};

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-700">No order details available.</p>
            </div>
        );
    }

    return (
        <DefaultLayout>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Confirmation</h2>
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">Order ID:</span>
                        <span className="text-gray-800">{order.id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">Status:</span>
                        <span className="text-gray-800">{order.status}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">Total Price:</span>
                        <span className="text-gray-800">${order.total_price}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">Payment Method:</span>
                        <span className="text-gray-800">{order.payment_method}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">Shipping Address:</span>
                        <span className="text-gray-800">{order.shipping_address}</span>
                    </div>
                </div>
            </div>
        </div>
        <NewArrivals/>
        </DefaultLayout>
    );
};

export default OrderConfirmation;