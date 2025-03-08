import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../axiosInstance";
import ProductCard from "../components/Cards/ProductCard";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
import { FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get the search query from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchProducts = useCallback(() => {
    let url = "/products?";
    if (selectedCategory) url += `category_id=${selectedCategory}&`;
    if (searchQuery || query) url += `search=${searchQuery || query}&`;
    if (minPrice) url += `min_price=${minPrice}&`;
    if (maxPrice) url += `max_price=${maxPrice}&`;
    if (sortOption) url += `sort=${sortOption}&`;

    axiosInstance
      .get(url)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [selectedCategory, searchQuery, sortOption, minPrice, maxPrice, query]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce search to reduce API calls

    return () => clearTimeout(delaySearch);
  }, [fetchProducts]);

  return (
    <DefaultLayout>
      <div className="flex flex-col md:flex-row gap-6 p-6 mt-20">
        {/* Toggle Button for Mobile */}
        <button
          className="md:hidden flex items-center gap-2 bg-blue-500 text-white p-2 rounded-md mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filters
        </button>

        {/* Sidebar (Filters) */}
        <aside
          className={`bg-gray-100 p-4 rounded-md md:w-1/4 w-full md:block ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Category Filter */}
          <h3 className="font-semibold mb-2">Category</h3>
          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <h3 className="font-semibold mt-4 mb-2">Price Range</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>

          {/* Sorting */}
          <h3 className="font-semibold mt-4 mb-2">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
            <option value="popular">Most Popular</option>
          </select>
        </aside>

        {/* Product Grid */}
        <div className="md:w-3/4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="text-center text-gray-600 col-span-full">No products available.</p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductList;