import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import DefaultLayout from './DefaultLayout/DefaultLayout';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/register', formData);
      console.log(response.data);
      
      // Save token to localStorage after successful registration
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Registration successful!');
        navigate('/');
      } else {
        alert('Token not received!');
      }
    } catch (error) {
      console.error(error.response.data);
      alert('Registration failed!');
    }
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Register;
