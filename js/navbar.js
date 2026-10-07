export function createNavbar() {
  return `
    <header>
      <a class="site-banner" href="#home">
        <span><span class="prompt-user">sai</span>@<span class="prompt-host">retrospective</span>:<span class="prompt-path">~</span>$&nbsp;<span class="archive-cursor prompt-root">_</span></span>
        <span class="logo" aria-hidden="true"></span>
      </a>
    </header>
    <nav class="site-nav" aria-label="Primary navigation">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <button id="theme-toggle" class="btn btn-icon" type="button"></button>
    </nav>
  `;
}

export function initNavbar() {
  document.body.insertAdjacentHTML('afterbegin', createNavbar());
}
