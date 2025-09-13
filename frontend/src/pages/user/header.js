document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.pm-account');
  const menu = document.getElementById('account-menu');
  const firstItem = menu?.querySelector('[role="menuitem"]');

  function openMenu(){
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
    firstItem?.focus();
  }
  function closeMenu(){
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
  }
  function toggleMenu(){
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  }

  btn.addEventListener('click', (e)=>{ e.preventDefault(); toggleMenu(); });
  document.addEventListener('click', (e)=>{ if(!e.target.closest('.pm-dropdown-wrapper')) closeMenu(); });
  menu.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ closeMenu(); btn.focus(); } });
  window.addEventListener('resize', closeMenu);
});
