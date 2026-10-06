import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {LanguageProvider} from './i18n/LanguageContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ClientDashboard from './pages/dashboards/ClientDashboard';
import VendorDashboard from './pages/dashboards/VendorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import AddCategory from './pages/AddCategory';
import EditProduct from './pages/EditProduct';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App(){
 return <LanguageProvider><Router><div className="site-shell"><Navbar/><main><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/shop" element={<Shop/>}/>
  <Route path="/men" element={<Shop category="Men"/>}/>
  <Route path="/women" element={<Shop category="Women"/>}/>
  <Route path="/new-arrivals" element={<Shop category="New Arrivals"/>}/>
  <Route path="/product/:id" element={<ProductDetail/>}/>
  <Route path="/blog" element={<Blog/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/checkout" element={<Checkout/>}/>
  <Route path="/order-success/:id" element={<OrderSuccess/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/dashboard" element={<ClientDashboard/>}/>
  <Route path="/vendor/dashboard" element={<VendorDashboard/>}/>
  <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
  <Route path="/admin/add-product" element={<AddProduct/>}/>
  <Route path="/admin/add-category" element={<AddCategory/>}/>
  <Route path="/vendor/edit-product/:id" element={<EditProduct/>}/>
 </Routes></main><Footer/></div></Router></LanguageProvider>
}