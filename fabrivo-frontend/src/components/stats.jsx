import React, { useState, useEffect } from "react";

const Stats = () => {
  // State for animated counters
  const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);

  // Target values for counters
  const targetProducts = 10000;
  const targetCustomers = 5000;
  const targetOrders = 25000;
  const targetSatisfaction = 95; // Percentage

  // Animation duration (in milliseconds)
  const animationDuration = 2000;

  useEffect(() => {
    // Animate products count
    const animateProducts = setInterval(() => {
      if (productsCount < targetProducts) {
        setProductsCount((prev) => prev + 100);
      }
    }, animationDuration / (targetProducts / 100));

    // Animate customers count
    const animateCustomers = setInterval(() => {
      if (customersCount < targetCustomers) {
        setCustomersCount((prev) => prev + 50);
      }
    }, animationDuration / (targetCustomers / 50));

    // Animate orders count
    const animateOrders = setInterval(() => {
      if (ordersCount < targetOrders) {
        setOrdersCount((prev) => prev + 250);
      }
    }, animationDuration / (targetOrders / 250));

    // Animate satisfaction rate
    const animateSatisfaction = setInterval(() => {
      if (satisfactionRate < targetSatisfaction) {
        setSatisfactionRate((prev) => prev + 1);
      }
    }, animationDuration / targetSatisfaction);

    // Cleanup intervals
    return () => {
      clearInterval(animateProducts);
      clearInterval(animateCustomers);
      clearInterval(animateOrders);
      clearInterval(animateSatisfaction);
    };
  }, [productsCount, customersCount, ordersCount, satisfactionRate]);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Products */}
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl font-bold text-blue-600">
              {productsCount.toLocaleString()}+
            </div>
            <p className="text-lg text-gray-600 mt-2">Products</p>
          </div>

          {/* Customers */}
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl font-bold text-blue-600">
              {customersCount.toLocaleString()}+
            </div>
            <p className="text-lg text-gray-600 mt-2">Happy Customers</p>
          </div>

          {/* Orders */}
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl font-bold text-blue-600">
              {ordersCount.toLocaleString()}+
            </div>
            <p className="text-lg text-gray-600 mt-2">Orders Delivered</p>
          </div>

          {/* Satisfaction Rate */}
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl font-bold text-blue-600">
              {satisfactionRate}%
            </div>
            <p className="text-lg text-gray-600 mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;