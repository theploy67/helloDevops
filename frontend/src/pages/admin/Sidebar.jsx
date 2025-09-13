import React from "react";
import "./sidebar.css"; // import css ของ sidebar

export default function Sidebar() {
  return (
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
      {/* ...เมนูอื่น ๆ ต่อได้เลย... */}
    </aside>
  );
}
