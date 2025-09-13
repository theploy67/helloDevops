// dropdown toggle (click + keyboard)
    document.querySelectorAll('.nav-toggle').forEach(toggle => {
      const handler = () => {
        const panel = document.querySelector(toggle.dataset.target);
        if (!panel) return;
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        panel.style.display = expanded ? 'none' : 'block';
        const chev = toggle.querySelector('.right i');
        if (chev) chev.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
      };
      toggle.addEventListener('click', handler);
      toggle.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
      });
    });

    // sidebar collapse via hamburger (remember state)
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');

    if (localStorage.getItem('sb-collapsed') === '1') {
      sidebar.classList.add('collapsed');
    }

    const toggleSidebar = () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sb-collapsed', sidebar.classList.contains('collapsed') ? '1' : '0');
    };

    if (menuBtn) {
      menuBtn.addEventListener('click', toggleSidebar);
      menuBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSidebar(); }
      });
    }