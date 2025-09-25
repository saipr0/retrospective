import { loadHome } from './pages/home.js';
import { loadAbout } from './pages/about.js';
import { loadPostDetail } from './pages/post-detail.js';

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // Show target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.style.display = 'block';

  // Load page content
  if (pageId === 'home') loadHome();
  if (pageId === 'about') loadAbout();
  if (pageId === 'post-detail') loadPostDetail();
}

async function route() {
  const hash = window.location.hash.slice(1) || 'home';
  const [page] = hash.split('?');
  showPage(page);
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
window.showPage = showPage;
