const fs = require('fs');
const path = require('path');

function extractFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');

    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');

      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key] = JSON.parse(value);
      } else {
        frontmatter[key] = value;
      }
    }
  });

  return frontmatter;
}

function generatePostsJson() {
  const postsDir = path.join(__dirname, '..', '..', 'posts');
  const dataDir = path.join(__dirname, '..', 'data');
  const posts = [];

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const folders = fs.readdirSync(postsDir);

  folders.forEach(folder => {
    const folderPath = path.join(postsDir, folder);
    const indexPath = path.join(folderPath, 'index.md');

    if (fs.statSync(folderPath).isDirectory() && fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      const frontmatter = extractFrontmatter(content);

      if (frontmatter) {
        posts.push({
          id: folder.replace(/_/g, '-'),
          title: frontmatter.title,
          description: frontmatter.description,
          publishDate: frontmatter.publishDate,
          tags: frontmatter.tags || [],
          folder: folder
        });
      }
    }
  });

  posts.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  const outputPath = path.join(dataDir, 'posts.json')
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

  console.log(`Generated posts.json with ${posts.length} posts:`);
  posts.forEach(post => console.log(`   - ${post.title} (${post.publishDate})`));
}

generatePostsJson();
