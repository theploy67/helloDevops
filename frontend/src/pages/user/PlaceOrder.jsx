// src/pages/checkout/PlaceOrder.jsx
import React, { useEffect, useMemo, useState } from "react";

export default function PlaceOrder() {
  // ---------- load font + css ----------
  useEffect(() => {
    const css = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href: "/css/place-order.css", // ปรับ path ให้ตรงโปรเจ็กต์ (เดิม: place-order.css)
    });

    const font = Object.assign(document.createElement("link"), {
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap",
    });

    document.head.append(css, font);
    return () => {
      [css, font].forEach((n) => n.parentNode && n.parentNode.removeChild(n));
    };
  }, []);

  // ---------- Address state ----------
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "สมชาย ใจดี",
      text: "123/45 ซอยสุขใจ เขตปทุมวัน กทม. 10330",
      isDefault: true,
    },
    {
      id: 2,
      name: "ศิริพร ยิ้มแย้ม",
      text: "55/88 หมู่บ้านสุขสันต์ ถนนพระราม 9 เขตสวนหลวง กทม. 10250",
      isDefault: false,
    },
  ]);
  const [showAdd, setShowAdd] = useState(addresses.length === 0);

  const defaultAddressId = useMemo(
    () => addresses.find((a) => a.isDefault)?.id ?? null,
    [addresses]
  );

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    // TODO: persist ไป backend ถ้ามี API
  };

  // ---------- Add form state ----------
  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
    isDefault: false,
  });

  const onFormChange = (e) => {
    const { id, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [id]: type === "checkbox" ? checked : value }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const { name, phone, house, subdistrict, district, province, zipcode } = form;
    if (!name || !phone || !house || !subdistrict || !district || !province || !zipcode) {
      alert("กรอกข้อมูลให้ครบถ้วนก่อนบันทึกค่ะ");
      return;
    }
    const fullText = `${form.house} ${form.street ? form.street + ", " : ""}${form.subdistrict}, ${form.district}, ${form.province} ${form.zipcode} | Tel: ${form.phone}`;
    const willDefault = form.isDefault || addresses.length === 0;

    setAddresses((prev) => {
      const cleared = willDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
      return [
        ...cleared,
        {
          id: Date.now(),
          name: form.name.trim(),
          text: fullText,
          isDefault: willDefault,
        },
      ];
    });

    // reset + กลับไปหน้า list
    setForm({
      name: "",
      phone: "",
      house: "",
      street: "",
      subdistrict: "",
      district: "",
      province: "",
      zipcode: "",
      isDefault: false,
    });
    setShowAdd(false);
  };

  // ---------- Cart state ----------
  const [cart, setCart] = useState([
    { id: 1, name: "โออิชิ ฮอตโตเกียวซ่า", price: 179, qty: 1, img: "/assets/products/p1.png" },
    { id: 2, name: "เอ็มเค น้ำจิ้มสุกี้", price: 119, qty: 1, img: "/assets/products/p2.png" },
    { id: 3, name: "มะพร้าวน้ำหอม", price: 25, qty: 4, img: "/assets/products/p3.png" },
  ]);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const formatCurrency = (n) =>
    n.toLocaleString("th-TH", { style: "currency", currency: "THB" });

  const { itemsTotal, itemsCount, discount, shipping, subtotal, total } = useMemo(() => {
    const subtotalCalc = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    const itemsCnt = cart.reduce((acc, i) => acc + i.qty, 0);
    const shopDiscount = 0; // ปรับกติกาส่วนลดได้
    const ship = 0; // ปรับค่าส่งได้
    return {
      itemsTotal: subtotalCalc,
      itemsCount: itemsCnt,
      discount: shopDiscount,
      shipping: ship,
      subtotal: subtotalCalc,
      total: subtotalCalc - shopDiscount + ship,
    };
  }, [cart]);

  return (
    <main className="container">
      <h1 className="title">Checkout Page</h1>

      <div className="checkout-grid">
        {/* LEFT: addresses */}
        <section className="card form-card">
          <h2 className="section-title">Shipping Address</h2>

          {/* ถ้าไม่มีที่อยู่ → แสดงฟอร์มเพิ่ม */}
          {showAdd ? (
            <form id="add-form" className="address-form" noValidate onSubmit={handleAddAddress}>
              <label>
                ชื่อ-นามสกุล
                <input type="text" id="name" value={form.name} onChange={onFormChange} required />
              </label>

              <label>
                เบอร์โทรศัพท์
                <input
                  type="tel"
                  id="phone"
                  placeholder="0xx-xxx-xxxx"
                  value={form.phone}
                  onChange={onFormChange}
                  required
                />
              </label>

              <label>
                บ้านเลขที่ / อาคาร / หมู่บ้าน
                <input type="text" id="house" value={form.house} onChange={onFormChange} required />
              </label>

              <label>
                ถนน / ซอย
                <input type="text" id="street" value={form.street} onChange={onFormChange} />
              </label>

              <div className="form-row">
                <label>
                  แขวง/ตำบล
                  <input
                    type="text"
                    id="subdistrict"
                    value={form.subdistrict}
                    onChange={onFormChange}
                    required
                  />
                </label>
                <label>
                  เขต/อำเภอ
                  <input
                    type="text"
                    id="district"
                    value={form.district}
                    onChange={onFormChange}
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  จังหวัด
                  <select
                    id="province"
                    value={form.province}
                    onChange={onFormChange}
                    required
                  >
                    <option value="">-- เลือกจังหวัด --</option>
                    <option>กรุงเทพมหานคร</option>
                    <option>เชียงใหม่</option>
                    <option>ขอนแก่น</option>
                    <option>ภูเก็ต</option>
                  </select>
                </label>

                <label>
                  รหัสไปรษณีย์
                  <input
                    type="text"
                    id="zipcode"
                    value={form.zipcode}
                    onChange={onFormChange}
                    required
                  />
                </label>
              </div>

              <label className="inline">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={onFormChange}
                />
                <span>บันทึกเป็นที่อยู่เริ่มต้น (Default)</span>
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  id="cancelAdd"
                  onClick={() => setShowAdd(false)}
                >
                  ย้อนกลับ
                </button>
                <button type="submit" className="btn-save">
                  บันทึกที่อยู่
                </button>
              </div>
            </form>
          ) : (
            // แสดงรายการที่อยู่เดิม
            <div id="address-container">
              {addresses.length > 0 ? (
                <>
                  <div className="saved-addresses">
                    {addresses.map((addr) => (
                      <label className="address-option" key={addr.id}>
                        <input
                          type="radio"
                          name="address"
                          checked={defaultAddressId === addr.id}
                          onChange={() => setDefault(addr.id)}
                        />
                        <div className="address-box" style={{ position: "relative" }}>
                          {addr.isDefault ? (
                            <span className="tag default">Default</span>
                          ) : (
                            <button
                              type="button"
                              className="link set-default-link"
                              style={{ position: "absolute", top: 10, right: 12 }}
                              onClick={() => setDefault(addr.id)}
                            >
                              ตั้งเป็นค่าเริ่มต้น
                            </button>
                          )}
                          <p className="addr-name">{addr.name}</p>
                          <p className="addr-text">{addr.text}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn-add-inline"
                    onClick={() => setShowAdd(true)}
                  >
                    + เพิ่มที่อยู่ใหม่
                  </button>
                </>
              ) : (
                // ถ้าไม่มีที่อยู่เลย → โชว์ฟอร์มแทน
                <button type="button" className="btn-add-inline" onClick={() => setShowAdd(true)}>
                  + เพิ่มที่อยู่ใหม่
                </button>
              )}
            </div>
          )}
        </section>

        {/* RIGHT: order summary */}
        <aside className="card summary-card">
          <h2 className="section-title">Your order</h2>

          <div id="order-list">
            {cart.map((item) => {
              const line = item.price * item.qty;
              return (
                <div className="order-item" key={item.id}>
                  <img src={item.img} alt="" />
                  <div className="order-item__body">
                    <p className="order-item__name">{item.name}</p>
                    <div className="qty-row">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="decrease"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="order-item__price">
                      {formatCurrency(line)}
                      <span className="unit-price">
                        {formatCurrency(item.price)} ต่อชิ้น
                      </span>
                    </p>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="totals">
            <div className="line">
              <span>Item(s) total</span>
              <span id="itemsTotal">{formatCurrency(itemsTotal)}</span>
            </div>
            <div className="line">
              <span>Shop-discount</span>
              <span id="discount">−{formatCurrency(discount).replace("฿", "฿")}</span>
            </div>
            <div className="line">
              <span>Subtotal</span>
              <span id="subtotal">{formatCurrency(subtotal)}</span>
            </div>
            <div className="line">
              <span>Shipping</span>
              <span id="shipping">{formatCurrency(shipping)}</span>
            </div>
            <div className="line total">
              <span>
                Total (<span id="totalItems">{itemsCount}</span> item
                {itemsCount > 1 ? "s" : ""})
              </span>
              <span className="price" id="total">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
