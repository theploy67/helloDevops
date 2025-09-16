// src/pages/admin/OrderList.jsx
import React, { useEffect, useMemo, useState } from "react";

// ✅ ใช้ alias @
import AdminLayout from "@/layouts/AdminLayout.jsx";
import "@/pages/admin/admin-style/sidebar.css";
import "@/pages/admin/admin-style/ad_order_pro_list.css";
// import { Link } from "react-router-dom";


export default function OrderList() {
  // โหลด Font Awesome แค่ครั้งเดียว
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

  // สถานะเมนูย่อยใน Sidebar
  const [isEcomOpen, setIsEcomOpen] = useState(true);
  const [isOrderOpen, setIsOrderOpen] = useState(true);

  // ตัวอย่างข้อมูลออเดอร์
  const orders = useMemo(
    () =>
      Array.from({ length: 27 }).map((_, i) => ({
        id: String(i + 1).padStart(5, "0"),
        price: (Math.floor(Math.random() * 9000) + 1000) / 100, // 10.00–100.00
        qty: Math.floor(Math.random() * 10) + 1,
        status: ["Success", "Pending", "Failed"][i % 3],
        tracking: i % 3 === 0 ? "TRK" + (100000 + i) : "-",
      })),
    []
  );

  // ค้นหา + เพจจิเนชัน
  const [query, setQuery] = useState("");
  const rowsPerPage = 10;
  const windowSize = 3;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        String(o.price).toLowerCase().includes(q) ||
        String(o.qty).toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q) ||
        o.tracking.toLowerCase().includes(q)
    );
  }, [orders, query]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const clampedPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    setPage(1); // เปลี่ยนคำค้น รีหน้ากลับ 1
  }, [query]);

  const startIdx = (clampedPage - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalItems);
  const pageRows = filtered.slice(startIdx, endIdx);

  function windowRange(current, total, size) {
    const lastStart = Math.max(1, total - size + 1);
    const start = Math.max(1, Math.min(current, lastStart));
    const end = Math.min(total, start + size - 1);
    return { start, end };
  }
  const { start, end } = windowRange(clampedPage, totalPages, windowSize);

  // ปุ่ม “ADD NEW”
  // ถ้าใช้ Router:
  // const AddBtn = (
  //   <Link to="/admin/orders/new" className="btn-add">
  //     <span className="box"><i className="fa-solid fa-plus" /></span>ADD NEW
  //   </Link>
  // );
  // ถ้าไม่ใช้ Router:
  const AddBtn = (
    <a href="/admin/orders/new" className="btn-add">
      <span className="box">
        <i className="fa-solid fa-plus" />
      </span>
      ADD NEW
    </a>
  );

  const goDetailHref = (id) => `/admin/orders/${id}`;

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">
             <img src="/assets/logo-no-bg.png" alt="Admin Logo" style={{ width: 120, height: "auto" }}/>    
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
            data-target="#menu-ecom"
            aria-expanded={isEcomOpen}
            role="button"
            tabIndex={0}
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
            <a className="sub-item" href="#">
              Add Product
            </a>
            <a className="sub-item" href="#">
              Product List
            </a>
          </div>
        </div>

        {/* Order */}
        <div className="nav">
          <div
            className="nav-item nav-toggle"
            data-target="#menu-order"
            aria-expanded={isOrderOpen}
            role="button"
            tabIndex={0}
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
            <a className="sub-item active" href="#">
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
          <div />
          <div className="account">
            <i className="fa-regular fa-circle-user" /> ACCOUNT
          </div>
        </header>

        <div className="content">
          {/* Header: Title + Search + Add */}
          <div className="content-header">
            <h1 className="title">ORDER LIST</h1>

            <div className="action-bar">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass" />
                <input
                  type="text"
                  placeholder="Search…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {AddBtn}
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div>ORDER ID</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Status</div>
              <div>Tracking</div>
              <div>Action</div>
            </div>

            {/* แถวข้อมูล */}
            {pageRows.map((o) => (
              <div className="table-row" key={o.id}>
                <div>#{o.id}</div>
                <div>{o.price.toFixed(2)}</div>
                <div>{o.qty}</div>
                <div>{o.status}</div>
                <div>{o.tracking}</div>
                <div className="act">
                  {/* ถ้าใช้ Router: <Link to={goDetailHref(o.id)}><i className="fa-solid fa-chevron-right" /></Link> */}
                  <a href={goDetailHref(o.id)} aria-label="Go to detail">
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </div>
              </div>
            ))}

            {/* Footer + Pager */}
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
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={clampedPage === 1}
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
                        className={`pill ${p === clampedPage ? "active" : ""}`}
                        aria-current={p === clampedPage ? "page" : "false"}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="circle"
                  aria-label="Next"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={clampedPage === totalPages}
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
