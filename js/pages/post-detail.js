import { formatPublishDate, makeLinksExternal, wrapNerdIcons } from '../utils.js';
import { fetchPosts } from '../posts.js';

// image paths in markdown
function fixImagePaths(content, postFolder) {
  return content.replace(/!\[([^\]]*)\]\(\.\/([^)]+)\)/g, `![$1](posts/${postFolder}/$2)`)
    .replace(/src="\.\/([^"]+)"/g, `src="posts/${postFolder}/$1"`);
}

function wrapPostSections(root) {
  const sectionNodes = [];
  let currentSection = document.createElement('section');
  currentSection.className = 'post-section';

  Array.from(root.childNodes).forEach(node => {
    const startsSection = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H2';

    if (startsSection && currentSection.childNodes.length > 0) {
      sectionNodes.push(currentSection);
      currentSection = document.createElement('section');
      currentSection.className = 'post-section';
    }

    currentSection.appendChild(node);
  });

  if (currentSection.childNodes.length > 0) {
    sectionNodes.push(currentSection);
  }

  root.replaceChildren(...sectionNodes);
}

// fetch markdown
async function loadPostContent(postId) {
  const posts = await fetchPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) throw new Error(`Post with id ${postId} not found`);

  return {
    title: post.title,
    publishDate: post.publishDate,
    content: fixImagePaths(post.content, post.folder)
  };
}

// Display Post
async function loadAndDisplayPost(postId) {
  try {
    const { title, publishDate, content } = await loadPostContent(postId);
    const htmlContent = marked.parse(content);
    document.getElementById('post-content').innerHTML = `
      <div class="post-header">
        <div class="post-header-content">
          <h1>${title}</h1>
          <p class="post-meta">${formatPublishDate(publishDate)}</p>
        </div>
      </div>
      <div class="post-body">${htmlContent}</div>
    `;
    const postContent = document.getElementById('post-content');
    const postBody = postContent.querySelector('.post-body');

    wrapPostSections(postBody);
    wrapNerdIcons(postContent);
    if (typeof Prism !== 'undefined') Prism.highlightAll();

    makeLinksExternal('#post-content');

  } catch (error) {
    console.error('Error loading post:', error);
    document.getElementById('post-content').innerHTML = '<p>Error loading post.</p>';
  }
}

// Opening a post
export async function loadPostDetail() {
  const urlParams = new URLSearchParams(window.location.hash.slice(1).split('?')[1]);
  const postId = urlParams.get('id');
  if (postId) {
    await loadAndDisplayPost(postId);
  }
}
