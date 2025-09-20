// D:\Devop\Real-Project\helloDevops\frontend\src\pages_admin\AdminEditProductPage.jsx
import "./AdminEditProductPage.css";

export default function AdminEditProductPage() {
  return (
    <div className="app" data-page="AdminEditProductPage">
      {/* ⛔ ลบ sidebar และ topbar ACCOUNT ตามที่ขอ */}
      <main className="main">
        <div className="content">
          <div className="content-header">
            <h1 className="title">EDIT PRODUCT</h1>
            <div className="header-actions" />
          </div>


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
                <textarea rows={6} placeholder="Short description..." />
              </div>
            </section>

            {/* Right card: image area + buttons */}
            <section className="card">
              <h3 style={{ margin: "4px 0 10px", fontSize: "16px" }}>
                Upload images
              </h3>
              <div className="image-drop" aria-label="Upload images area" />

              <div className="actions">
                <button className="btn ghost">Cancel</button>
                <button className="btn primary">Save</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
