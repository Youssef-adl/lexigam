import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composants
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import AddCategory from './pages/AddCategory';
import Checkout from './pages/Checkout';
import ClientDashboard from './pages/dashboards/ClientDashboard';
import VendorDashboard from './pages/dashboards/VendorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboards */}
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Administration */}
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/vendor/edit-product/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
