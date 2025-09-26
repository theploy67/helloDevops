import React from "react";
import "./header.css"; // ปรับ path ให้ตรงโครงสร้างของคุณ

const Header = () => {
  return (
    <>
      {/* Top stripe */}
      <div className="pm-topbar" />

      <header className="pm-header">
        <div className="pm-header__inner">
          {/* Logo */}
          <a href="/" className="pm-logo" aria-label="Pure Mart">
            <img src="../public/assets/logo.png" alt="PURE MART" />
          </a>

          {/* Nav */}
          <nav className="pm-nav" aria-label="Primary">
            <a href="/home">Home</a>
            <a href="/shop">Shop</a>
            <a href="/best-sellers">Best Sellers</a>
            <a href="/categories">Categories</a>
          </nav>

          {/* Search */}
          <form className="pm-search" role="search" aria-label="Site search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="search" placeholder="Search....." />
          </form>

          {/* Right icons */}
          <div className="pm-right">
            {/* Account Dropdown */}
            <div className="pm-dropdown-wrapper">
              <button
                className="pm-icon pm-account"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="account-menu"
                type="button"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
                <span className="pm-icon__label">ACCOUNT</span>
                <svg className="pm-caret" viewBox="0 0 24 24" aria-hidden="true">
                  <polygon points="6,8 18,8 12,16" fill="currentColor" />
                </svg>
              </button>

              <div id="account-menu" className="pm-dropdown" role="menu">
                <a href="/orders" role="menuitem" tabIndex={-1}>Order History</a>
                <a href="/login" role="menuitem" tabIndex={-1}>Log Out</a>
              </div>
            </div>

            {/* Wishlist */}
            <a href="/wishlist" className="pm-icon" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 7.1a5 5 0 0 0-7.1 0L12 8.8l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.1 8.8-8.1a5 5 0 0 0 0-7.1Z" />
              </svg>
            </a>

            {/* Cart */}
            <a href="/cart" className="pm-icon" aria-label="Cart">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="21" r="1.6" />
                <circle cx="18" cy="21" r="1.6" />
                <path d="M3 3h2l2.2 11.2A2 2 0 0 0 9.2 16h8.7a2 2 0 0 0 2-1.6L22 7H6" />
              </svg>
            </a>

            {/* Hamburger */}
            <button className="pm-burger" aria-label="Open menu" type="button">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
