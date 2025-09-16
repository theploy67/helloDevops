// src/main.jsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ===== Auth =====
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

// ===== User =====
import Home from "./pages/user/Home.jsx";
import Shop from "./pages/user/Shop.jsx";
import WishList from "./pages/user/WishList.jsx";
import ProductDetail from "./pages/user/ProductDetail.jsx";
import PlaceOrder from "./pages/user/PlaceOrder.jsx";
import Tracking from "./pages/user/Tracking.jsx";

// ===== Admin =====
import ProductsList from "./pages/admin/ProductsList.jsx";
import ProductCreate from "./pages/admin/ProductCreate.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import OrderDetail from "./pages/admin/OrderDetail.jsx";

// Global CSS
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ถ้า deploy ใต้ sub-path ให้กำหนด basename ใน BrowserRouter ได้ */}
    <BrowserRouter /* basename="/" */>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <Routes>
          {/* Default: ไปหน้า Home (ถ้าอยากเริ่มที่ login ให้สลับเป็น /login) */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ===== Auth ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* ===== User ===== */}
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<PlaceOrder />} />
          <Route path="/tracking/:orderId" element={<Tracking />} />

          {/* ===== Admin: Products ===== */}
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/products/new" element={<ProductCreate />} />
          <Route path="/admin/products/:id/edit" element={<ProductEdit />} />

          {/* ===== Admin: Orders ===== */}
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/orders/:id" element={<OrderDetail />} />

          {/* ===== Legacy/Shortcut paths (กันพิมพ์ URL เก่า/ตัวใหญ่) ===== */}
          <Route path="/ProductsList" element={<Navigate to="/admin/products" replace />} />
          <Route path="/ProductCreate" element={<Navigate to="/admin/products/new" replace />} />
          <Route path="/ProductEdit/:id" element={<Navigate to="/admin/products/:id/edit" replace />} />
          <Route path="/OrderList" element={<Navigate to="/admin/orders" replace />} />
          <Route path="/OrderDetail/:id" element={<Navigate to="/admin/orders/:id" replace />} />

          {/* 404 */}
          <Route path="*" element={<div style={{ padding: 24 }}>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
