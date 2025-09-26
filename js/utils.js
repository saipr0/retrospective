export function makeLinksExternal(container) {
  const selector = container ? `${container} a[href^="http"]` : 'a[href^="http"]';
  document.querySelectorAll(selector).forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}
