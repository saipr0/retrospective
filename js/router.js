import { loadHome } from './pages/home.js';
import { loadAbout } from './pages/about.js';
import { loadPostDetail } from './pages/post-detail.js';

let activeNavigationId = 0;

async function showPage(pageId) {
  const navigationId = ++activeNavigationId;

  const loadPromise = pageId === 'home' ? loadHome()
    : pageId === 'about' ? loadAbout()
    : loadPostDetail();

  await loadPromise;
  if (navigationId !== activeNavigationId) return;

  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.style.display = 'block';
}

async function route() {
  const hash = window.location.hash.slice(1) || 'home';
  const [page] = hash.split('?');
  await showPage(page);
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
window.showPage = showPage;
