// src/pages/admin/ProductCreate.jsx
import React, { useEffect, useRef } from "react";
// ปรับ path ให้ตรงโปรเจกต์ของคุณ
import "./sidebar.css";
import "./ad_add_product.css";
import "./admin-style/sidebar.css";
import "./admin-style/ad_add_product.css";

export default function ProductCreate() {
  // โหลด Font Awesome แบบแท็ก <link> ใน <head>
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

  // ------- โค้ดอัปโหลดรูป: bind events โดยไม่แก้โครงสร้าง HTML -------
  const urlsRef = useRef([]); // เก็บ object URLs เพื่อ cleanup
  const imagesRef = useRef([]); // เก็บ File objects

  useEffect(() => {
    const dropzone = document.getElementById("dropzone");
    const filePicker = document.getElementById("filePicker");
    const thumbs = document.getElementById("thumbs");
    if (!dropzone || !filePicker || !thumbs) return;

    const addFiles = (fileList) => {
      const files = [...fileList].filter((f) => f.type.startsWith("image/"));
      files.forEach((f) => {
        imagesRef.current.push(f);
        makeThumb(f);
      });
    };

    const makeThumb = (file) => {
      const url = URL.createObjectURL(file);
      urlsRef.current.push(url);

      const box = document.createElement("div");
      box.className = "thumb";
      box.innerHTML = `
        <img src="${url}" alt="${file.name}">
        <button class="remove">×</button>
      `;
      box.querySelector(".remove").onclick = () => {
        imagesRef.current = imagesRef.current.filter((x) => x !== file);
        URL.revokeObjectURL(url);
        urlsRef.current = urlsRef.current.filter((u) => u !== url);
        box.remove();
      };
      thumbs.appendChild(box);
    };

    // handlers
    const onClickDrop = () => filePicker.click();
    const onPickerChange = (e) => addFiles(e.target.files);
    const onDragEnter = (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    };
    const onDragOver = (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    };
    const onDragLeave = (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    };
    const onDrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      addFiles(e.dataTransfer.files);
    };

    // bind events
    dropzone.addEventListener("click", onClickDrop);
    filePicker.addEventListener("change", onPickerChange);
    dropzone.addEventListener("dragenter", onDragEnter);
    dropzone.addEventListener("dragover", onDragOver);
    dropzone.addEventListener("dragleave", onDragLeave);
    dropzone.addEventListener("drop", onDrop);

    // cleanup
    return () => {
      dropzone.removeEventListener("click", onClickDrop);
      filePicker.removeEventListener("change", onPickerChange);
      dropzone.removeEventListener("dragenter", onDragEnter);
      dropzone.removeEventListener("dragover", onDragOver);
      dropzone.removeEventListener("dragleave", onDragLeave);
      dropzone.removeEventListener("drop", onDrop);
      // revoke URLs
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = [];
      imagesRef.current = [];
    };
  }, []);

  return (
    <>
      {/* โครงสร้างคงเดิมตั้งแต่ใน <body> */}
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
            <h1 className="title">ADD PRODUCT</h1>

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
                <h3 style={{ margin: "4px 0 10px", fontSize: "16px" }}>
                  Upload images
                </h3>

                {/* กล่องอัปโหลด (ต้องมี id=dropzone) */}
                <div className="image-drop" id="dropzone" aria-label="Upload images area">
                  <div className="hint" style={{ color: "#6b7280" }}>
                    Click or drop files here
                  </div>
                  <div id="thumbs" className="thumbs"></div>
                </div>

                <div className="actions">
                  <button className="btn ghost">Cancel</button>
                  <button className="btn primary">Save</button>
                </div>

                {/* input ไฟล์ที่ซ่อนอยู่ (ต้องมี id=filePicker) */}
                <input id="filePicker" type="file" accept="image/*" multiple hidden />
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
