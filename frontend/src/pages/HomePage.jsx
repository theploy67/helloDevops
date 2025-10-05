import React, { useRef } from "react";
import "./HomePage.css";

const HomePage = () => {
  const allProductsRef = useRef(null);

  const handleScrollNext = () => {
    if (allProductsRef.current) {
      allProductsRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top stripe */}
      <div className="pm-topbar"></div>

      <main className="home">
        <div className="container">
          {/* ===== Banner 1 ===== */}
          <a href="/best-sellers" className="hero-card" aria-label="Shop Best Sellers">
            <img
              src="/assets/user/image 48.png"
              alt="Pure & Fresh for Every Meal — Shop Best Sellers"
              loading="lazy"
            />
          </a>

          {/* ===== Best Sellers ===== */}
          <section className="best-sellers" aria-labelledby="best-title">
            <div className="best-sellers__head">
              <h2 id="best-title">Best Sellers.</h2>
              <a href="/best-sellers" className="shop-all">Shop all</a>
            </div>

            <div className="products">
              {/* CARD 1 */}
              <a className="product" href="/product/1" aria-label="รสดีชิคเก้น ปรุงรสไก่ชุบทอด 90 กรัม">
                <div className="product__thumb">
                  <img
                    src="/assets/products/p1.png"
                    alt="รสดีชิคเก้น ปรุงรสไก่ชุบทอด 90 กรัม"
                    loading="lazy"
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">รสดีชิคเก้น ปรุงรสไก่ชุบทอด 90 กรัม</h3>
                  <div className="product__price">฿ 14.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>

              {/* CARD 2 */}
              <a className="product" href="/product/2" aria-label="หมูบดปรุงรส เบทาโกร">
                <div className="product__thumb">
                  <img
                    src="/assets/products/p2.jpg"
                    alt="หมูบดปรุงรส เบทาโกร"
                    loading="lazy"
                    onError={(e)=>{ if(!e.currentTarget.dataset.png){ e.currentTarget.dataset.png=1; e.currentTarget.src="/assets/products/p2.png"; } }}
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">หมูบดปรุงรส เบทาโกร</h3>
                  <div className="product__price">฿ 79.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>

              {/* CARD 3 */}
              <a className="product" href="/product/3" aria-label="โออิชิ เกี๊ยวซ่า 660 กรัม">
                <div className="product__thumb">
                  <img
                    src="/assets/products/p3.jpg"
                    alt="โออิชิ เกี๊ยวซ่า 660 กรัม"
                    loading="lazy"
                    onError={(e)=>{ if(!e.currentTarget.dataset.png){ e.currentTarget.dataset.png=1; e.currentTarget.src="/assets/products/p3.png"; } }}
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">โออิชิ เกี๊ยวซ่า 660 กรัม</h3>
                  <div className="product__price">฿ 179.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>

              {/* CARD 4 */}
              <a className="product" href="/product/4" aria-label="มะเขือเทศ 150 กรัม">
                <div className="product__thumb">
                  <img
                    src="/assets/products/p4.jpg"
                    alt="มะเขือเทศ 150 กรัม"
                    loading="lazy"
                    onError={(e)=>{ if(!e.currentTarget.dataset.png){ e.currentTarget.dataset.png=1; e.currentTarget.src="/assets/products/p4.png"; } }}
                  />
                </div>
                <div className="product__body">
                  <h3 className="product__title">มะเขือเทศ 150 กรัม</h3>
                  <div className="product__price">฿ 45.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>
            </div>
          </section>

          {/* ===== Banner 2 ===== */}
          <a href="#" className="hero-card" aria-label="#">
            <img src="/assets/banner2.jpg" alt="#" loading="lazy" />
          </a>

          {/* ===== Category ===== */}
          <section className="category">
            <div className="category__inner">
              <div className="category__head">
                <h3>Browse by Category</h3>
                <span className="category__underline" aria-hidden="true"></span>
              </div>
              <div className="category__grid">
                <a href="/category/dried-food" className="category-card" aria-label="Dried Food">
                  <img src="/images/cat-dried-food.jpg" alt="Dried Food" loading="lazy" />
                </a>
                <a href="/category/meat" className="category-card" aria-label="Meat">
                  <img src="/images/cat-meat.jpg" alt="Meat" loading="lazy" />
                </a>
                <a href="/category/frozen-food" className="category-card" aria-label="Frozen Food">
                  <img src="/images/cat-frozen.jpg" alt="Frozen Food" loading="lazy" />
                </a>
                <a href="/category/fruits-vegetables" className="category-card" aria-label="Fruits and Vegetables">
                  <img src="/images/cat-fruits-veg.jpg" alt="Fruits & Vegetables" loading="lazy" />
                </a>
              </div>
            </div>
          </section>

          {/* ===== All Products ===== */}
          <section className="all-products" aria-labelledby="all-title">
            <div className="ap-head">
              <h3 id="all-title">All Products</h3>

              
            </div>

            <span className="ap-underline" aria-hidden="true"></span>

            <div className="products" ref={allProductsRef}>
              <a className="product" href="/product/101" aria-label="เอ็มเคน้ำจิ้มสูตรต้นตำรับ 830กรัม">
                <div className="product__thumb">
                  <img src="/assets/products/all-1.jpg" alt="เอ็มเคน้ำจิ้มสูตรต้นตำรับ 830กรัม" loading="lazy" />
                </div>
                <div className="product__body">
                  <h3 className="product__title">เอ็มเคน้ำจิ้มสูตรต้นตำรับ 830กรัม</h3>
                  <div className="product__price">฿ 119.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>

              <a className="product" href="/product/102" aria-label="ไวไวเส้นหมี่ข้าวกล้องแห้ง 170 กรัม">
                <div className="product__thumb">
                  <img src="/assets/products/all-2.jpg" alt="ไวไวเส้นหมี่ข้าวกล้องแห้ง 170 กรัม" loading="lazy" />
                </div>
                <div className="product__body">
                  <h3 className="product__title">ไวไวเส้นหมี่ข้าวกล้องแห้ง 170 กรัม</h3>
                  <div className="product__price">฿ 20.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>

              <a className="product" href="/product/103" aria-label="ซุปเปอร์เฟรช การ์เด้น สลัดมิกซ์ แพ็คละ">
                <div className="product__thumb">
                  <img src="/assets/products/all-3.jpg" alt="ซุปเปอร์เฟรช การ์เด้น สลัดมิกซ์ แพ็คละ" loading="lazy" />
                </div>
                <div className="product__body">
                  <h3 className="product__title">ซุปเปอร์เฟรช การ์เด้น สลัดมิกซ์ แพ็คละ</h3>
                  <div className="product__price">฿ 35.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>

              <a className="product" href="/product/104" aria-label="ชุดไหว้บงคล 3 อย่าง 1330 กรัม">
                <div className="product__thumb">
                  <img src="/assets/products/all-4.jpg" alt="ชุดไหว้บงคล 3 อย่าง 1330 กรัม" loading="lazy" />
                </div>
                <div className="product__body">
                  <h3 className="product__title">ชุดไหว้บงคล 3 อย่าง 1330 กรัม</h3>
                  <div className="product__price">฿ 439.00</div>
                  <button className="add-to-cart" type="button">
                    <i className="fas fa-shopping-cart" />
                  </button>
                </div>
              </a>
            </div>
            {/* 🔥 ปุ่มดำกลมลูกศรขาว อยู่ข้างหัวข้อ */}
              <button className="arrow-btn" onClick={handleScrollNext} aria-label="เลื่อนไปขวา">
                →
              </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
