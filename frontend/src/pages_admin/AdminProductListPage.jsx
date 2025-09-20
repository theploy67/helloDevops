// D:\Devop\Real-Project\helloDevops\frontend\src\pages_admin\AdminProductListPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminProductListPage.css";

export default function AdminProductListPage() {
  useEffect(() => {
    /* ========== Table pager (คง logic เดิม) ========== */
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
      const prev = root.querySelector("#prevBtn");
      const next = root.querySelector("#nextBtn");
      const nums = root.querySelector("#pagerNumbers");
      if (!hint || !prev || !next || !nums) return;

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
      goTo(1);
    }

    initTablePager({ container: ".table-card", rowsPerPage: 10, windowSize: 3 });

    // ===== Search: Product ID only =====
    const input = document.querySelector(".action-bar .search input");
    const table = document.querySelector(".table-card"); // ถ้าใช้คลาสอื่น ให้แก้ให้ตรง
    const rows = Array.from(table?.querySelectorAll(".table-row") ?? []);
    const hint = table?.querySelector(".hint");

    const getActivePageBtn = () =>
      document.querySelector(".pager .pill.active") ||
      document.querySelector(".pager .pill");

    // ปรับให้เทียบง่าย: ตัดช่องว่าง, ตัวพิมพ์เล็ก, ตัด # ออก
    const norm = (s) =>
      (s || "").toString().toLowerCase().replace(/\s+/g, "").replace(/^#/, "");

    // Product ID อยู่คอลัมน์ที่ 2 (index = 1)
    const productIdOf = (row) => norm(row.children[1]?.textContent || "");

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
        const match = productIdOf(row).includes(query); // ค้นหาเฉพาะ Product ID
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

    // (ใน cleanup ของ useEffect)
    return () => {
      if (input) {
        input.removeEventListener("input", onInput);
        input.removeEventListener("keydown", onKey);
      }
    };

  }, []);

  return (
    <div className="app" data-page="AdminProductListPage">

      <main className="main">
        <div className="content">
          <div className="content-header">
            <h1 className="title">PRODUCT LIST</h1>

            <div className="action-bar">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass" />
                <input type="text" placeholder="Search product…" />
              </div>
              <Link to="/admin/products/new" className="btn-add">
                <span className="box">
                  <i className="fa-solid fa-plus" />
                </span>
                ADD NEW
              </Link>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div>Product</div>
              <div>Product ID</div>
              <div>Price</div>
              <div>Category</div>
              <div>Brand</div>
              <div>Quantity</div>
              <div>Stock</div>
              <div>Action</div>
            </div>

            {/* rows คงเดิมทั้งหมด */}
            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00001</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <Link to="/admin/products/:id/edit" aria-label="Edit product">
                  <i className="fa-solid fa-pen" />
                </Link>
                <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00002</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00003</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00004</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00005</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00006</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00007</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00008</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00009</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00010</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-row">
              <div className="prod">
                <span className="cube">
                  <i className="fa-solid fa-cube" />
                </span>{" "}
                Name
              </div>
              <div>#00011</div>
              <div>00.00</div>
              <div>Fruits</div>
              <div>-</div>
              <div>10</div>
              <div>In Stock</div>
              <div className="act">
                <i className="fa-solid fa-pen" /> <i className="fa-solid fa-trash" />
              </div>
            </div>

            <div className="table-footer">
              <div className="hint">Showing entries</div>
              <div className="pager">
                <button className="circle" aria-label="Prev" id="prevBtn">
                  <i className="fa-solid fa-chevron-left" />
                </button>
                <div id="pagerNumbers" />
                <button className="circle" aria-label="Next" id="nextBtn">
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
