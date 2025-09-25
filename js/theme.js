export function initTheme() {
  function switchPrismTheme(isDark) {
    const link = document.getElementById('prism-theme');
    if (link) {
      link.href = isDark ? 'css/prism-dark.css' : 'css/prism.css';
    }
  }

  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'light';
  const isDark = saved === 'dark';

  document.documentElement.classList.toggle('dark', isDark);
  toggle.textContent = isDark ? '\uf522' : '\uf4ee';
  switchPrismTheme(isDark);

  toggle.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    const theme = dark ? 'dark' : 'light';

    localStorage.setItem('theme', theme);
    toggle.textContent = dark ? '\uf522' : '\uf4ee';
    switchPrismTheme(dark);
    initAboutTheme();
  });
}

export function initAboutTheme() {
  const aboutBanner = document.getElementById('about-banner');
  const isDark = document.documentElement.classList.contains('dark');
  if (aboutBanner) {
    aboutBanner.src = isDark
      ? 'css/assets/images/social-card.png'
      : 'css/assets/images/social-card-2.png';
  }
}
