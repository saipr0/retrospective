import { projects } from '../projects.js';
import { fetchPosts } from '../posts.js';
import { formatPublishDate } from '../utils.js';

function renderProjects() {
  const list = document.getElementById('projects-list');

  if (!list) return;

  list.innerHTML = `
    <h3><span class="nerd-icon">&#xf0c7;</span> Projects</h3>
    <div class="projects-grid">
      ${projects.map(project => `
        <a class="project-disk" href="${project.url}" target="_blank" rel="noopener noreferrer">
          <span class="project-disk-label">${project.name}</span>
          <span class="project-disk-type">${project.type || 'GitHub'}</span>
        </a>
      `).join('')}
    </div>
  `;
}

// post list
export async function loadHome() {
  try {
    const start = document.getElementById('home-start');
    start.innerHTML = `
      <h2 id="hello-title">Hello!</h2>
      <p>Welcome to my web notepad for all the things I try.</p>
    `
    const posts = await fetchPosts();
    const list = document.getElementById('posts-list');
    list.innerHTML = `
      <h2>Posts</h2>
      <div class="posts-list-items">
        ${posts.map(p => `
        <article>
          <p class="post-meta">
            <span>${formatPublishDate(p.publishDate)}</span>
            <a href="#post-detail?id=${p.id}">${p.title}</a>
          </p>
        </article>
        `).join('')}
      </div>`;

    renderProjects();
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}
