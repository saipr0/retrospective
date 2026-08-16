export function makeLinksExternal(container) {
  const selector = container ? `${container} a[href^="http"]` : 'a[href^="http"]';
  document.querySelectorAll(selector).forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}

export function formatPublishDate(publishDate) {
  const match = publishDate.match(/^(\d{4})\s*•\s*(\d{2})$/);
  return match ? `${match[2]}.${match[1].slice(-2)}` : publishDate;
}

export function wrapNerdIcons(root) {
  const iconPattern = /[\uE000-\uF8FF]/;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    if (iconPattern.test(walker.currentNode.textContent)) {
      textNodes.push(walker.currentNode);
    }
  }

  textNodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    const parts = node.textContent.split(/([\uE000-\uF8FF])/);

    parts.forEach(part => {
      if (!part) return;

      if (iconPattern.test(part)) {
        const icon = document.createElement('span');
        icon.className = 'nerd-icon-inline';
        icon.textContent = part;
        fragment.appendChild(icon);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });

    node.parentNode.replaceChild(fragment, node);
  });
}
