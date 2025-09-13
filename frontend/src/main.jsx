// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

// Admin pages
import ProductsList from "./pages/admin/ProductsList.jsx";
import ProductCreate from "./pages/admin/ProductCreate.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import OrderDetail from "./pages/admin/OrderDetail.jsx";

// Global CSS (ถ้ามี)
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* default → ไปหน้า login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* admin: products */}
        <Route path="/admin/products" element={<ProductsList />} />
        <Route path="/admin/products/new" element={<ProductCreate />} />
        <Route path="/admin/products/:id/edit" element={<ProductEdit />} />

        {/* admin: orders */}
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} />

        {/* not found */}
        <Route path="*" element={<div style={{ padding: 24 }}>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
