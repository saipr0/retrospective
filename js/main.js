import { initNavbar } from './navbar.js';
import { initTheme } from './theme.js';
import { prepareArchive } from './preloader.js';
import { startRouter } from './router.js';

initNavbar();
initTheme();
await prepareArchive();
await startRouter();
