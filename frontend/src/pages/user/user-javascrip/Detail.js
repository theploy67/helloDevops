document.addEventListener('DOMContentLoaded', () => {
  // ====== Quantity control ======
  document.querySelectorAll('[data-qty]').forEach(box => {
    const input = box.querySelector('.qty__input');
    const plus  = box.querySelector('[data-plus]');
    const minus = box.querySelector('[data-minus]');

    if (!input) return;

    plus?.addEventListener('click', () => {
      input.value = (parseInt(input.value || 1,10) + 1);
    });

    minus?.addEventListener('click', () => {
      const v = Math.max(1, parseInt(input.value || 1,10) - 1);
      input.value = v;
    });
  });

  // ====== Breadcrumb update ======
  const productTitle = document.querySelector('.product__title')?.textContent?.trim();
  const currentEl = document.getElementById('bc-current');
  if (productTitle && currentEl) {
    currentEl.textContent = productTitle;
  }

  const catEl = document.getElementById('bc-cat');
  const catName = document.querySelector('.cat a')?.textContent?.trim(); 
  if (catEl && catName) {
    const catSlug = catName.toLowerCase();
    catEl.textContent = catName;
    catEl.href = `/category/${catSlug}`;
  }
});
