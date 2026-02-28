import { loadHome } from './pages/home.js';
import { loadAbout } from './pages/about.js';
import { loadPostDetail } from './pages/post-detail.js';

async function showPage(pageId) {
  // Hide all pages first
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // Only show loading for about and post-detail pages (not home)
  const showLoading = pageId !== 'home';
  let loading;

  if (showLoading) {
    loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.innerHTML = '<p class="loading">Loading...</p>';
    loading.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--bg-color);z-index:999;';
    document.body.appendChild(loading);
  }

  // Load content
  const loadPromise = pageId === 'home' ? loadHome() 
    : pageId === 'about' ? loadAbout() 
    : loadPostDetail();

  // Wait for content to load
  await loadPromise;

  // If showing loading, wait minimum delay then remove
  if (showLoading) {
    await new Promise(r => setTimeout(r, 400));
    loading.remove();
  }

  // Show target page
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
