import { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Register = () => {
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
      } else {
        alert('Token not received!');
      }
    } catch (error) {
      console.error(error.response.data);
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
