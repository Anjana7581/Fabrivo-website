import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Pagenotfound from './pages/Pagenotfound/Pagenotfound.jsx';
// import AllProducts from './pages/AllProducts/AllProducts.jsx';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Adminproduct from './components/Admin-components/Adminproduct.jsx';
import Adminuser from './components/Admin-components/Adminuser.jsx';
import Adminnew from './components/Admin-components/Adminnew.jsx';
import Adminpayment from './components/Admin-components/Adminpayment.jsx';
import Adminprofile from './components/Admin-components/Adminprofile.jsx';
import { CartProvider } from './context/cartcontext.jsx';
import Chatbot  from './components/Chatbot/Chatbot.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './components/checkout.jsx';
import OrderConfirmation from './components/orderconfirmation.jsx';
import EditProduct from './components/Admin-components/EditProduct.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import ProductList from './components/ProductList.jsx';
import Admincategories from './components/Admin-components/Admincategories.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import UserProfile from './components/UserProfile.jsx';
import Adminorder from './components/Admin-components/Adminorder.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

function App() {
  return (
    <WishlistProvider>
    < CartProvider >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/allproducts" element={<AllProducts />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/productlist" element={<ProductList/>} />
        <Route path="/contact-us" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<UserProfile/>} />

        {/* Parent route for AdminDashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          {/* Nested routes relative to /admin-dashboard */}
          <Route path="admin-product" element={<Adminproduct />} />
          <Route path="admin-user" element={<Adminuser />} />
          <Route path="admin-new" element={<Adminnew />} />
          <Route path="admin-payment" element={<Adminpayment />} />
          <Route path="admin-profile" element={<Adminprofile />} />
          <Route path="admin-product/edit/:id" element={<EditProduct />} />
          <Route path="admin-categories" element={<Admincategories/>} />
          <Route path="admin-order" element={<Adminorder/>} />

        </Route>
      </Routes>
      <Chatbot />

    </Router>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;
