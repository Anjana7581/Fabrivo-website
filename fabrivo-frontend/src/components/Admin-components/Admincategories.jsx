import { useState, useEffect } from "react";
import axiosInstance from '../../axiosInstance';
import "./Admincategories.css"; // Import the CSS file

const Admincategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories
  useEffect(() => {
    axiosInstance.get("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      });
  }, []);

  // Add new category
  const addCategory = () => {
    if (!newCategory.trim()) return;

    setLoading(true);
    axiosInstance.post("/categories", { name: newCategory })
      .then((response) => {
        setCategories([...categories, response.data.category]);
        setNewCategory("");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        setError("Failed to add category.");
      })
      .finally(() => setLoading(false));
  };

  // Delete category
  const deleteCategory = (id) => {
    axiosInstance.delete(`/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((cat) => cat.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        setError("Failed to delete category.");
      });
  };

  return (
    <div className="admin-categories-container">
      <h2 className="admin-categories-title">Manage Categoriesssssss</h2>

      {error && <p className="admin-categories-error">{error}</p>}

      <div className="admin-categories-input-container">
        <input
          type="text"
          className="admin-categories-input"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button 
          onClick={addCategory} 
          className="admin-categories-add-btn" 
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="admin-categories-list">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={category.id || index} className="admin-categories-item">
              <span>{category.name}</span>
              <button
                onClick={() => deleteCategory(category.id)}
                className="admin-categories-delete-btn"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="admin-categories-no-data">No categories available.</p>
        )}
      </ul>
    </div>
  );
};

export default Admincategories;
