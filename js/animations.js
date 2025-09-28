import { animate, stagger, text } from './lib/anime.esm.js'

export function initHomeAnime() {
  const divs = document.querySelectorAll('#home-start, #posts-list');

  divs.forEach(node => {
    animate(node, {
      y: {
        from: '1rem',
        to: '0rem',
      },
      opacity: {
        from: 0,
        to: 1,
        ease: 'inOut',
      },
      delay: 1000
    });
  });

  const sections = document.querySelectorAll('#home section');

  sections.forEach(node => {
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
    let hex = borderColor.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    animate(node, {
      borderBottom: {
        from: `1px solid rgba(${r},${g},${b},0)`,
        to: `1px solid rgba(${r},${g},${b},1)`,
        ease: 'out(3)',
      },
      delay: 1000,
    });
  });
}

export function updateBorderColors() {
  const sections = document.querySelectorAll('#home section');
  const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
  sections.forEach(node => {
    node.style.borderBottom = `1px solid ${borderColor}`;
  });
}

export function initNavAnime() {
  const aTags = document.querySelectorAll('header a');

  let allChars = [];
  aTags.forEach(node => {
    const { chars } = text.split(node, {
      chars: { wrap: 'clip' },
    });
    allChars = allChars.concat(chars);
  });

  animate(allChars, {
    y: {
      from: '100%',
      to: '0%',
      ease: 'out(3)',
    },
    duration: 1000,
    delay: stagger(15, { start: 100 }),
  });

  const $button = document.querySelector('header button')
  animate($button, {
    opacity: {
      from: 0,
      to: 1,
    },
    duration: 3000,
  });
}

export function initPostDetailAnime() {
  const circle = document.querySelector('.post-circle');
  const postBody = document.querySelector('.post-body');

  window.addEventListener('scroll', () => {
    const rect = postBody.getBoundingClientRect();
    let progress;
    if (rect.top > 0) {
      progress = 0;
    } else {
      const targetTop = window.innerHeight - rect.height; // When bottom becomes visible
      const distanceToTravel = Math.abs(targetTop); // Distance from 0 to targetTop
      const currentDistance = Math.abs(rect.top);
      progress = Math.min(1, currentDistance / distanceToTravel);
    }

    animate(circle, {
      opacity: progress,
      duration: 100,
    });
  });
}
