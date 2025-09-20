// D:\Devop\Real-Project\helloDevops\frontend\src\pages_admin\AdminOrderListPage.jsx
import { useEffect } from "react";
import "./AdminOrderListPage.css";

export default function AdminOrderListPage() {
  useEffect(() => {
    // ===== Pagination (เหมือนของ Product List) =====
    function initTablePager({
      container = ".table-card",
      rowsPerPage = 10,
      windowSize = 3,
    } = {}) {
      const root =
        typeof container === "string"
          ? document.querySelector(container)
          : container;
      if (!root) return;

      const rows = Array.from(root.querySelectorAll(".table-row"));
      const hint = root.querySelector(".hint");
      const pager = root.querySelector(".pager");
      if (!hint || !pager) return;

      // ใช้ปุ่ม Prev/Next ที่มีอยู่แล้ว (วงกลมซ้าย/ขวา)
      const circles = pager.querySelectorAll(".circle");
      const prev = circles[0];
      const next = circles[circles.length - 1];

      // ลบปุ่ม .pill เดิม (1,2,3) แล้วสร้างพื้นที่สำหรับเลขหน้าใหม่
      pager.querySelectorAll(".pill").forEach((b) => b.remove());
      let nums = pager.querySelector("#pagerNumbers");
      if (!nums) {
        nums = document.createElement("div");
        nums.id = "pagerNumbers";
        // แทรกระหว่าง prev กับ next
        pager.insertBefore(nums, next);
      } else {
        nums.innerHTML = "";
      }

      const totalItems = rows.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
      let currentPage = 1;

      const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

      function pageRange(page) {
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, totalItems);
        return { start, end };
      }

      function windowRange(page) {
        const lastStart = Math.max(1, totalPages - windowSize + 1);
        const start = clamp(page, 1, lastStart);
        const end = Math.min(totalPages, start + windowSize - 1);
        return { start, end };
      }

      function renderRows(page) {
        const { start, end } = pageRange(page);
        rows.forEach((row, i) => {
          row.style.display = i >= start && i < end ? "grid" : "none";
        });
      }

      function renderHint(page) {
        const { start, end } = pageRange(page);
        const a = totalItems ? start + 1 : 0;
        const b = totalItems ? end : 0;
        hint.textContent = `Showing ${a}–${b} of ${totalItems} entries`;
      }

      function renderPager(page) {
        nums.innerHTML = "";
        const { start, end } = windowRange(page);
        for (let p = start; p <= end; p++) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "pill" + (p === page ? " active" : "");
          btn.textContent = String(p);
          btn.setAttribute("aria-current", p === page ? "page" : "false");
          btn.addEventListener("click", () => goTo(p));
          nums.appendChild(btn);
        }
        prev.disabled = page === 1;
        next.disabled = page === totalPages;
      }

      function goTo(page) {
        currentPage = clamp(page, 1, totalPages);
        renderRows(currentPage);
        renderHint(currentPage);
        renderPager(currentPage);
      }

      prev.addEventListener("click", () => goTo(currentPage - 1));
      next.addEventListener("click", () => goTo(currentPage + 1));

      goTo(1); // initial render

      return {
        goTo,
        destroy() {
          prev.replaceWith(prev.cloneNode(true)); // quick unbind
          next.replaceWith(next.cloneNode(true));
        },
      };
    }

    const pagerApi = initTablePager({
      container: ".table-card",
      rowsPerPage: 10,
      windowSize: 3,
    });

    // ===== Search: Order ID only =====
    const input = document.querySelector(".action-bar .search input");
    const table = document.querySelector(".table-card"); // ถ้าใช้ .table-card1 ให้แก้ selector นี้
    const rows = Array.from(table?.querySelectorAll(".table-row") ?? []);
    const hint = table?.querySelector(".hint");

    const getActivePageBtn = () =>
      document.querySelector(".pager .pill.active") ||
      document.querySelector(".pager .pill");

    // ปรับให้เทียบง่าย: ตัดช่องว่าง, ตัวพิมพ์เล็ก, ตัด # ออก
    const norm = (s) =>
      (s || "").toString().toLowerCase().replace(/\s+/g, "").replace(/^#/, "");

    // อ่านค่า ORDER ID จากคอลัมน์แรกของแถว
    const orderIdOf = (row) => norm(row.children[0]?.textContent || "");

    function runSearch(q) {
      const query = norm(q);

      // ว่าง = กลับไปใช้ pagination ปกติ
      if (!query) {
        const active = getActivePageBtn();
        if (active) active.click();
        return;
      }

      let shown = 0;
      rows.forEach((row) => {
        const match = orderIdOf(row).includes(query); // ค้นหาเฉพาะ ORDER ID
        row.style.display = match ? "grid" : "none";
        if (match) shown++;
      });

      if (hint) hint.textContent = `Found ${shown} entries`;
    }

    function onInput() { runSearch(input.value); }
    function onKey(e) {
      if (e.key === "Enter") runSearch(input.value);
      if (e.key === "Escape") {
        input.value = "";
        const active = getActivePageBtn();
        if (active) active.click();
      }
    }

    if (input && rows.length > 0) {
      input.addEventListener("input", onInput);
      input.addEventListener("keydown", onKey);
    }

  }, []);

  return (
    <div className="app" data-page="AdminOrderListPage">
      <main className="main">
        <div className="content">
          {/* Title + Search + Add */}
          <div className="content-header">
            <h1 className="title">ORDER LIST</h1>

            <div className="action-bar">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass" />
                <input type="text" placeholder="Search…" />
              </div>
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

            {/* 10 แถวตัวอย่างเดิม */}
            <div className="table-row">
              <div>#00001</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00002</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00003</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00004</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00005</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00006</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00007</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00008</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00009</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>
            <div className="table-row">
              <div>#00010</div><div>00.00</div><div>10</div>
              <div>Success</div><div>Tracking</div>
              <div className="act"><i className="fa-solid fa-chevron-right" /></div>
            </div>

            <div className="table-footer">
              <div className="hint">Showing 10 entries</div>
              <div className="pager">
                <button className="circle" aria-label="Prev">
                  <i className="fa-solid fa-chevron-left" />
                </button>
                {/* ปุ่มเลขหน้าจะถูกสร้างใหม่แบบ dynamic ที่นี่ */}
                <button className="pill active">1</button>
                <button className="pill">2</button>
                <button className="pill">3</button>
                <button className="circle" aria-label="Next">
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
