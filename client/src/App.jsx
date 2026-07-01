import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SellProduct from "./pages/SellProduct";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import MyPurchases
from "./pages/MyPurchases";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    
      <div
        style={{
          minHeight: "100vh",
    background: "#FAF6F1",
          color: "#3D2C2E",
        }}
      >
        <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/sell"
            element={
              <PrivateRoute>
                <SellProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-product/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />

          <Route
        path="/profile"
        element={<Profile />}
        />
          <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
<Route
  path="/wishlist"
  element={
    <PrivateRoute>
      <Wishlist />
    </PrivateRoute>
  }
/>
<Route
  path="/admin"
  element={<AdminDashboard />}
/>
<Route
  path="/my-purchases"
  element={
    <PrivateRoute>
      <MyPurchases />
    </PrivateRoute>
  }
/>
<Route
  path="/oauth-success"
  element={<OAuthSuccess />}
/>
    </Routes>      
    </BrowserRouter>
    </div>
  );
}

export default App;