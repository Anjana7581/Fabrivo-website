import Adminsidebar from "../../components/Admin-components/Adminsidebar";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Outlet } from "react-router-dom";
import './AdminDashboard.css'

function AdminDashboard() {
  return (
    <DefaultLayout>
      <div className="admindashboard">
        <div className="admin-sidebar">
          <Adminsidebar />
        </div>
        <div className="admin-body">
          {/* Outlet renders the nested routes' content */}
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminDashboard;
