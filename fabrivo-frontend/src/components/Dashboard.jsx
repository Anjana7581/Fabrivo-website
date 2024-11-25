import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUser(response.data);
      } catch (error) {
        console.error(error.response.data);
        if (error.response.status === 401) {
          alert('Please log in again.');
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
      localStorage.removeItem('token');
      alert('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error(error.response.data);
      alert('Logout failed!');
    }
  };

  return (
    <>
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  );
};

export default Dashboard;
