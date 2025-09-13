// Subscribe form handler (validate + fake submit)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('footer-subscribe');
  if (!form) return;

  const email = document.getElementById('sub-email');
  const msg   = document.getElementById('sub-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '';
    const value = (email.value || '').trim();

    // very small validation
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!ok) {
      msg.style.color = '#ffb4b4';
      msg.textContent = 'กรุณากรอกอีเมลให้ถูกต้อง';
      email.focus();
      return;
    }

    // pretend success
    msg.style.color = '#a8f5b9';
    msg.textContent = 'ขอบคุณสำหรับการติดตาม! ✅';
    email.value = '';
  });
});
