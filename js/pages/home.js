import { animate } from '../lib/anime.esm.min.js'

// metadata
async function fetchPosts() {
  const r = await fetch('js/data/posts.json');
  return r.json();
}

// post list
export async function loadHome() {
  try {
    const start = document.getElementById('home-start');
    start.innerHTML = `
      <h3 id="hello-title">&#xf256; Hello!</h3>
      <p>Welcome to my web notepad for all the things I try. Need a reference everytime i reinstall Arch - because i have a weird definition of fun.</p>
    `
    const $homeStart = document.querySelector('#home-start');
    const $allInside = $homeStart.querySelectorAll('*');

    animate($allInside, {
      x: {
        from: '-1rem',
        to: '0rem'
      },
      opacity: {
        from: 0,
        to: 1
      },
    });

    const posts = await fetchPosts();
    const list = document.getElementById('posts-list');
    list.innerHTML = `
      <h3>&#xf448; Posts</h3>
      ${posts.map(p => `
      <article>
        <p class="post-meta">
          ${p.publishDate}&nbsp;
          <a href="#post-detail?id=${p.id}">${p.title}</a>
        </p>
      </article>
      `).join('')}`;
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

