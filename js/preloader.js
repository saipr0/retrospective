const MANIFEST_URL = 'js/data/archive-manifest.json';
const BOOT_TIME = 2400;
const BAR_SIZE = 25;

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function fetchManifest() {
  const response = await fetch(MANIFEST_URL, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Archive manifest returned ${response.status}`);
  return response.json();
}

async function syncArchive(manifest, progress) {
  await Promise.all(manifest.assets.map(async asset => {
    const url = new URL(asset.url, document.baseURI);
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${asset.url} returned ${response.status}`);

    await response.arrayBuffer();
    progress.actual += asset.size / manifest.totalBytes;
  }));
}

function renderProgress(loader, ratio) {
  const filled = Math.round(ratio * BAR_SIZE);
  loader.querySelector('[data-loader-bar]').textContent =
    `${'█'.repeat(filled)}${'░'.repeat(BAR_SIZE - filled)}`;
}

function animateProgress(loader, progress) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderProgress(loader, 1);
    return Promise.resolve();
  }

  const startedAt = performance.now();

  return new Promise(resolve => {
    function draw(now) {
      const elapsed = Math.min(1, (now - startedAt) / BOOT_TIME);
      const smoothTime = elapsed * elapsed * (3 - 2 * elapsed);
      const target = Math.min(progress.actual, smoothTime);
      progress.visible += (target - progress.visible) * 0.15;

      if (progress.done && elapsed === 1 && progress.visible > 0.995) {
        renderProgress(loader, 1);
        resolve();
      } else {
        renderProgress(loader, progress.visible);
        requestAnimationFrame(draw);
      }
    }

    requestAnimationFrame(draw);
  });
}

async function dismissLoader(loader) {
  document.documentElement.classList.remove('archive-loading');
  loader.classList.add('is-complete');
  await wait(320);
  loader.hidden = true;
}

export async function prepareArchive() {
  const loader = document.getElementById('archive-loader');

  try {
    const manifest = await fetchManifest();
    const progress = { actual: 0, visible: 0, done: false };
    const animation = animateProgress(loader, progress);

    try {
      await syncArchive(manifest, progress);
    } catch (error) {
      console.warn('Archive sync skipped:', error);
    }

    progress.actual = 1;
    progress.done = true;
    await animation;
    await wait(420);
  } catch (error) {
    console.warn('Archive sync skipped:', error);
  }

  await dismissLoader(loader);
}
