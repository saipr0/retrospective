export function createNavbar() {
  return `
    <header>
      <a class="site-banner" href="#home">
        <span class="logo" aria-hidden="true"></span>
        <span>retrospective <span>//</span> sai prabhat</span>
      </a>
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
