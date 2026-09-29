import React from 'react';
import './styles/global.css';
import SiteFonts from './SiteFonts.jsx';

function styleObjectToRootCss(style) {
	if (!style || typeof style !== 'object') {
		return '';
	}

	const declarations = Object.entries(style)
		.filter(([, value]) => value !== undefined && value !== null && value !== '')
		.map(([key, value]) => `\t${key}: ${value};`)
		.join('\n');

	if (!declarations) {
		return '';
	}

	return `:root {\n${declarations}\n}`;
}

export default function Page({
	pageId,
	locale,
	style,
	googleFontsHref,
	customFontsCss,
	children,
}) {
	const rootCss = styleObjectToRootCss(style);

	return (
		<main className="page" style={style} data-page-id={pageId} data-locale={locale}>
			{rootCss ? (
				<style data-builder-page-vars="true">{rootCss}</style>
			) : null}
			<SiteFonts
				googleFontsHref={googleFontsHref}
				customFontsCss={customFontsCss}
			/>
			{children}
		</main>
	);
}
