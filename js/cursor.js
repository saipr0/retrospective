const siteCursor = document.querySelector('.site-cursor');
const clickableSelector = 'a, button';

export const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  const isHoveringClickable = Boolean(e.target.closest(clickableSelector));

  siteCursor.classList.toggle('is-hovering', isHoveringClickable);
  siteCursor.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 7}px, 0)`
}
