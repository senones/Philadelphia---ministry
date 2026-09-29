import React, {
	useState,
} from 'react';
import SmartLink from '../SmartLink.jsx';
import '../styles/grid-image.css';

export default function GridImage({
	id,
	className = '',
	src = '',
	srcset = '',
	alt = '',
	objectFit = 'cover',
	desktopWidth,
	desktopHeight,
	mobileWidth,
	desktopBorderRadius = 0,
	mobileBorderRadius = 0,
	isOverflowVisible = false,
	shapeMaskSource,
	href,
	target = '_self',
	rel,
}) {
	const [isLoaded, setIsLoaded] = useState(false);

	const style = {
		'--grid-image-border-radius': typeof desktopBorderRadius === 'number'
			? `${desktopBorderRadius}px`
			: desktopBorderRadius,
		'--grid-image-border-radius-m': typeof mobileBorderRadius === 'number'
			? `${mobileBorderRadius}px`
			: mobileBorderRadius,
		'--grid-image-object-fit': objectFit,
		...(isOverflowVisible ? {
			'--grid-image-overflow': 'visible',
		} : null),
		// Unencoded mask SVGs carry double quotes, so url() must be single-quoted.
		...(shapeMaskSource ? {
			'--grid-image-mask': `url('${shapeMaskSource}')`,
		} : null),
	};

	const image = src ? (
		<img
			className="grid-image__image"
			src={src}
			srcSet={srcset || undefined}
			alt={alt}
			loading="lazy"
			width={desktopWidth || undefined}
			height={desktopHeight || undefined}
			sizes={desktopWidth
				? `(min-width: 920px) ${desktopWidth}px, ${mobileWidth || desktopWidth}px`
				: undefined}
			onLoad={() => setIsLoaded(true)}
		/>
	) : null;

	const rootClassName = [
		'grid-image',
		isLoaded ? 'loaded' : '',
		className,
	].filter(Boolean).join(' ');

	const sharedProps = {
		className: rootClassName,
		'data-element-id': id,
		'data-animation-role': 'image',
		style,
	};

	if (href) {
		return (
			<SmartLink
				{...sharedProps}
				href={href}
				target={target}
				rel={rel}
			>
				{image}
			</SmartLink>
		);
	}

	return (
		<div {...sharedProps}>
			{image}
		</div>
	);
}
