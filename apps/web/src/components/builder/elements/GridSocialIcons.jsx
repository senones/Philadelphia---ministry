import React from 'react';

function toCssSize(value, fallback) {
	if (value == null || value === '') {
		return fallback;
	}
	return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Match site-modules GridSocialIcons: flex row/column with
 * justify-content from --icon-spacing and spacing via link padding.
 */
export default function GridSocialIcons({
	id,
	links = [],
	direction = 'row',
	directionMobile = null,
	iconSize,
	iconColor,
	iconColorHover,
	spaceBetweenIcons,
	iconSpacing,
	preventSpacing = false,
	fullHeight = false,
	className = '',
	style: styleProp,
}) {
	const resolvedDirection = direction === 'column' ? 'column' : 'row';
	const resolvedMobileDirection = directionMobile === 'column' || directionMobile === 'row'
		? directionMobile
		: resolvedDirection;

	const style = {
		'--icon-direction': resolvedDirection,
		'--m-icon-direction': resolvedMobileDirection,
		'--icon-padding-vertical': resolvedDirection === 'column' ? 'var(--space-between-icons)' : '0',
		'--icon-padding-horizontal': resolvedDirection === 'row' ? 'var(--space-between-icons)' : '0',
		...(resolvedMobileDirection
			? {
				'--m-icon-padding-vertical': resolvedMobileDirection === 'column' ? 'var(--space-between-icons)' : '0',
				'--m-icon-padding-horizontal': resolvedMobileDirection === 'row' ? 'var(--space-between-icons)' : '0',
			}
			: null),
		...(spaceBetweenIcons
			? { '--space-between-icons': toCssSize(spaceBetweenIcons) }
			: null),
		...(preventSpacing ? { '--space-between-icons': '0px' } : null),
		...(iconSpacing ? { '--icon-spacing': iconSpacing } : null),
		...(iconSize != null && iconSize !== ''
			? { '--icon-size': toCssSize(iconSize, '25px') }
			: null),
		...(iconColor ? { '--icon-color': iconColor } : null),
		...(iconColorHover ? { '--icon-color-hover': iconColorHover } : null),
		...(fullHeight ? { height: '100%' } : null),
		...styleProp,
	};

	const rootClassName = [
		'social-icons',
		`social-icons--${resolvedDirection}`,
		className,
	].filter(Boolean).join(' ');

	return (
		<div
			className={rootClassName}
			data-element-id={id}
			style={style}
		>
			{(Array.isArray(links) ? links : []).map((link, index) => {
				const href = link?.href || link?.link || '#';
				const label = link?.label || link?.icon || `social-${index}`;
				const svg = link?.svg;

				return (
					<a
						key={`${id || 'social'}-${label}-${index}`}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						title={`Go to ${label} page`}
						aria-label={label}
						className="social-icons__link"
					>
						{svg ? (
							<span
								className="social-icons__svg"
								dangerouslySetInnerHTML={{ __html: svg }}
							/>
						) : (
							<span>{label}</span>
						)}
					</a>
				);
			})}
		</div>
	);
}
