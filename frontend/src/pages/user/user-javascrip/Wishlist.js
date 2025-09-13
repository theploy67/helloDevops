/* ===== Header dropdown (จากโค้ดเดิม) ===== */
const accountBtn = document.querySelector('.pm-account');
const accountMenu = document.getElementById('account-menu');
if (accountBtn && accountMenu) {
  accountBtn.addEventListener('click', () => {
    const expanded = accountBtn.getAttribute('aria-expanded') === 'true';
    accountBtn.setAttribute('aria-expanded', String(!expanded));
    accountMenu.style.display = expanded ? 'none' : 'block';
  });
  document.addEventListener('click', (e) => {
    if (!accountBtn.contains(e.target) && !accountMenu.contains(e.target)) {
      accountBtn.setAttribute('aria-expanded','false');
      accountMenu.style.display = 'none';
    }
  });
}

/* ===== Wishlist data ===== */
const LS_KEY = 'pm_wishlist';
let wishlist = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
if (wishlist.length === 0) {
  wishlist = [
    { id:1, name:"มะพร้าวน้ำหอม ปอกเปลือก 1 ลูก", price:25.00, liked:true, img:"/assets/products/coconut.png" },
    { id:2, name:"ข้าวโอ๊ตธัญพืช 190 กรัม", price:80.00, liked:true, img:"/assets/products/cereal.png" },
    { id:3, name:"ซูเปอร์เชฟ อกไก่สด 600g.", price:130.00, liked:true, img:"/assets/products/chicken.png" },
    { id:4, name:"ซอสพริกศรีราชา 200 มล.", price:33.00, liked:true, img:"/assets/products/sauce.png" },
    { id:5, name:"หมูสันคอ สไลซ์ 0.5 กก.", price:84.00, liked:true, img:"/assets/products/pork.png" },
    { id:6, name:"ขนมปังโฮลวีท 270 กรัม", price:28.00, liked:true, img:"/assets/products/bread.png" },
    { id:7, name:"มะพร้าวน้ำหอม (ลูก)", price:25.00, liked:true, img:"/assets/products/coconut.png" },
    { id:8, name:"ซีเรียลธัญพืช 250 กรัม", price:89.00, liked:true, img:"/assets/products/cereal.png" },
    { id:9, name:"หมูบด 300 กรัม", price:54.00, liked:true, img:"/assets/products/pork.png" }
  ];
  localStorage.setItem(LS_KEY, JSON.stringify(wishlist));
}

/* ===== DOM ===== */
const elGrid  = document.getElementById('wl-grid');
const elEmpty = document.getElementById('wl-empty');
const elCount = document.getElementById('wl-count');
const elSort  = document.getElementById('wl-sort');
const elClear = document.getElementById('wl-clear');

/* ===== Helpers ===== */
function save(){ localStorage.setItem(LS_KEY, JSON.stringify(wishlist)); }
function formatPrice(n){ return `฿ ${Number(n).toFixed(2)}`; }

