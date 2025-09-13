// src/pages/admin/ProductEdit.jsx
import React, { useEffect } from "react";
// ปรับ path ให้ตรงโปรเจกต์ของคุณ
import "./sidebar.css";
import "./ad_edit_product.css";
import "./admin-style/sidebar.css";
import "./admin-style/ad_edit_product.css";
export default function ProductEdit() {
  // โหลด Font Awesome เหมือนแท็ก <link> ใน <head>
  useEffect(() => {
    const id = "fa-6-5-cdn";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      {/* โครงสร้างเท่าเดิมตั้งแต่ <body> ลงมา */}
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-logo">
              <img
                src="/images/admin/logo no BG.png"
                alt="Admin Logo"
                style={{ width: "120px", height: "auto" }}
              />
            </div>
            <i
              className="fa-solid fa-bars menu-btn"
              aria-label="Toggle sidebar"
              role="button"
              tabIndex={0}
            ></i>
          </div>

          <div className="section-title">MAIN</div>
          <nav className="nav">
            <a className="nav-item" href="#">
              <span className="icon">
                <i className="fa-solid fa-house"></i>
              </span>
              Home
            </a>
          </nav>

          <div className="section-title">ALL PAGE</div>

          {/* E-commerce */}
          <div className="nav">
            <div
              className="nav-item nav-toggle"
              data-target="#menu-ecom"
              aria-expanded="true"
              role="button"
              tabIndex={0}
            >
              <span className="icon">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              E-commerce
              <span className="right">
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ transform: "rotate(180deg)" }}
                ></i>
              </span>
            </div>
            <div className="submenu" id="menu-ecom" style={{ display: "block" }}>
              <a className="sub-item" href="#">
                Add Product
              </a>
              <a className="sub-item active" href="#">
                Product List
              </a>
            </div>
          </div>

          {/* Order */}
          <div className="nav">
            <div
              className="nav-item nav-toggle"
              data-target="#menu-order"
              aria-expanded="true"
              role="button"
              tabIndex={0}
            >
              <span className="icon">
                <i className="fa-solid fa-layer-group"></i>
              </span>
              Order
              <span className="right">
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ transform: "rotate(180deg)" }}
                ></i>
              </span>
            </div>
            <div className="submenu" id="menu-order" style={{ display: "block" }}>
              <a className="sub-item" href="#">
                Order List
              </a>
              <a className="sub-item" href="#">
                Order Detail
              </a>
              <a className="sub-item" href="#">
                Order Tracking
              </a>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <header className="topbar">
            <div></div>
            <div className="account">
              <i className="fa-regular fa-circle-user"></i> ACCOUNT
            </div>
          </header>

          <div className="content">
            <h1 className="title">EDIT PRODUCT</h1>

            <div className="grid">
              {/* Left card: form */}
              <section className="card">
                <div className="field">
                  <label>Product name *</label>
                  <input type="text" placeholder="e.g., Apple Fuji" />
                </div>

                <div className="row">
                  <div className="field">
                    <label>Category *</label>
                    <select>
                      <option>Fruits</option>
                      <option>Vegetables</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Price</label>
                    <input type="text" placeholder="0.00" />
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label>Brand *</label>
                    <select>
                      <option>-</option>
                      <option>Pure Mart</option>
                      <option>Local Farm</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Quantity</label>
                    <input type="number" min="0" placeholder="0" />
                  </div>
                </div>

                <div className="field">
                  <label>Description *</label>
                  <textarea rows="6" placeholder="Short description..."></textarea>
                </div>
              </section>

              {/* Right card: image area + buttons */}
              <section className="card">
                <h3 style={{ margin: "4px 0 10px", fontSize: "16px" }}>Upload images</h3>
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

      {/* เดิมมี <script> ว่างไว้ — ใน React ไม่จำเป็นต้องใส่ */}
    </>
  );
}
