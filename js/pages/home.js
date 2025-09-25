// metadata
async function fetchPosts() {
  const r = await fetch('js/data/posts.json');
  return r.json();
}

// post list
export async function loadHome() {
  try {
    const posts = await fetchPosts();
    const list = document.getElementById('posts-list');
    list.innerHTML = posts.map(p => `
        <article>
            <p class="post-meta">${p.publishDate}&nbsp; <a href="#post-detail?id=${p.id}">${p.title}</a></p>
        </article>
    `).join('');
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}