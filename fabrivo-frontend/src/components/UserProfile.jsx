import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import your axiosInstance
import DefaultLayout from "./DefaultLayout/DefaultLayout";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and orders
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user-profile'); // Fetch user profile
        setUserProfile(response.data); // Set user profile data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message); // Set error message
        setLoading(false); // Stop loading
      }
    };

    fetchUserProfile();
  }, []);

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </DefaultLayout>
    );
  }

  // Display error message if there's an error
  if (error) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-lg">Error: {error}</div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="text-gray-800">{userProfile.name || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{userProfile.email || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
          {userProfile.orders && userProfile.orders.length > 0 ? (
            <div className="space-y-6">
              {userProfile.orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Ordered on: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 font-medium">Total Price</p>
                      <p className="text-gray-800">${order.total_price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Payment Method</p>
                      <p className="text-gray-800">{order.payment_method}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Shipping Address</p>
                      <p className="text-gray-800">{order.shipping_address}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Items</h4>
                      <ul className="space-y-2">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.image || 'https://via.placeholder.com/50'}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div>
                                <p className="text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-gray-800">${item.price}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserProfile;