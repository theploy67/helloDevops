// src/pages/admin/ProductsList.jsx
import React, { useEffect, useMemo, useState } from "react";

// (ถ้ายังไม่ใช้จริง สามารถลบได้เพื่อเลี่ยง unused import warning)
import AdminLayout from "@/layouts/AdminLayout.jsx";

// ✅ CSS ด้วย alias ให้ตรงกับตำแหน่งไฟล์ของคุณ
import "@/pages/admin/admin-style/sidebar.css";
import "@/pages/admin/admin-style/ad_product_list.css";

export default function ProductsList() {
  /* ---------- Sidebar toggles (แทน data-target + JS เดิม) ---------- */
  const [isEcomOpen, setIsEcomOpen] = useState(true);
  const [isOrderOpen, setIsOrderOpen] = useState(true);

  /* ---------- โหลด Font Awesome ครั้งเดียว ---------- */
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

  /* ---------- Table data (แทน .table-row ที่เขียนทิ้งไว้ใน HTML) ---------- */
  const sampleRows = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, i) => ({
        id: String(i + 1).padStart(5, "0"),
        name: "Name",
        price: "00.00",
        category: "Fruits",
        brand: "-",
        qty: 10,
        stock: "In Stock",
      })),
    []
  );

  /* ---------- ค้นหา ---------- */
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleRows;
    return sampleRows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q)
    );
  }, [query, sampleRows]);

  /* ---------- เพจจิ้ง (พอร์ต logic จากสคริปต์ใน HTML) ---------- */
  const rowsPerPage = 10; // ให้ตรงกับของเดิม
  const windowSize = 3;   // แสดงเลขหน้าทีละ 3
  const [page, setPage] = useState(1);

  // เมื่อกรองแล้ว จำนวนหน้าอาจลด รีเซ็ตไปหน้า 1
  useEffect(() => setPage(1), [query]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const currentPage = clamp(page, 1, totalPages);

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalItems);
  const pageRows = filtered.slice(startIdx, endIdx);

  // สไลด์หน้าต่างเลขหน้าแบบเดียวกับสคริปต์เดิม
  function windowRange(page, total, size) {
    const lastStart = Math.max(1, total - size + 1);
    const start = clamp(page, 1, lastStart);
    const end = Math.min(total, start + size - 1);
    return { start, end };
  }
  const { start, end } = windowRange(currentPage, totalPages, windowSize);

  const goto = (p) => setPage(clamp(p, 1, totalPages));

  /* ---------- ปุ่ม ADD NEW ---------- */
  const AddButton = (
    <a href="/admin/products/new" className="btn-add">
      <span className="box">
        <i className="fa-solid fa-plus" />
      </span>
      ADD NEW
    </a>
  );

  return (
    <div className="app">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">
            <img
            src="/assets/logo-no-bg.png"
            alt="Admin Logo"
            style={{ width: 120, height: "auto" }}
            />
          </div>
          <i
            className="fa-solid fa-bars menu-btn"
            aria-label="Toggle sidebar"
            role="button"
            tabIndex={0}
          />
        </div>

        <div className="section-title">MAIN</div>
        <nav className="nav">
          <a className="nav-item" href="#">
            <span className="icon">
              <i className="fa-solid fa-house" />
            </span>
            Home
          </a>
        </nav>

        <div className="section-title">ALL PAGE</div>

        {/* E-commerce */}
        <div className="nav">
          <div
            className="nav-item nav-toggle"
            role="button"
            tabIndex={0}
            aria-expanded={isEcomOpen}
            onClick={() => setIsEcomOpen((v) => !v)}
            onKeyDown={(e) => e.key === "Enter" && setIsEcomOpen((v) => !v)}
          >
            <span className="icon">
              <i className="fa-solid fa-cart-shopping" />
            </span>
            E-commerce
            <span className="right">
              <i
                className="fa-solid fa-chevron-down"
                style={{ transform: `rotate(${isEcomOpen ? 180 : 0}deg)` }}
              />
            </span>
          </div>
          <div
            className="submenu"
            id="menu-ecom"
            style={{ display: isEcomOpen ? "block" : "none" }}
          >
            <a className="sub-item" href="#">Add Product</a>
            <a className="sub-item active" href="#">Product List</a>
          </div>
        </div>

        {/* Order */}
        <div className="nav">
          <div
            className="nav-item nav-toggle"
            role="button"
            tabIndex={0}
            aria-expanded={isOrderOpen}
            onClick={() => setIsOrderOpen((v) => !v)}
            onKeyDown={(e) => e.key === "Enter" && setIsOrderOpen((v) => !v)}
          >
            <span className="icon">
              <i className="fa-solid fa-layer-group" />
            </span>
            Order
            <span className="right">
              <i
                className="fa-solid fa-chevron-down"
                style={{ transform: `rotate(${isOrderOpen ? 180 : 0}deg)` }}
              />
            </span>
          </div>
          <div
            className="submenu"
            id="menu-order"
            style={{ display: isOrderOpen ? "block" : "none" }}
          >
            <a className="sub-item" href="#">Order List</a>
            <a className="sub-item" href="#">Order Detail</a>
            <a className="sub-item" href="#">Order Tracking</a>
          </div>
        </div>
      </aside>

      {/* ===== Main ===== */}
      <main className="main">
        <header className="topbar">
          <div />
          <div className="account">
            <i className="fa-regular fa-circle-user" /> ACCOUNT
          </div>
        </header>

        <div className="content">
          {/* หัวตาราง: Title + Search + Add */}
          <div className="content-header">
            <h1 className="title">PRODUCT LIST</h1>

            <div className="action-bar">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass" />
                <input
                  type="text"
                  placeholder="Search product…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {AddButton}
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div>Product</div>
              <div>Product ID</div>
              <div>Price</div>
              <div>Category</div>
              <div>Brand</div>
              <div>Quantity</div>
              <div>Stock</div>
              <div>Action</div>
            </div>

            {/* แถวข้อมูล (แทน div.table-row ใน HTML) */}
            {pageRows.map((r, idx) => (
              <div className="table-row" key={`${r.id}-${idx}`}>
                <div className="prod">
                  <span className="cube">
                    <i className="fa-solid fa-cube" />
                  </span>{" "}
                  {r.name}
                </div>
                <div>#{r.id}</div>
                <div>{r.price}</div>
                <div>{r.category}</div>
                <div>{r.brand}</div>
                <div>{r.qty}</div>
                <div>{r.stock}</div>
                <div className="act">
                  <i className="fa-solid fa-pen" />{" "}
                  <i className="fa-solid fa-trash" />
                </div>
              </div>
            ))}

            {/* Footer + Pager (ยก logic จากสคริปต์เดิม) */}
            <div className="table-footer">
              <div className="hint">
                {totalItems
                  ? `Showing ${startIdx + 1}–${endIdx} of ${totalItems} entries`
                  : "Showing 0–0 of 0 entries"}
              </div>

              <div className="pager">
                <button
                  className="circle"
                  aria-label="Prev"
                  onClick={() => goto(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fa-solid fa-chevron-left" />
                </button>

                <div id="pagerNumbers">
                  {Array.from({ length: end - start + 1 }).map((_, i) => {
                    const p = start + i;
                    return (
                      <button
                        key={p}
                        type="button"
                        className={`pill ${p === currentPage ? "active" : ""}`}
                        aria-current={p === currentPage ? "page" : "false"}
                        onClick={() => goto(p)}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="circle"
                  aria-label="Next"
                  onClick={() => goto(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
