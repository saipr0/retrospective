// metadata
async function fetchPosts() {
  const r = await fetch('js/data/posts.json');
  return r.json();
}

// parse markdown
function parseMarkdown(markdown) {
  const r = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const m = markdown.match(r);
  if (!m) return { frontmatter: {}, content: markdown };

  const fm = m[1];
  const content = m[2];

  const frontmatter = {};
  fm.split('\n').forEach(line => {
    const [key, ...parts] = line.split(':');
    if (key && parts.length) {
      let val = parts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = val;
    }
  });
  return { frontmatter, content, title: frontmatter.title || 'Untitled', publishDate: frontmatter.publishDate || '' };
}

// image paths in markdown
function fixImagePaths(content, postFolder) {
  return content.replace(/!\[([^\]]*)\]\(\.\/([^)]+)\)/g, `![$1](posts/${postFolder}/$2)`)
    .replace(/src="\.\/([^"]+)"/g, `src="posts/${postFolder}/$1"`);
}

// fetch markdown
async function loadPostContent(postId) {
  const posts = await fetchPosts(); // metdata
  const post = posts.find(p => p.id === postId);
  if (!post) throw new Error(`Post with id ${postId} not found`);

  const r = await fetch(`https://raw.githubusercontent.com/saipr0/retrospective/main/posts/${post.folder}/index.md`);
  const markdown = await r.text();

  const { title, publishDate, content } = parseMarkdown(markdown);
  const fixedContent = fixImagePaths(content, post.folder);
  return { title, publishDate, content: fixedContent };
}

// post list
async function loadPostList() {
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

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.style.display = 'block';
  if (pageId === 'home') loadPostList();
}

// Opening a post
async function handlePostDetail() {
  const urlParams = new URLSearchParams(window.location.hash.slice(1).split('?')[1]);
  const postId = urlParams.get('id');
  if (postId) {
    await loadAndDisplayPost(postId);
  }
}

// Display Post
async function loadAndDisplayPost(postId) {
  try {
    const { title, publishDate, content } = await loadPostContent(postId); // load post
    const htmlContent = marked.parse(content); // parse markdown
    document.getElementById('post-content').innerHTML = `
      <div class="post-header">
        <h1>${title}</h1>
        <p class="post-meta">${publishDate}</p>
      </div>
      <div class="post-body">${htmlContent}</div>
    `;
    if (typeof Prism !== 'undefined') Prism.highlightAll();
  } catch (error) {
    console.error('Error loading post:', error);
    document.getElementById('post-content').innerHTML = '<p>Error loading post.</p>';
  }
}

// routing
async function route() {
  const hash = window.location.hash.slice(1) || 'home';
  const [page] = hash.split('?');
  if (page === 'post-detail') {
    showPage('post-detail');
    await handlePostDetail();
  } else {
    showPage(page);
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
window.showPage = showPage;
window.loadPostList = loadPostList;
