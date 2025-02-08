import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import GlobalProvider from "./Context/GlobalProvider";

// Header Components
import Nave from "./Header/Nave";
import Footer from "./General/Footer";

// General Components
import Home from "./General/Home";
import Men from "./General/Men";
import Women from "./General/Women";
import Trend from "./General/Trend";
import ProductDetails from "./General/ProductDetails";
import Login from "./General/Login";
import Profile from "./General/Profile";
import Addtocart from "./Header/Addtocart";
import Form from "./Header/Form";

// Admin Components
import Admin from "./Admin/Admin";
import User from "./Admin/User";
import Product from "./Admin/Product";
import Order from "./Admin/Order";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin") || location.pathname.startsWith("/admin"); // ✅ Hide Navbar & Footer in Admin

  return (
    <>
      {!hideNavbar && <Nave />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/brand" element={<Trend />} />
            <Route path="/men/:id" element={<ProductDetails />} />
            <Route path="/brand/:id" element={<ProductDetails />} />
            <Route path="/addtocart" element={<Addtocart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/form" element={<Form />} />





            {/* ✅ Admin Nested Routes */}
            <Route path="/admin" element={<Admin />}>
              <Route index element={<h1 className="text-3xl font-bold">Admin Dashboard</h1>} />
              <Route path="users" element={<User />} />
              <Route path="products" element={<Product />} />
              <Route path="orders" element={<Order />} />
            </Route>
          </Routes>

        </Layout>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
