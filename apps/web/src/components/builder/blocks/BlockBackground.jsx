import React from 'react';
import { getObjectPositionCssValue } from './backgroundPosition.js';

const getGradientCss = (gradient) => {
	if (!gradient) {
		return null;
	}

	const angle = gradient.angle ?? 0;
	const colors = Array.isArray(gradient.colors) ? gradient.colors : [];
	const stops = colors
		.map((stop) => {
			if (typeof stop === 'string') {
				return stop;
			}

			const color = stop?.color || stop?.value || '';
			const position = stop?.position != null ? ` ${stop.position}%` : '';

			return `${color}${position}`;
		})
		.filter(Boolean)
		.join(', ');

	if (!stops) {
		return null;
	}

	return `linear-gradient(${angle}deg, ${stops})`;
};

export default function BlockBackground({
	background,
	isFixed = false,
	backgroundImagePosition = 'center',
}) {
	if (!background) {
		return null;
	}

	const type = background.current || 'color';
	const overlayOpacity = background['overlay-opacity'];
	const isImage = type === 'image';
	const isVideo = type === 'video';
	const isGradient = type === 'gradient';

	let backgroundColor = 'transparent';

	if (type === 'color') {
		backgroundColor = background.color || 'transparent';
	} else if (isGradient) {
		backgroundColor = getGradientCss(background.gradient) || 'transparent';
	}

	const src = isVideo
		? background.video?.videoSrc || background.videoSrc
		: background.src || background.image || background.path;

	const poster = background.video?.videoThumbnailSrc;
	const showOverlay = (isImage || isVideo) && overlayOpacity != null && overlayOpacity !== '';

	const className = [
		'block-background',
		isFixed ? 'block-background--fixed' : '',
	].filter(Boolean).join(' ');

	return (
		<div className={className} style={{ background: backgroundColor }}>
			{isImage && src ? (
				<img
					className={['block-background__media', isFixed ? 'block-background__media--fixed' : ''].filter(Boolean).join(' ')}
					src={src}
					srcSet={background.srcset || undefined}
					sizes={background.srcset ? '100vw' : undefined}
					alt={background.alt || ''}
					loading={isFixed ? 'eager' : 'lazy'}
					style={{ objectPosition: getObjectPositionCssValue(backgroundImagePosition) }}
				/>
			) : null}
			{isVideo && src ? (
				<video
					className={['block-background__media', isFixed ? 'block-background__media--fixed' : ''].filter(Boolean).join(' ')}
					src={src}
					poster={poster}
					autoPlay
					muted
					loop
					playsInline
				/>
			) : null}
			{showOverlay ? (
				<div
					className="block-background__overlay"
					style={{ opacity: overlayOpacity }}
				/>
			) : null}
		</div>
	);
}
