import { initAboutTheme } from '../theme.js';
import { makeLinksExternal, wrapNerdIcons } from '../utils.js';
import { icons } from '../icons.js';

const SOCIAL_LINKS = {
  github: 'https://github.com/saipr0',
  twitter: 'https://twitter.com/saipr_',
  linkedin: 'https://linkedin.com/in/sai-prabhat',
  email: 'saiprabhat@pm.me'
};

export async function loadAbout() {
  const r = await fetch('./content/about.md');
  const markdown = await r.text();

  const htmlContent = marked.parse(markdown);
  document.getElementById('about-content').innerHTML = `
    <img id="about-banner" class="def-img" src="" alt="">
    <div class="post-body">${htmlContent}</div>
    ${socials}
  `;

  initAboutTheme();
  wrapNerdIcons(document.getElementById('about-content'));
  makeLinksExternal('#about-content');
}

const socials = `
<div class="socials-links">
	<a class="social-link" href="content/Resume-Sai-Prabhat-Gubbala.pdf" download="Resume-Sai-Prabhat-Gubbala.pdf" aria-label="Download resume" title="Download resume">
		${icons.resume}
	</a>
	<a class="social-link" href="${SOCIAL_LINKS.github}" target="_blank" rel="noopener noreferrer">
		${icons.github}
	</a>
	<a class="social-link" href="mailto:${SOCIAL_LINKS.email}">
		${icons.email}
	</a>
	<a class="social-link" href="${SOCIAL_LINKS.twitter}" target="_blank" rel="noopener noreferrer">
		${icons.twitter}
	</a>
	<a class="social-link" href="${SOCIAL_LINKS.linkedin}" target="_blank" rel="noopener noreferrer">
		${icons.linkedin}
	</a>
</div>
`;
