import { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
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
      console.error(error.response.data);
      alert('Login failed!');
    }
  };

  return (
    <DefaultLayout>
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
    <p>New? <Link to='/register'>Register</Link></p>
    </DefaultLayout>
  );
};

export default Login;
