// src/layouts/AdminLayout.jsx
import React from "react";

// ✅ ชี้ไปยังโฟลเดอร์จริง (จาก layouts → pages/admin/admin-style)
import "../pages/admin/admin-style/sidebar.css";

// (ถ้ามี Sidebar component)
import Sidebar from "../pages/admin/Sidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="app">
      {/* ใส่ Sidebar ถ้าใช้ */}
      {/* <Sidebar /> */}
      <main className="main">{children}</main>
    </div>
  );
}
