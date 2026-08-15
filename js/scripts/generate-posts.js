const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.join(__dirname, '..', '..');

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

function extractBody(content) {
  return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '');
}

function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

function generatePostsJson() {
  const postsDir = path.join(rootDir, 'posts');
  const dataDir = path.join(rootDir, 'js', 'data');
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
          folder,
          content: extractBody(content)
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

function generateArchiveManifest() {
  const dataDir = path.join(rootDir, 'js', 'data');
  const directAssets = [
    path.join(dataDir, 'posts.json'),
    path.join(rootDir, 'content', 'about.md'),
    path.join(rootDir, 'css', 'prism-dark.css')
  ];
  const discoveredAssets = [
    ...walkFiles(path.join(rootDir, 'css', 'assets')),
    ...walkFiles(path.join(rootDir, 'posts')).filter(file => !file.endsWith('index.md'))
  ];
  const assetFiles = [...new Set([...directAssets, ...discoveredAssets])]
    .filter(file => fs.existsSync(file))
    .sort();
  const versionHash = crypto.createHash('sha256');
  const assets = assetFiles.map(file => {
    const url = path.relative(rootDir, file).split(path.sep).join('/');
    const contents = fs.readFileSync(file);

    versionHash.update(url);
    versionHash.update(contents);

    return { url, size: contents.length };
  });
  const manifest = {
    version: versionHash.digest('hex').slice(0, 12),
    totalBytes: assets.reduce((total, asset) => total + asset.size, 0),
    assets
  };
  const outputPath = path.join(dataDir, 'archive-manifest.json');

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`Generated archive manifest ${manifest.version} (${manifest.totalBytes} bytes)`);
}

generatePostsJson();
generateArchiveManifest();
