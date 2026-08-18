const siteCursor = document.querySelector('.site-cursor');
const clickableSelector = 'a, button';

export const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  const isHoveringClickable = Boolean(e.target.closest(clickableSelector));

  siteCursor.classList.toggle('is-hovering', isHoveringClickable);
  siteCursor.style.transform = `translate3d(${mouseX - 11}px, ${mouseY - 9}px, 0)`
}
