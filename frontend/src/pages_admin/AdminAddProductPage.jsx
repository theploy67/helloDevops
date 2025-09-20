// D:\Devop\Real-Project\helloDevops\frontend\src\pages_admin\AdminAddProductPage.jsx
import { useEffect } from "react";
import "./AdminAddProductPage.css";

export default function AdminAddProductPage() {
  useEffect(() => {
    // -------- Upload images (cover mode) --------
    const dropzone = document.getElementById("dropzone");
    const filePicker = document.getElementById("filePicker");
    const thumbs = document.getElementById("thumbs");
    const hint = document.getElementById("hint");

    if (!dropzone || !filePicker) return;

    let images = [];
    let coverUrl = null; // เก็บ blob URL ของรูป cover เพื่อ revoke ทีหลัง

    // คลิกกล่อง → เปิดไฟล์ (ยกเว้นกดปุ่มลบ)
    const onZoneClick = (e) => {
      if (e.target.closest(".cover-remove")) return;
      filePicker.click();
    };
    dropzone.addEventListener("click", onZoneClick);

    const onFileChange = (e) => addFiles(e.target.files);
    filePicker.addEventListener("change", onFileChange);

    // drag & drop
    const onEnter = (e) => { e.preventDefault(); dropzone.classList.add("dragover"); };
    const onLeave = (e) => { e.preventDefault(); dropzone.classList.remove("dragover"); };
    const onDrop = (e) => { e.preventDefault(); dropzone.classList.remove("dragover"); addFiles(e.dataTransfer.files); };

    dropzone.addEventListener("dragenter", onEnter);
    dropzone.addEventListener("dragover", onEnter);
    dropzone.addEventListener("dragleave", onLeave);
    dropzone.addEventListener("drop", onDrop);

    function addFiles(fileList) {
      const files = Array.from(fileList || []).filter(f => f.type.startsWith("image/"));
      if (!files.length) return;

      const first = files[0];
      images = [first];            // โหมด cover เก็บรูปเดียวพอ
      setCover(first);             // แสดงรูปเต็มกล่อง
    }

    function setCover(file) {
      if (coverUrl) URL.revokeObjectURL(coverUrl);  // กัน memory leak

      coverUrl = URL.createObjectURL(file);
      dropzone.style.backgroundImage = `url("${coverUrl}")`;
      dropzone.classList.add("cover", "has-image");
      if (hint) hint.style.display = "none";

      ensureRemoveBtn();
    }

    function ensureRemoveBtn() {
      if (dropzone.querySelector(".cover-remove")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cover-remove";
      btn.textContent = "×";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();   // กันเปิดไฟล์ picker ตอนกดลบ
        clearCover();
      });
      dropzone.appendChild(btn);
    }

    function clearCover() {
      if (coverUrl) { URL.revokeObjectURL(coverUrl); coverUrl = null; }
      dropzone.style.backgroundImage = "";
      dropzone.classList.remove("cover", "has-image");
      images = [];
      if (hint) hint.style.display = "";
      dropzone.querySelectorAll(".cover-remove").forEach(b => b.remove());
      if (thumbs) thumbs.innerHTML = "";
      filePicker.value = "";
    }

    // ปุ่ม Cancel: เคลียร์รูป + รีเซ็ตฟอร์มซ้ายทั้งหมด
    const cancelBtn = dropzone.closest(".card")?.querySelector(".btn.ghost");

    function resetFormFields() {
      document
        .querySelectorAll('.card input[type="text"], .card input[type="number"], .card textarea')
        .forEach((el) => { el.value = ""; });
      document
        .querySelectorAll(".card select")
        .forEach((el) => { el.selectedIndex = 0; });
    }

    const onCancel = (e) => {
      e.preventDefault();
      clearCover();
      resetFormFields();
      if (hint) hint.style.display = "";
    };
    if (cancelBtn) cancelBtn.addEventListener("click", onCancel);

    // cleanup
    return () => {
      dropzone.removeEventListener("click", onZoneClick);
      filePicker.removeEventListener("change", onFileChange);
      dropzone.removeEventListener("dragenter", onEnter);
      dropzone.removeEventListener("dragover", onEnter);
      dropzone.removeEventListener("dragleave", onLeave);
      dropzone.removeEventListener("drop", onDrop);
      if (cancelBtn) cancelBtn.removeEventListener("click", onCancel);
      if (coverUrl) URL.revokeObjectURL(coverUrl);
    };
  }, []);

  return (
    <div className="app" data-page="AdminAddProductPage">
      <main className="main">
        <div className="content">
          <div className="content-header">
            <h1 className="title">ADD PRODUCT</h1>
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
              <h3 style={{ margin: "4px 0 10px", fontSize: 16 }}>Upload images</h3>

              {/* กล่องอัปโหลด (ต้องมี id=dropzone) */}
              <div className="image-drop" id="dropzone" aria-label="Upload images area">
                <div
                  className="hint"
                  id="hint"
                  role="button"
                  tabIndex={0}
                  style={{ color: "#6b7280", cursor: "pointer" }}
                />
                <div id="thumbs" className="thumbs" />
              </div>

              <div className="actions">
                <button className="btn ghost">Cancel</button>
                <button className="btn primary">Save</button>
              </div>

              {/* input ไฟล์ที่ซ่อนอยู่ (ต้องมี id=filePicker) */}
              <input id="filePicker" type="file" accept="image/*" multiple hidden />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
