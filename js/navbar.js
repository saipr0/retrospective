export function createNavbar() {
  return `
    <header>
      <h3><a href="#home">Sai Prabhat Gubbala</a></h3>
      <nav>
        <a href="#about">About</a>
        <button id="theme-toggle" class="btn btn-icon"></button>
      </nav>
    </header>
  `;
}

export function initNavbar() {
  document.body.insertAdjacentHTML('afterbegin', createNavbar());
}
