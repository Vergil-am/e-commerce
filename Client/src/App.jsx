import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { useSelector } from "react-redux";
import Order from "./pages/Order";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProtectedRoute from "./pages/PrivateRoutes";
import Paymentsuccess from "./pages/PaymentSuccess";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/user/order/:id' element={<Order />} />
          <Route path='/order/success' element={<Paymentsuccess />} />
        </Route>
              </Routes>
    </BrowserRouter>
  );
}

export default App;
