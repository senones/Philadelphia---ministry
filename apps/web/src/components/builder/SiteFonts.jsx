import {
	useEffect,
} from 'react';

export default function SiteFonts({
	googleFontsHref,
	customFontsCss,
}) {
	useEffect(() => {
		if (!googleFontsHref) {
			return undefined;
		}

		const existing = document.querySelector('link[data-builder-fonts="google"]');

		if (existing) {
			existing.setAttribute('href', googleFontsHref);
			return undefined;
		}

		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = googleFontsHref;
		link.setAttribute('data-builder-fonts', 'google');
		document.head.appendChild(link);

		return () => {
			link.remove();
		};
	}, [googleFontsHref]);

	useEffect(() => {
		if (!customFontsCss) {
			return undefined;
		}

		const style = document.createElement('style');
		style.setAttribute('data-builder-fonts', 'custom');
		style.textContent = customFontsCss;
		document.head.appendChild(style);

		return () => {
			style.remove();
		};
	}, [customFontsCss]);

	return null;
}
