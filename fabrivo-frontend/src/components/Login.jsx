import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import DefaultLayout from './DefaultLayout/DefaultLayout';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message); // Handle undefined response
      alert('Login failed!');
    }
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              data-testid="email-input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              data-testid="password-input"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              data-testid="login-button"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            New?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;