/* ===== Minimal modal (inject ถ้ายังไม่มี) ===== */
function ensureConfirmModal(){
  if (document.getElementById('confirm-modal')) return;

  const style = document.createElement('style');
  style.textContent = `
  .pm-modal[hidden]{display:none}
  .pm-modal{position:fixed;inset:0;z-index:60;display:grid;place-items:center}
  .pm-modal__overlay{position:absolute;inset:0;background:rgba(0,0,0,.45);backdrop-filter:saturate(140%) blur(1px)}
  .pm-modal__dialog{position:relative;width:min(480px,calc(100% - 32px));background:#fff;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.25);padding:22px 20px;font-family:"Poppins",system-ui,sans-serif}
  .pm-modal__dialog h3{margin:0 0 8px;font:600 18px/1.3 "Poppins",system-ui,sans-serif;color:#111}
  .pm-modal__text{margin:0 0 16px;color:#475569;font-size:14px}
  .pm-modal__actions{display:flex;justify-content:flex-end;gap:10px}
  .pm-modal .btn{padding:10px 14px;border-radius:10px;border:1px solid #e6e8f0;background:#fff;font-weight:600;cursor:pointer}
  .pm-modal .btn:hover{border-color:#cfd3df}
  .pm-modal .btn-danger{background:#ef4444;border-color:#ef4444;color:#fff}
  .pm-modal .btn-danger:hover{filter:brightness(1.05)}
  `;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.id = 'confirm-modal';
  modal.className = 'pm-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="pm-modal__overlay" data-cancel></div>
    <div class="pm-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="cm-title">
      <h3 id="cm-title" data-title>Clear wishlist?</h3>
      <p class="pm-modal__text" data-msg>รายการทั้งหมดจะถูกลบออกจาก Wishlist ของคุณ</p>
      <div class="pm-modal__actions">
        <button class="btn" data-cancel>ยกเลิก</button>
        <button class="btn btn-danger" data-ok>ล้างทั้งหมด</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function showConfirm({ title='Are you sure?', message='', okText='OK', cancelText='Cancel' } = {}){
  ensureConfirmModal();
  return new Promise(resolve=>{
    const modal = document.getElementById('confirm-modal');
    const elTitle = modal.querySelector('[data-title]');
    const elMsg   = modal.querySelector('[data-msg]');
    const btnOk   = modal.querySelector('[data-ok]');
    const btnCancels = modal.querySelectorAll('[data-cancel]');

    elTitle.textContent = title;
    elMsg.textContent   = message;
    btnOk.textContent   = okText;
    btnCancels.forEach(b=> b.textContent = cancelText);

    const cleanup = (val)=>{
      modal.hidden = true;
      btnOk.removeEventListener('click', onOk);
      btnCancels.forEach(b=> b.removeEventListener('click', onCancel));
      modal.removeEventListener('keydown', onKey);
      resolve(val);
    };
    const onOk = ()=> cleanup(true);
    const onCancel = ()=> cleanup(false);
    const onKey = (e)=>{ if(e.key==='Escape') cleanup(false); };

    btnOk.addEventListener('click', onOk);
    btnCancels.forEach(b=> b.addEventListener('click', onCancel));
    modal.addEventListener('keydown', onKey);

    modal.hidden = false;
    btnOk.focus();
  });
}

/* ===== Render ===== */
function render(){
  elGrid.innerHTML = '';
  elCount.textContent = wishlist.length;
  elEmpty.hidden = wishlist.length !== 0;

  wishlist.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'wl-card';
    card.innerHTML = `
      <div class="wl-thumb">
        <!-- ปุ่มกากบาทเพื่อลบ -->
        <button class="wl-like" data-remove="${item.id}" aria-label="remove from wishlist" title="Remove">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="6"  y1="6"  x2="18" y2="18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"></line>
            <line x1="18" y1="6"  x2="6"  y2="18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"></line>
          </svg>
        </button>
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="wl-body">
        <h3 class="wl-name">${item.name}</h3>
        <div class="wl-price">${formatPrice(item.price)}</div>
        <div class="wl-meta">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 7.1a5 5 0 0 0-7.1 0L12 8.8l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.1 8.8-8.1a5 5 0 0 0 0-7.1Z"></path>
          </svg>
          <span>${item.liked ? 'In wishlist' : '—'}</span>
        </div>
      </div>
      <div class="wl-actions">
        <button class="btn btn-primary" data-cart="${item.id}">ADD TO CART</button>
      </div>
    `;
    elGrid.appendChild(card);
  });

  // event: add to cart
  elGrid.querySelectorAll('[data-cart]').forEach(b=>{
    b.addEventListener('click', e=>{
      const id = +e.currentTarget.getAttribute('data-cart');
      const p = wishlist.find(x=>x.id===id);
      alert(`เพิ่ม "${p.name}" ลงตะกร้าแล้ว`);
    });
  });

  // event: remove (ปุ่มกากบาท)
  elGrid.querySelectorAll('[data-remove]').forEach(b=>{
    b.addEventListener('click', e=>{
      const id = +e.currentTarget.getAttribute('data-remove');
      wishlist = wishlist.filter(x=>x.id!==id);
      save(); render();
    });
  });
}

/* ===== Sorting / Clear ===== */
if (elSort) {
  elSort.addEventListener('change', ()=>{
    const v = elSort.value;
    if (v==='priceAsc')   wishlist.sort((a,b)=>a.price-b.price);
    if (v==='priceDesc')  wishlist.sort((a,b)=>b.price-a.price);
    if (v==='nameAsc')    wishlist.sort((a,b)=>a.name.localeCompare(b.name,'th'));
    if (v==='recent')     wishlist.sort((a,b)=>a.id-b.id);
    save(); render();
  });
}

if (elClear) {
  elClear.addEventListener('click', async ()=>{
    const ok = await showConfirm({
      title: 'ล้าง Wishlist ทั้งหมด?',
      message: 'รายการทั้งหมดจะถูกลบออกจาก Wishlist ของคุณ',
      okText: 'ล้างทั้งหมด',
      cancelText: 'ยกเลิก'
    });
    if (!ok) return;
    wishlist = [];
    save(); render();
  });
}

/* Boot */
document.addEventListener('DOMContentLoaded', render);
