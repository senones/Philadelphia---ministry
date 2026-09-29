/**
 * Convert Site Data backgroundImagePosition to a CSS object-position value.
 * Numbers are vertical percentages (site-modules backgroundPosition.ts).
 */
export function getObjectPositionCssValue(position) {
	if (typeof position === 'number') {
		return `center ${position}%`;
	}

	if (typeof position === 'string' && position) {
		return position;
	}

	return 'center';
}
