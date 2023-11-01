//import logo from './logo.svg';
import "./App.css";
import Home from "./pages/Home";
import React, { createContext, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import SingleDetail from "./pages/SingleDetail";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Payment from "./pages/Payment";
import { Search } from "@mui/icons-material";
import { Results } from "./pages/Results";
import { CatList } from "./pages/CatList";
import { Admin } from "./pages/Admin";
import { AddUser } from "./components/admin/AddUser";
import { AddProduct } from "./components/admin/AddProduct";
import { ViewUser } from "./components/admin/ViewUser";
import { ViewProduct } from "./components/admin/ViewProduct";

export const ProductContext = createContext();
function App() {
  const [product, setProduct] = useState(null);
  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/single" element={<SingleDetail />} />
          <Route path="/home" element={<ProductList />} />
          <Route path="/shopping-cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/results/:productId" element={<Results />} />
          <Route path="/catlist/:productTitleFromCat" component={CatList} />
          <Route path="/admin-page" element={<Admin />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/viewUser" element={<ViewUser />} />
          <Route path="/viewProduct" element={<ViewProduct />} />
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  );
}

export default App;
