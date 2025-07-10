 import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import StaffTable from "./StaffTable";
import CustomerCards from "./CustomerCards";
import CustomerTable from "./CustomerTable";
import VendorCards from "./VendorCards";
import VendorTable from "./VendorTable";
import Staffdetail from "./Staffdetail";
import Customerdetail from "./Customerdetail";
import Vendordetail from "./Vendordetail";
import PeopleTabs from "./PeopleTabs";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "1.5rem" }}>
      

      {/* Show PeopleTabs on all pages */}
      <PeopleTabs />

      <Routes>
        {/* Staff Page */}
        <Route
          path="/admin/people"
          element={
            <>
              <Dashboard />
              <StaffTable />
            </>
          }
        />

        {/* Customer Page */}
        <Route
          path="/customer"
          element={
            <>
              <CustomerCards />
              <CustomerTable />
            </>
          }
        />

        {/* Vendor Page */}
        <Route
          path="/vendor"
          element={
            <>
              <VendorCards />
              <VendorTable />
            </>
          }
        />

        {/* Detail Pages */}
        <Route path="/staff/:id" element={<Staffdetail />} />
        <Route path="/admin/people/customers/:id" element={<Customerdetail />} />
        <Route path="/admin/people/vendors/:id" element={<Vendordetail />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default function MyModule() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
