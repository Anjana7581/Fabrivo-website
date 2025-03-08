import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      console.log("API Response:", response.data);

      if (!Array.isArray(response.data)) throw new Error("Invalid response format");

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div className="text-center py-4">Loading orders...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Shipping Address</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.user_id}</td>
                  <td className="border p-2">${parseFloat(order.total_price).toFixed(2)}</td>
                  <td className="border p-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="border p-2">{order.shipping_address || "N/A"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleStatusChange(order.id, "cancelled")}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;
