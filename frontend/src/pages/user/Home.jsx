import React, { useEffect } from "react";
//hello hi hi
export default function Home() {
  useEffect(() => {
    // === โหลด CSS ===
    const cssHeader = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/header.css",
    });
    const cssHome = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/home.css",
    });

    document.head.append(cssHeader, cssHome);

    // === โหลด JS ===
    const jsHeader = Object.assign(document.createElement("script"), {
      src: "/js/header.js",
      defer: true,
    });
    document.body.append(jsHeader);

    // cleanup ตอนออกจากหน้า
    return () => {
      [cssHeader, cssHome].forEach((n) =>
        n.parentNode && n.parentNode.removeChild(n)
      );
      jsHeader.parentNode && jsHeader.parentNode.removeChild(jsHeader);
    };
  }, []);

  return (
    <>
      {/* Top stripe */}
      <div className="pm-topbar"></div>

      {/* Header */}
      <header className="pm-header">
        <div className="pm-header__inner">
          {/* Logo */}
          <a href="/" className="pm-logo" aria-label="Pure Mart">
            <img src="/images/logo no BG.png" alt="PURE MART" />
          </a>

          {/* Nav */}
          <nav className="pm-nav" aria-label="Primary">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Best Sellers</a>
            <a href="#">Categories</a>
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
            {/* Account dropdown */}
            <div className="pm-dropdown-wrapper">
              <button
                className="pm-icon pm-account"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="account-menu"
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

              {/* Dropdown Menu */}
              <div id="account-menu" className="pm-dropdown" role="menu">
                <a href="orders.html" role="menuitem" tabIndex={-1}>
                  Order History
                </a>
              </div>
            </div>

            {/* Wishlist */}
            <a href="#" className="pm-icon" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 7.1a5 5 0 0 0-7.1 0L12 8.8l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.1 8.8-8.1a5 5 0 0 0 0-7.1Z" />
              </svg>
            </a>

            {/* Cart */}
            <a href="#" className="pm-icon" aria-label="Cart">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="21" r="1.6" />
                <circle cx="18" cy="21" r="1.6" />
                <path d="M3 3h2l2.2 11.2A2 2 0 0 0 9.2 16h8.7a2 2 0 0 0 2-1.6L22 7H6" />
              </svg>
            </a>

            {/* Hamburger */}
            <button className="pm-burger" aria-label="Open menu" type="button">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="home">
        <div className="container">
          {/* Banner 1 */}
          <a href="/best-sellers" className="hero" aria-label="Shop Best Sellers">
            <img
              src="/images/banner1.jpg"
              alt="Pure & Fresh for Every Meal — Shop Best Sellers"
            />
            <div className="hero__content">
              <h2>Pure & Fresh for Every Meal</h2>
              <p className="highlight">Shop Best Sellers</p>
              <button className="btn">Shop Now</button>
            </div>
          </a>

          {/* Best Sellers */}
          <section className="best-sellers" aria-labelledby="best-title">
            <div className="best-sellers__head">
              <h2 id="best-title">Best Sellers.</h2>
              <a href="/best-sellers" className="shop-all">
                Shop all
              </a>
            </div>

            <div className="products">
              <a href="/product/1" className="product">
                <div className="product__thumb">
                  <img
                    src="/images/products/p1.png"
                    alt="รสดีชิคเก้น ปรุงรสไก่ชุบทอด 90 กรัม"
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">
                    รสดีชิคเก้น ปรุงรสไก่ชุบทอด 90 กรัม
                  </h3>
                  <div className="product__price">฿ 14.00</div>
                </div>
              </a>

              <a href="/product/2" className="product">
                <div className="product__thumb">
                  <img
                    src="/images/products/p2.jpg"
                    alt="หมูบดปรุงรส เบทาโกร แพ็ค"
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">หมูบดปรุงรส เบทาโกร</h3>
                  <div className="product__price">฿ 79.00</div>
                </div>
              </a>

              <a href="/product/3" className="product">
                <div className="product__thumb">
                  <img
                    src="/images/products/p3.jpg"
                    alt="โออิชิ เกี๊ยวซ่า แพ็ค 660 กรัม"
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">โออิชิ เกี๊ยวซ่า 660 กรัม</h3>
                  <div className="product__price">฿ 179.00</div>
                </div>
              </a>

              <a href="/product/4" className="product">
                <div className="product__thumb">
                  <img
                    src="/images/products/p4.jpg"
                    alt="มะเขือเทศ ลูกใหญ่ 150 กรัม"
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">มะเขือเทศ 150 กรัม</h3>
                  <div className="product__price">฿ 45.00</div>
                </div>
              </a>
            </div>
          </section>

          {/* Banner 2 */}
          <a href="/discount" className="hero" aria-label="See Discount up to 25%">
            <img
              src="/images/banner2.jpg"
              alt="The Best Organic Products Online — Discount up to 25%"
            />
            <div className="hero__content hero__content--light">
              <h2>The Best Organic Products Online</h2>
              <p>Discount up to</p>
              <h3>25%</h3>
              <button className="btn">Shop Now</button>
            </div>
          </a>
        </div>
      </main>
    </>
  );
}
