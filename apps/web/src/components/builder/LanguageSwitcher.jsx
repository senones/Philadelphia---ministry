import React from 'react';
import SmartLink from './SmartLink.jsx';

const FLAG_CDN_BASE = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/4x3';

function Flag({ flagPath, alt }) {
	if (!flagPath) {
		return null;
	}

	return (
		<img
			className="language-switcher__flag"
			src={`${FLAG_CDN_BASE}/${flagPath}`}
			alt={alt || ''}
			loading="lazy"
			width="20"
			height="15"
		/>
	);
}

export default function LanguageSwitcher({
	currentLocale,
	languages = [],
}) {
	if (!languages.length) {
		return null;
	}

	const current = languages.find((language) => language.locale === currentLocale)
		|| languages[0];

	return (
		<div className="language-switcher">
			<button
				type="button"
				className="language-switcher__button"
				aria-haspopup="true"
			>
				<Flag flagPath={current.flagPath} alt={current.name} />
				<span className="language-switcher__locale">
					{(current.locale || '').toUpperCase()}
				</span>
				<svg
					className="language-switcher__icon"
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						d="M1 1L5 5L9 1"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<div className="language-switcher__dropdown-area">
				<ul className="language-switcher__dropdown">
					{languages.map((language) => (
						<li
							key={language.locale}
							className="language-switcher__dropdown-item"
						>
							<SmartLink
								className="language-switcher__dropdown-link"
								href={language.href}
								aria-current={language.locale === currentLocale ? 'true' : undefined}
							>
								<Flag flagPath={language.flagPath} alt={language.name} />
								<span>{language.name}</span>
							</SmartLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
