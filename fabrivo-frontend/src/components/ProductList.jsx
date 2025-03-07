import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch Categories
    axiosInstance.get("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch Products
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = () => {
    let url = "/products";
    if (selectedCategory) {
      url += `?category_id=${selectedCategory}`;
    }

    axiosInstance.get(url)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded ${!selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded ${selectedCategory === category.id ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Display Products */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image_url} alt={product.title} className="w-full h-40 object-cover" />
            <h2>{product.title}</h2>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
