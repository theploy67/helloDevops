document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.pm-account');
  const menu = document.getElementById('account-menu');
  const wrapper = document.querySelector('.pm-dropdown-wrapper');
  const firstItem = menu?.querySelector('[role="menuitem"]');

  if (!btn || !menu || !wrapper) return; // กัน error ถ้า element ยังไม่ถูกเรนเดอร์

  const openMenu = () => {
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    firstItem?.focus();
  };
  const closeMenu = () => {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  const toggleMenu = () => (menu.classList.contains('is-open') ? closeMenu() : openMenu());

  btn.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(); });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.pm-dropdown-wrapper')) closeMenu();
  });
  menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); btn.focus(); } });
  window.addEventListener('resize', closeMenu);
});
