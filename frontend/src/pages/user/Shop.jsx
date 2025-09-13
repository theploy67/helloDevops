// src/pages/user/Shop.jsx
import React, { useEffect } from "react";

export default function Shop() {
  useEffect(() => {
    // ----- Google Fonts -----
    const pre1 = Object.assign(document.createElement("link"), {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    });
    const pre2 = Object.assign(document.createElement("link"), {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    });
    const font = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    });

    // ----- Page CSS (/public/css/...) -----
    const cssHeader = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/header.css",
    });
    const cssShop = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/Shop.css",
    });
    const cssFooter = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/Footer.css",
    });

    document.head.append(pre1, pre2, font, cssHeader, cssShop, cssFooter);

    // ----- Legacy Scripts (/public/js/...) -----
    const jsHeader = Object.assign(document.createElement("script"), {
      src: "/js/header.js",
      defer: true,
    });
    const jsShop = Object.assign(document.createElement("script"), {
      src: "/js/Shop.js",
      defer: true,
    });
    const jsFooter = Object.assign(document.createElement("script"), {
      src: "/js/Footer.js",
      defer: true,
    });

    document.body.append(jsHeader, jsShop, jsFooter);

    return () => {
      [pre1, pre2, font, cssHeader, cssShop, cssFooter].forEach((n) =>
        n.parentNode && n.parentNode.removeChild(n)
      );
      [jsHeader, jsShop, jsFooter].forEach((n) =>
        n.parentNode && n.parentNode.removeChild(n)
      );
    };
  }, []);

  return (
    <>
      <div className="pm-topbar"></div>

      {/* ===== Header ===== */}
      <header className="pm-header">
        <div className="pm-header__inner">
          <a href="/" className="pm-logo" aria-label="Pure Mart">
            <img src="/src/logo no BG.png" alt="PURE MART" />
          </a>

          <nav className="pm-nav" aria-label="Primary">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Best Sellers</a>
            <a href="#">Categories</a>
          </nav>

          <form
            className="pm-search"
            role="search"
            aria-label="Site search"
            action="#"
            method="get"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="search" name="q" placeholder="Search....." />
          </form>

          <div className="pm-right">
            <div className="pm-dropdown-wrapper">
              <button
                className="pm-icon pm-account"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="account-menu"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4"></circle>
                  <path d="M4 20a8 8 0 0 1 16 0"></path>
                </svg>
                <span className="pm-icon__label">ACCOUNT</span>
                <svg className="pm-caret" viewBox="0 0 24 24" aria-hidden="true">
                  <polygon points="6,8 18,8 12,16"></polygon>
                </svg>
              </button>
              <div id="account-menu" className="pm-dropdown" role="menu">
                <a href="orders.html" role="menuitem" tabIndex={-1}>
                  Order History
                </a>
              </div>
            </div>

            <a href="#" className="pm-icon" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 7.1a5 5 0 0 0-7.1 0L12 8.8l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.1 8.8-8.1a5 5 0 0 0 0-7.1Z"></path>
              </svg>
            </a>

            <a href="#" className="pm-icon" aria-label="Cart">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="21" r="1.6"></circle>
                <circle cx="18" cy="21" r="1.6"></circle>
                <path d="M3 3h2l2.2 11.2A2 2 0 0 0 9.2 16h8.7a2 2 0 0 0 2-1.6L22 7H6"></path>
              </svg>
            </a>

            <button className="pm-burger" aria-label="Open menu" type="button">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero / Title ===== */}
      <section className="wl-hero">
        <div className="wl-hero__inner">
          <h1 className="wl-title">SHOP</h1>

          <nav className="pm-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/">HOME</a>
              </li>
              <li aria-current="page">SHOP</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ===== Toolbar ===== */}
      <div className="container">
        <div className="shop-toolbar" role="region" aria-label="Active filters and sort">
          <div className="active-filters">
            <span className="af-label">Active filter</span>
            <div id="chip-list" className="chips" aria-live="polite"></div>
            <button id="clear-all" className="link" hidden>
              Clear all
            </button>
          </div>

          <div className="sort-area">
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select id="sort">
              <option value="featured">แนะนำ</option>
              <option value="price-asc">ราคาน้อย → มาก</option>
              <option value="price-desc">ราคามาก → น้อย</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== Main: Sidebar + Product Grid ===== */}
      <main className="container shop-layout">
        {/* Sidebar Filters */}
        <aside className="filters" aria-label="Filter Options">
          <h2 className="filters__title">Filter Options</h2>

          {/* Categories */}
          <section className="filter-block">
            <h3>Product Categories</h3>
            <div className="checklist" id="f-cat"></div>
          </section>

          {/* Price */}
          <section className="filter-block">
            <h3>Price (฿)</h3>
            <div className="price-row">
              <input id="min" type="number" inputMode="decimal" placeholder="min" />
              <span>–</span>
              <input id="max" type="number" inputMode="decimal" placeholder="max" />
            </div>
            <button id="apply-price" className="btn btn--sm btn--outline" type="button">
              Apply
            </button>
          </section>

          {/* Brands */}
          <section className="filter-block">
            <h3>Brands</h3>
            <div className="checklist" id="f-brand"></div>
          </section>

          {/* Promotions */}
          <section className="filter-block">
            <h3>Promotions</h3>
            <div className="checklist" id="f-promo"></div>
          </section>
        </aside>

        {/* Products */}
        <section className="products" aria-label="Products">
          <div id="product-grid" className="grid" aria-live="polite"></div>

          {/* Pagination */}
          <nav className="pagination" aria-label="Pagination">
            <button className="page-btn" id="prev-page" disabled>
              Prev
            </button>
            <span id="page-info">Page 1</span>
            <button className="page-btn" id="next-page">
              Next
            </button>
          </nav>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="pm-footer">
        <div className="pm-footer__inner">
          <div className="pm-footer__cols">
            <nav className="pm-foot-col">
              <h4>Shopping</h4>
              <ul>
                <li>
                  <a href="#">Fresh Vegetables</a>
                </li>
                <li>
                  <a href="#">Fruits</a>
                </li>
                <li>
                  <a href="#">Meat & Seafood</a>
                </li>
                <li>
                  <a href="#">Frozen Food</a>
                </li>
                <li>
                  <a href="#">Snacks & Beverages</a>
                </li>
                <li>
                  <a href="#">Household Essentials</a>
                </li>
              </ul>
            </nav>

            <nav className="pm-foot-col">
              <h4>About Pure Mart</h4>
              <ul>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Our Suppliers</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </nav>

            <nav className="pm-foot-col">
              <h4>Customer Care</h4>
              <ul>
                <li>
                  <a href="#">Blog / Recipes</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Shipping & Delivery</a>
                </li>
                <li>
                  <a href="#">Returns & Refunds</a>
                </li>
                <li>
                  <a href="#">Promotions</a>
                </li>
              </ul>
            </nav>

            <section className="pm-foot-sub">
              <h4>Subscribe</h4>
              <form id="footer-subscribe" noValidate>
                <label className="sr-only" htmlFor="sub-email">
                  Email address
                </label>
                <div className="pm-sub-input">
                  <input
                    id="sub-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                  />
                  <button type="submit" aria-label="Subscribe">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <p className="pm-sub-note">
                  Pure Mart carefully selects fresh ingredients from trusted farms and suppliers,
                  delivering them straight to your home quickly and safely.
                </p>
                <p className="pm-sub-msg" id="sub-msg" role="status" aria-live="polite"></p>
              </form>
            </section>
          </div>

          <hr className="pm-foot-sep" />

          <div className="pm-foot-bottom">
            <a className="pm-foot-logo" href="/" aria-label="Pure Mart">
              <img src="/src/whitelogo.png" alt="PURE MART" />
            </a>

            <ul className="pm-foot-legal">
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>

            <div className="pm-foot-social">
              <a href="#" aria-label="Facebook">
                <img src="/src/facebook.svg" alt="Facebook" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src="/src/Twit.svg" alt="Twitter" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/src/ig.svg" alt="Instagram" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src="/src/in.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
