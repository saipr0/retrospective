export function runOpener() {
  return new Promise(resolve => {
    const now   = new Date();
    const days  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const pad   = n => String(n).padStart(2, '0');

    const dateLine = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}  ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const greeting = 'Hello World.';

    const overlay = document.createElement('div');
    overlay.id = 'opener';
    overlay.innerHTML = `
      <div id="terminal-window">
        <div id="terminal-header">retro-spective</div>
        <div id="terminal-body">
          <div class="term-line"><span id="term-date"></span></div>
          <div class="term-line" id="term-greeting-line">
            <span id="term-greeting"></span><span class="cursor">&#x2588;</span>
          </div>
        </div>
      </div>
      <div id="enter-prompt">press enter to continue</div>`;
    document.body.appendChild(overlay);

    document.getElementById('term-greeting-line').style.visibility = 'hidden';

    function typeText(el, text, speed, cb) {
      let i = 0;
      const t = setInterval(() => {
        el.textContent += text[i++];
        if (i === text.length) { clearInterval(t); cb && cb(); }
      }, speed);
    }

    function done() {
      document.removeEventListener('keydown', onKey);
      const win    = document.getElementById('terminal-window');
      const prompt = document.getElementById('enter-prompt');
      win.style.transition    = 'opacity 0.3s ease';
      win.style.opacity       = '0';
      prompt.style.transition = 'opacity 0.3s ease';
      prompt.style.opacity    = '0';
      setTimeout(() => { overlay.remove(); resolve(); }, 300);
    }

    function onKey(e) { if (e.key === 'Enter') done(); }

    typeText(document.getElementById('term-date'), dateLine, 40, () => {
      setTimeout(() => {
        document.getElementById('term-greeting-line').style.visibility = 'visible';
        typeText(document.getElementById('term-greeting'), greeting, 80, () => {
          document.getElementById('enter-prompt').classList.add('visible');
          document.addEventListener('keydown', onKey);
          overlay.addEventListener('click', done, { once: true });
        });
      }, 400);
    });
  });
}
