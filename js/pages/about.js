import { initAboutTheme } from '../theme.js';

export async function loadAbout() {
  const r = await fetch(`./content/about.md`);
  const markdown = await r.text();

  const htmlContent = marked.parse(markdown);
  document.getElementById('about-content').innerHTML = `
    <img id="about-banner" class="def-img" src="" alt="">
    <div class="post-body">${htmlContent}</div>
  `;

  initAboutTheme();
}
