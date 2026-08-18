import { initNavbar } from './navbar.js';
import { initTheme } from './theme.js';
import { prepareArchive } from './preloader.js';
import { startRouter } from './router.js';
import { moveCursor } from './cursor.js';

initNavbar();
initTheme();
await prepareArchive();
await startRouter();

window.addEventListener('mousemove', moveCursor)
