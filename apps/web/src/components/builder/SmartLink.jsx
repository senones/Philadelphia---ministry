import React from 'react';
import { Link } from 'react-router-dom';

export function isInternalHref(href) {
	if (!href || typeof href !== 'string') {
		return false;
	}

	if (href.startsWith('//')) {
		return false;
	}

	return href.startsWith('/');
}

/**
 * SPA-aware link: internal paths use react-router Link; external / mailto / tel / hash stay as <a>.
 */
export default function SmartLink({
	href = '#',
	to,
	target,
	rel,
	children,
	...rest
}) {
	const destination = to ?? href;
	const openInNewTab = Boolean(target) && target !== '_self';

	if (!openInNewTab && isInternalHref(destination)) {
		return (
			<Link to={destination} {...rest}>
				{children}
			</Link>
		);
	}

	return (
		<a
			href={destination}
			target={target}
			rel={rel}
			{...rest}
		>
			{children}
		</a>
	);
}
