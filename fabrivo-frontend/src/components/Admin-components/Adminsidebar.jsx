import "./Adminsidebar.css";
import { Link } from "react-router-dom";

function Adminsidebar() {
  return (
    <div className="adminsidebar-main">
      <ul>
        <li><Link to="admin-user">User</Link></li>
        <li><Link to="admin-product">Products</Link></li>
        <li><Link to="admin-new">New</Link></li>
        <li><Link to="admin-payment">Payment</Link></li>
        <li><Link to="admin-profile">Profile</Link></li>
        <li><Link to="admin-order">Orders</Link></li>

        <li><Link to="admin-categories">Categories</Link></li>

      </ul>
    </div>
  );
}

export default Adminsidebar;
