import { loadHome } from './pages/home.js';
import { loadAbout } from './pages/about.js';
import { loadPostDetail } from './pages/post-detail.js';
import { runOpener } from './opener.js';

async function showPage(pageId) {
  // Hide all pages first
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // Only show loading for about and post-detail pages (not home)
  const showLoading = pageId !== 'home';
  let loading;

  let animDone;
  if (showLoading) {
    const cmd = pageId === 'about' ? '$ cat about.md' : '$ cat post.md';
    const n = cmd.length;
    loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.innerHTML = `<span class="load-cmd" style="--w:${n}ch; animation: typeCmd ${n * 65}ms steps(${n}, end) forwards">${cmd}</span><span class="cursor">&#x2588;</span>`;
    loading.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--bg-color);z-index:999;';
    document.body.appendChild(loading);
    animDone = new Promise(r =>
      loading.querySelector('.load-cmd').addEventListener('animationend', r, { once: true })
    );
  }

  // Load content
  const loadPromise = pageId === 'home' ? loadHome()
    : pageId === 'about' ? loadAbout()
    : loadPostDetail();

  // Wait for both content and typing animation to finish
  if (showLoading) {
    await Promise.all([loadPromise, animDone]);
    await new Promise(r => setTimeout(r, 800));
    loading.remove();
  } else {
    await loadPromise;
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
window.addEventListener('load', async () => {
  if (!sessionStorage.getItem('opened')) {
    await runOpener();
    sessionStorage.setItem('opened', '1');
  }
  route();
});
window.showPage = showPage;
