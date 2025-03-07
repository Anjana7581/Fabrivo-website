import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Adminnew.css';

function Adminnew() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    offer_price: '',
    color: '',
    type: '',
    description: '',
    rating: '',
    category_id: '',  // New field for category
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // State to store categories
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    axiosInstance.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('price', formData.price);
    formPayload.append('offer_price', formData.offer_price);
    formPayload.append('color', formData.color);
    formPayload.append('type', formData.type);
    formPayload.append('description', formData.description);
    formPayload.append('rating', formData.rating);
    formPayload.append('category_id', formData.category_id); // Append category
    if (image) {
      formPayload.append('image', image);
    }

    try {
      const response = await axiosInstance.post('/products', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Product created successfully:', response.data);
      navigate('/admin-dashboard/admin-product');

    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
    }
  };

  return (
    <div className="admin-new">
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title} required />
        <input type="number" name="price" placeholder="Price" onChange={handleInputChange} value={formData.price} required />
        <input type="number" name="offer_price" placeholder="Offer Price" onChange={handleInputChange} value={formData.offer_price} />
        <input type="text" name="color" placeholder="Color" onChange={handleInputChange} value={formData.color} required />
        <input type="text" name="type" placeholder="Type" onChange={handleInputChange} value={formData.type} required />
        <textarea name="description" placeholder="Description" onChange={handleInputChange} value={formData.description} required />
        <input type="number" name="rating" placeholder="Rating" step="0.1" onChange={handleInputChange} value={formData.rating} />

        {/* Category Selection Dropdown */}
        <select name="category_id" onChange={handleInputChange} value={formData.category_id} required>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default Adminnew;
