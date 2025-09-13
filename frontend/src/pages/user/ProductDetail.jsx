import React, { useEffect } from "react";

export default function ProductDetail() {
  useEffect(() => {
    // === โหลด CSS ===
    const cssHeader = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/header.css",
    });
    const cssDetail = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/Detail.css",
    });
    const cssFooter = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/Footer.css",
    });
    document.head.append(cssHeader, cssDetail, cssFooter);

    // === โหลด JS ===
    const jsHeader = Object.assign(document.createElement("script"), {
      src: "/js/header.js",
      defer: true,
    });
    const jsDetail = Object.assign(document.createElement("script"), {
      src: "/js/Detail.js",
      defer: true,
    });
    const jsFooter = Object.assign(document.createElement("script"), {
      src: "/js/Footer.js",
      defer: true,
    });
    document.body.append(jsHeader, jsDetail, jsFooter);

    // cleanup
    return () => {
      [cssHeader, cssDetail, cssFooter].forEach(
        (n) => n.parentNode && n.parentNode.removeChild(n)
      );
      [jsHeader, jsDetail, jsFooter].forEach(
        (n) => n.parentNode && n.parentNode.removeChild(n)
      );
    };
  }, []);

  return (
    <>
      <div className="pm-topbar"></div>

      {/* Header */}
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
            {/* Account dropdown */}
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

      {/* Main */}
      <main className="page container">
        {/* Breadcrumb */}
        <nav className="pm-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/category/meat">MEAT</a>
            </li>
            <li aria-current="page">
              Organic 100% Grassfed 85_15 Ground Beef
            </li>
          </ol>
        </nav>

        {/* Product Hero */}
        <section className="product card">
          <div className="product__media">
            <div className="product__img">
              <img
                src="/src/หมู.png"
                alt="เบทาโกร หมูบดปรุงรสหมูผสมไก่บด 500 กรัม"
              />
            </div>
          </div>

          <div className="product__info">
            <h1 className="product__title">
              เบทาโกร หมูบดปรุงรสหมูผสมไก่บด แพ็คชิ้น 500 ก.
            </h1>

            <div className="meta">
              <span>
                Brand: <a href="#" className="link">BETAGRO</a>
              </span>
              <span>SKU: PSAJK24</span>
            </div>

            <div className="price">฿ 79.00</div>
            <div className="stock">
              <span className="dot"></span> Availability: <b>120 in stock</b>
            </div>

            <p className="excerpt">
              หมูบดปรุงรสหมูผสมไก่บด (แช่แข็ง) เนื้อสัมผัสนุ่ม ปรุงง่าย เหมาะกับหลายเมนู
              ขนาด : <span className="nowrap">500 กรัม / แพ็ค</span>
            </p>

            <div className="buy-row">
              <div className="qty" data-qty>
                <button className="qty__btn" data-minus aria-label="decrease">
                  −
                </button>
                <input
                  className="qty__input"
                  type="number"
                  defaultValue="1"
                  min="1"
                  inputMode="numeric"
                />
                <button className="qty__btn" data-plus aria-label="increase">
                  +
                </button>
              </div>

              <button className="btn btn--primary">ADD TO CART</button>
              <button className="btn btn--gradient">BUY NOW</button>
            </div>

            <label className="wish">
              <input type="checkbox" className="heart-toggle" />
              <span className="heart-label">Add to wishlist</span>
            </label>

            <div className="cat">
              Category: <a href="#" className="link">MEAT</a>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="section card">
          <h2 className="section__title">DESCRIPTION</h2>
          <div className="desc">
            <div className="desc__text">
              <p>
                <b>รายละเอียดสินค้า</b>
                <br />
                เนื้อหมูคัดเกรดคุณภาพดี ผสมไก่บดสัดส่วนลงตัว ปรุงรสอ่อนกลมกล่อม พร้อมทำอาหารได้ทันที ขนาด : 500 กรัม/แพ็ค
              </p>
              <p>
                <b>วิธีการเก็บรักษา</b>
                <br />
                เก็บในตู้แช่แข็งที่อุณหภูมิ -18 ถึง -23 °C
              </p>
              <p>
                <b>ประเทศต้นกำเนิด</b>
                <br />
                ไทย
              </p>
            </div>
            <div className="desc__img">
              <img src="/src/หมู.png" alt="แพ็คสินค้า Betagro" />
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="section">
          <h2 className="section__title">RELATED PRODUCTS</h2>
          <div className="grid">
            <article className="card product-card">
              <a className="thumb" href="#">
                <img src="/src/หมูเด้ง.png" alt="ซูเปอร์เชฟ หมูเด้ง 220 กรัม แพ็ค 3" />
              </a>
              <h3 className="product-card__title">
                ซูเปอร์เชฟ หมูเด้ง <b>220 กรัม</b> แพ็ค <b>3</b>
              </h3>
              <div className="product-card__price">฿ 85.00</div>
              <label className="wish wish--card">
                <input type="checkbox" />
                <span>Add to wishlist</span>
              </label>
              <button className="btn btn--primary btn--block">ADD TO CART</button>
            </article>

            <article className="card product-card">
              <a className="thumb" href="#">
                <img src="/src/CP.png" alt="ซีพี หมูเด้ง 200 กรัม" />
              </a>
              <h3 className="product-card__title">ซีพี หมูเด้ง <b>200 กรัม</b></h3>
              <div className="product-card__price">฿ 45.00</div>
              <label className="wish wish--card">
                <input type="checkbox" />
                <span>Add to wishlist</span>
              </label>
              <button className="btn btn--primary btn--block">ADD TO CART</button>
            </article>

            <article className="card product-card">
              <a className="thumb" href="#">
                <img src="/src/ไก่.png" alt="ไก่ปรุงรสแช่แข็ง 500 กรัม" />
              </a>
              <h3 className="product-card__title">ไก่ปรุงรสแช่แข็ง <b>500 กรัม</b></h3>
              <div className="product-card__price">฿ 49.00</div>
              <label className="wish wish--card">
                <input type="checkbox" />
                <span>Add to wishlist</span>
              </label>
              <button className="btn btn--primary btn--block">ADD TO CART</button>
            </article>

            <article className="card product-card">
              <a className="thumb" href="#">
                <img src="/src/หมู.png" alt="ฟู๊ดส์แวร์ เกี๊ยวไส้หมูสับ 420 กรัม" />
              </a>
              <h3 className="product-card__title">
                ฟู๊ดส์แวร์ เกี๊ยวไส้หมูสับ <b>420 กรัม</b>
              </h3>
              <div className="product-card__price">฿ 49.00</div>
              <label className="wish wish--card">
                <input type="checkbox" />
                <span>Add to wishlist</span>
              </label>
              <button className="btn btn--primary btn--block">ADD TO CART</button>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pm-footer">
        <div className="pm-footer__inner">
          <div className="pm-footer__cols">
            <nav className="pm-foot-col">
              <h4>Shopping</h4>
              <ul>
                <li><a href="#">Fresh Vegetables</a></li>
                <li><a href="#">Fruits</a></li>
                <li><a href="#">Meat & Seafood</a></li>
                <li><a href="#">Frozen Food</a></li>
                <li><a href="#">Snacks & Beverages</a></li>
                <li><a href="#">Household Essentials</a></li>
              </ul>
            </nav>

            <nav className="pm-foot-col">
              <h4>About Pure Mart</h4>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Our Suppliers</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </nav>

            <nav className="pm-foot-col">
              <h4>Customer Care</h4>
              <ul>
                <li><a href="#">Blog / Recipes</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping & Delivery</a></li>
                <li><a href="#">Returns & Refunds</a></li>
                <li><a href="#">Promotions</a></li>
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
                  Pure Mart carefully selects fresh ingredients from trusted farms and
                  suppliers, delivering them straight to your home quickly and safely.
                </p>
                <p
                  className="pm-sub-msg"
                  id="sub-msg"
                  role="status"
                  aria-live="polite"
                ></p>
              </form>
            </section>
          </div>

          <hr className="pm-foot-sep" />

          <div className="pm-foot-bottom">
            <a className="pm-foot-logo" href="/" aria-label="Pure Mart">
              <img src="/src/whitelogo.png" alt="PURE MART" />
            </a>

            <ul className="pm-foot-legal">
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
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
