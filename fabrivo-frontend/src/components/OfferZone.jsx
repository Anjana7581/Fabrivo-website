import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const OfferZone = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/products/section/offer-zone")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offer zone products:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🔥 Offer Zone</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-2 rounded-md shadow-md">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-medium mt-2">{product.title}</h3>
            <p className="text-gray-500">
              <span className="line-through text-red-500">₹{product.price}</span>{" "}
              <span className="font-bold">₹{product.offer_price}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferZone;
