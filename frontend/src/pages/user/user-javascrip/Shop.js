/* ====== Mock data (ตัวอย่าง) ====== */
const PRODUCTS = [
    { id: 1, name: "มะพร้าวน้ำหอม ลูกละ", price: 25.00, brand: "CP", cat: "Fresh", promo: "-", img: "/assets/products/p1.png" },
    { id: 2, name: "ซุปแห้งสำเร็จรูป กลิ่นหมูเด้ง แพ็ค", price: 35.00, brand: "MK", cat: "Pack", promo: "Sale", img: "/assets/products/p2.png" },
    { id: 3, name: "ถั่วแระ แช่แข็ง 500g", price: 88.00, brand: "Betagro", cat: "Frozen", promo: "-", img: "/assets/products/p3.png" },
    { id: 4, name: "ขนมปังไส้ฝอยทอง 4 ชิ้น", price: 19.00, brand: "CP", cat: "Bakery", promo: "Flash", img: "/assets/products/p4.png" },
    { id: 5, name: "หมูบดแช่แข็ง 250g", price: 78.00, brand: "Betagro", cat: "Frozen", promo: "Sale", img: "/assets/products/p5.png" },
    { id: 6, name: "อกไก่ 2 กก.", price: 564.00, brand: "CP", cat: "Meat", promo: "-", img: "/assets/products/p6.png" },
    { id: 7, name: "ซอสมะเขือเทศ 260 ก.", price: 33.00, brand: "Roza", cat: "Sauce", promo: "-", img: "/assets/products/p7.png" },
    { id: 8, name: "โฮลวีทแซนด์วิช 170 กรัม", price: 20.00, brand: "Farmhouse", cat: "Bakery", promo: "-", img: "/assets/products/p8.png" },
    { id: 9, name: "อกไก่สไลซ์ 100g", price: 39.00, brand: "CP", cat: "Meat", promo: "Flash", img: "/assets/products/p9.png" },
    { id: 10, name: "นม UHT 1 ลิตร", price: 32.00, brand: "Dutchie", cat: "Dairy", promo: "Sale", img: "/assets/products/p10.png" },
];

/* ====== Constants ====== */
const PAGE_SIZE = 9;
const LS_WISH = 'pm_wishlist';
const state = {
    page: 1,
    sort: 'featured',
    filters: {
        cat: new Set(),
        brand: new Set(),
        promo: new Set(),
        priceMin: null,
        priceMax: null,
    }
};

let wishlist = new Set(JSON.parse(localStorage.getItem(LS_WISH) || '[]'));

/* ====== Elements ====== */
const grid = document.getElementById('product-grid');
const chipList = document.getElementById('chip-list');
const clearAllBtn = document.getElementById('clear-all');
const sortSel = document.getElementById('sort');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

/* Filter groups */
const catBox = document.getElementById('f-cat');
const brandBox = document.getElementById('f-brand');
const promoBox = document.getElementById('f-promo');
const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const applyPriceBtn = document.getElementById('apply-price');

/* ====== Build filter lists ====== */
const cats = [...new Set(PRODUCTS.map(p => p.cat))].sort();
const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
const promos = [...new Set(PRODUCTS.map(p => p.promo))].filter(x => x !== '-').sort();

function buildChecklist(container, list, groupKey) {
    container.innerHTML = '';
    list.forEach(val => {
        const id = `${groupKey}-${val}`;
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerHTML = `<input id="${id}" type="checkbox" value="${val}"><span>${val}</span>`;
        container.appendChild(label);

        label.querySelector('input').addEventListener('change', (e) => {
            const v = e.target.value;
            const set = state.filters[groupKey];
            e.target.checked ? set.add(v) : set.delete(v);
            state.page = 1;
            renderAll();
        });
    });
}
buildChecklist(catBox, cats, 'cat');
buildChecklist(brandBox, brands, 'brand');
buildChecklist(promoBox, promos, 'promo');

/* ====== Sorting ====== */
sortSel.addEventListener('change', () => {
    state.sort = sortSel.value;
    state.page = 1;
    renderAll();
});

/* ====== Price ====== */
applyPriceBtn.addEventListener('click', () => {
    const min = minInput.value ? Number(minInput.value) : null;
    const max = maxInput.value ? Number(maxInput.value) : null;
    state.filters.priceMin = min;
    state.filters.priceMax = max;
    state.page = 1;
    renderAll();
});

