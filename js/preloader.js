const MANIFEST_URL = 'js/data/archive-manifest.json';
const BOOT_TIME = 2400;
const BAR_SIZE = 28;
const PHASES = [
  'reading archive index',
  'mapping notes and metadata',
  'buffering image archive',
  'warming local cache',
  'verifying archive checksum'
];

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const formatBytes = bytes => bytes < 1024 * 1024
  ? `${Math.round(bytes / 1024)} KiB`
  : `${(bytes / 1024 / 1024).toFixed(1)} MiB`;

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

function renderProgress(loader, manifest, ratio) {
  const percentage = Math.round(ratio * 100);
  const filled = Math.round(ratio * BAR_SIZE);
  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor(ratio * PHASES.length))];

  loader.querySelector('[data-loader-bar]').textContent =
    `[${'█'.repeat(filled)}${'░'.repeat(BAR_SIZE - filled)}]`;
  loader.querySelector('[data-loader-percent]').textContent =
    `${String(percentage).padStart(3, '0')}%`;
  loader.querySelector('[data-loader-count]').textContent =
    `${Math.round(manifest.assets.length * ratio)}/${manifest.assets.length} files`;
  loader.querySelector('[data-loader-bytes]').textContent =
    `${formatBytes(manifest.totalBytes * ratio)} / ${formatBytes(manifest.totalBytes)}`;
  loader.querySelector('[data-loader-file]').textContent = ratio === 1 ? 'archive ready' : phase;
}

function animateProgress(loader, manifest, progress) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderProgress(loader, manifest, 1);
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
        renderProgress(loader, manifest, 1);
        resolve();
      } else {
        renderProgress(loader, manifest, progress.visible);
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
    const animation = animateProgress(loader, manifest, progress);
    let syncComplete = true;

    try {
      await syncArchive(manifest, progress);
    } catch (error) {
      syncComplete = false;
      console.warn('Archive sync skipped:', error);
    }

    progress.actual = 1;
    progress.done = true;
    await animation;

    loader.querySelector('[data-loader-status]').textContent =
      syncComplete ? 'SYNC COMPLETE' : 'SYNC PARTIAL';
    await wait(420);
  } catch (error) {
    console.warn('Archive sync skipped:', error);
  }

  await dismissLoader(loader);
}
