export function createNavbar() {
  return `
    <header>
      <a class="site-banner" href="#home">retrospective // sai prabhat gubbala</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <button id="theme-toggle" class="btn btn-icon" type="button"></button>
      </nav>
    </header>
  `;
}

export function initNavbar() {
  document.body.insertAdjacentHTML('afterbegin', createNavbar());
}
