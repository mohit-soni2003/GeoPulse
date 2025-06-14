import React from "react"; // ← Required for JSX
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/common/Landing';
import './App.css';
import SignUp from './pages/common/Signup';
import Login from './pages/common/Login';
import VerifyOTP from './pages/common/VerifyOTP';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AboutUs from './pages/common/AboutUs';
import Contact from './pages/common/Contact';
import Services from './pages/common/Services';
import Feature from './pages/common/Feature';
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PageNotFound from "./pages/common/PageNotFound";
import { useAuthStore } from './assets/store/authStore';

function App() {
  const { user, isAdmin, checkAuth,isAuthenticated } = useAuthStore();
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    const authenticate = async () => {
      setisLoading(true)
      await checkAuth();
      console.log("Authentication check completed");
      setisLoading(false)
    };
    authenticate();
  }, []);

  if (isLoading) return <div>Loading...</div>;


  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      console.log("Redirecting to Signin...");
      return <Navigate to="/signin" replace />; // Redirect to signin if not authenticated
    }

    if (user && !user.isVerified) {
      console.log("Redirecting to Verify Email...");
      return <Navigate to="/verify-email" replace />; // Redirect to verify email if user is not verified
    }

    return children; // Render protected route if user is authenticated and verified
  };
  const AdminRoute = ({ children }) => {
    if (!isAdmin) {
      console.log("Redierecting to user Dashboard...");
      return <Navigate to="/user-dashboard" replace />; // Redirect to signin if not authenticated
    }

    return children; // Render protected route if user is authenticated and verified
  };
  const UserRoute = ({ children }) => {
    if (isAdmin) {
      console.log("Redirecting to Signin Admin Dashboard---");
      return <Navigate to="/admin-dashboard" replace />; // Redirect to signin if not authenticated
    }

    return children; // Render protected route if user is authenticated and verified
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyOTP />} />
        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