/* ====== Core filtering/sorting/paging ====== */
function applyFilters(items) {
    const f = state.filters;
    return items.filter(p => {
        if (f.cat.size && !f.cat.has(p.cat)) return false;
        if (f.brand.size && !f.brand.has(p.brand)) return false;
        if (f.promo.size && !f.promo.has(p.promo)) return false;
        if (f.priceMin != null && p.price < f.priceMin) return false;
        if (f.priceMax != null && p.price > f.priceMax) return false;
        return true;
    });
}
function applySort(items) {
    const s = state.sort;
    const arr = [...items];
    if (s === 'price-asc') arr.sort((a, b) => a.price - b.price);
    else if (s === 'price-desc') arr.sort((a, b) => b.price - a.price);
    else if (s === 'name-asc') arr.sort((a, b) => a.name.localeCompare(b.name, 'th'));
    else if (s === 'name-desc') arr.sort((a, b) => b.name.localeCompare(a.name, 'th'));
    return arr;
}
function paginate(items) {
    const start = (state.page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
}

/* ====== Render products ====== */
function iconHeart(isOn) {
    return isOn
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff3b7b"><path d="M12 21s-7.364-4.438-9.428-8.571C.857 9.714 2.571 6 6 6c2.143 0 3.643 1.286 4.286 2.143C10.929 7.286 12.429 6 14.571 6 18 6 19.714 9.714 21.428 12.429 19.364 16.562 12 21 12 21z"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function renderGrid(items) {
    grid.innerHTML = '';
    items.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';

        const isWish = wishlist.has(p.id);

        card.innerHTML = `
      <div class="p-thumb"><img src="${p.img}" alt="${p.name}"></div>
      <div class="p-body">
        <h3 class="p-title" title="${p.name}">${p.name}</h3>
        <div class="p-meta">
          <div class="p-price">฿ ${p.price.toFixed(2)}</div>
          <button class="icon-btn wish ${isWish ? 'is-wish' : ''}" aria-pressed="${isWish}" title="Add to wishlist" data-id="${p.id}">
            ${iconHeart(isWish)}
          </button>
        </div>
        <button class="btn btn--primary btn--sm add-cart" data-id="${p.id}">ADD TO CART</button>
      </div>
    `;
        grid.appendChild(card);
    });

    // bind events
    grid.querySelectorAll('.wish').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            if (wishlist.has(id)) wishlist.delete(id); else wishlist.add(id);
            localStorage.setItem(LS_WISH, JSON.stringify([...wishlist]));
            renderAll(); // รีเรนเดอร์เพื่ออัปเดตไอคอน
        });
    });
    grid.querySelectorAll('.add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            // ที่นี่คุณเชื่อมตะกร้าจริงได้ ตอนนี้โชว์ toast ง่ายๆ
            btn.textContent = 'ADDED ✓';
            setTimeout(() => btn.textContent = 'ADD TO CART', 1200);
        });
    });
}

/* ====== Render chips ====== */
function renderChips() {
    chipList.innerHTML = '';
    const f = state.filters;
    const chips = [];

    f.cat.forEach(v => chips.push({ key: 'cat', label: v }));
    f.brand.forEach(v => chips.push({ key: 'brand', label: v }));
    f.promo.forEach(v => chips.push({ key: 'promo', label: v }));
    if (f.priceMin != null || f.priceMax != null) {
        chips.push({ key: 'price', label: `฿${f.priceMin ?? 0}–${f.priceMax ?? '∞'}` });
    }

    clearAllBtn.hidden = chips.length === 0;

    chips.forEach(c => {
        const el = document.createElement('span');
        el.className = 'chip';
        el.innerHTML = `${c.label} <button aria-label="Remove ${c.label}">×</button>`;
        el.querySelector('button').addEventListener('click', () => {
            if (c.key === 'price') { f.priceMin = null; f.priceMax = null; minInput.value = ''; maxInput.value = ''; }
            else state.filters[c.key].delete(c.label);
            state.page = 1;
            renderAll();
        });
        chipList.appendChild(el);
    });

    clearAllBtn.onclick = () => {
        f.cat.clear(); f.brand.clear(); f.promo.clear(); f.priceMin = null; f.priceMax = null;
        document.querySelectorAll('.checklist input[type="checkbox"]').forEach(i => i.checked = false);
        minInput.value = ''; maxInput.value = '';
        state.page = 1;
        renderAll();
    };
}

/* ====== Pagination ====== */
prevBtn.addEventListener('click', () => { state.page = Math.max(1, state.page - 1); renderAll(); });
nextBtn.addEventListener('click', () => { state.page = state.page + 1; renderAll(); });

/* ====== Render all ====== */
function renderAll() {
    const filtered = applyFilters(PRODUCTS);
    const sorted = applySort(filtered);

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    state.page = Math.min(state.page, totalPages);

    const pageItems = paginate(sorted);

    renderChips();
    renderGrid(pageItems);

    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= totalPages;
    pageInfo.textContent = `Page ${state.page} / ${totalPages}`;
}

/* ====== Header dropdown (ถ้ามีในโปรเจกต์คุณ) ====== */
const accountBtn = document.querySelector('.pm-account');
const accountMenu = document.getElementById('account-menu');
if (accountBtn && accountMenu) {
    const toggleMenu = (show) => {
        accountMenu.hidden = !show;
        accountBtn.setAttribute('aria-expanded', String(show));
    };
    accountBtn.addEventListener('click', () => {
        const expanded = accountBtn.getAttribute('aria-expanded') === 'true';
        toggleMenu(!expanded);
    });
    document.addEventListener('click', (e) => {
        if (!accountBtn.contains(e.target) && !accountMenu.contains(e.target)) toggleMenu(false);
    });
}

/* ====== Init ====== */
renderAll();
