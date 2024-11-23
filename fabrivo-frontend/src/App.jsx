import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Pagenotfound from './pages/Pagenotfound/Pagenotfound.jsx';
import AllProducts from './pages/AllProducts/AllProducts.jsx';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Adminproduct from './components/Admin-components/Adminproduct.jsx';
import Adminuser from './components/Admin-components/Adminuser.jsx';
import Adminnew from './components/Admin-components/Adminnew.jsx';
import Adminpayment from './components/Admin-components/Adminpayment.jsx';
import Adminprofile from './components/Admin-components/Adminprofile.jsx';

import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Pagenotfound />} />

        {/* Parent route for AdminDashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          {/* Nested routes relative to /admin-dashboard */}
          <Route path="admin-product" element={<Adminproduct />} />
          <Route path="admin-user" element={<Adminuser />} />
          <Route path="admin-new" element={<Adminnew />} />
          <Route path="admin-payment" element={<Adminpayment />} />
          <Route path="admin-profile" element={<Adminprofile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
