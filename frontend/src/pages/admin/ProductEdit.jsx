// src/pages/admin/ProductEdit.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";     // <<< ใช้รับพารามิเตอร์ id

import AdminLayout from "@/layouts/AdminLayout.jsx";
import "@/pages/admin/admin-style/sidebar.css";
import "@/pages/admin/admin-style/ad_edit_product.css";

export default function ProductEdit() {
  const { id } = useParams(); // << id จาก /admin/products/:id/edit

  useEffect(() => {
    const cdnId = "fa-6-5-cdn";
    if (!document.getElementById(cdnId)) {
      const link = document.createElement("link");
      link.id = cdnId;
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">
            <img src="/assets/logo-no-bg.png" alt="Admin Logo" style={{ width: 120, height: "auto" }}/>
          </div>
          <i className="fa-solid fa-bars menu-btn" aria-label="Toggle sidebar" role="button" tabIndex={0}></i>
        </div>
        {/* ... เมนูอื่น ๆ ... */}
      </aside>

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <div></div>
          <div className="account"><i className="fa-regular fa-circle-user"></i> ACCOUNT</div>
        </header>

        <div className="content">
          <h1 className="title">EDIT PRODUCT #{id}</h1>

          <div className="grid">
            {/* left form */}
            <section className="card">
              {/* ...ฟอร์มเดิม... */}
            </section>

            {/* right */}
            <section className="card">
              <h3 style={{ margin: "4px 0 10px", fontSize: 16 }}>Upload images</h3>
              <div className="image-drop" aria-label="Upload images area"></div>

              <div className="actions">
                <button className="btn ghost">Cancel</button>
                <button className="btn primary">Save</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
