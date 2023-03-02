
import './index.css';
import Home from './pages/Home';
import NewProduct from './pages/adminPages/NewProduct';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Products from './pages/Products';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Admin from './pages/Admin';
import Users from './pages/adminPages/Users'
import Orders from './pages/adminPages/Orders';
import AdminProducts from './pages/adminPages/AdminProducts'
import Order from './pages/Order';
import About from './pages/About';
import Cart from './pages/Cart';
import ProtectedRoute from './pages/PrivateRoutes';
import Payment from './pages/Payment';
import Paymentsuccess from './pages/PaymentSuccess';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/orders' element={<Orders />} />
            <Route path='/admin/products' element={<AdminProducts />} />
            <Route path='/admin/products/create' element={<NewProduct />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}/>
          <Route path='/user/order/:id' element={<Order />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/about" element={<About />} />
          <Route path="/paymentsuccess" element={<Paymentsuccess />} />



        </Routes>
    
    
    </BrowserRouter>
  )
}

export default App;
