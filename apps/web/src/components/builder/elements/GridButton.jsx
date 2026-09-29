import React from 'react';
import SmartLink from '../SmartLink.jsx';

export default function GridButton({
	id,
	text = '',
	type = 'primary',
	href = '#',
	target = '_self',
	rel,
	buttonType = 'button',
	tagName = 'a',
	isDisabled = false,
	isLoading = false,
	onClick,
	fontFamily,
	fontWeight,
	borderRadius,
	borderWidth,
	backgroundColor,
	fontColor,
	borderColor,
	backgroundColorHover,
	fontColorHover,
	borderColorHover,
	fontSizeDesktop,
	fontSizeMobile,
	mobileWidthVw = '100%',
	mobileHeightVw = 'min-content',
}) {
	const Tag = tagName === 'button' ? 'button' : 'a';

	const style = {
		'--font-size-mobile': fontSizeMobile != null ? `${fontSizeMobile}px` : undefined,
		'--font-size-desktop': fontSizeDesktop != null ? `${fontSizeDesktop}px` : undefined,
		'--font-family': fontFamily || undefined,
		'--font-weight': fontWeight || undefined,
		'--border-radius': borderRadius === 0 || borderRadius
			? `${borderRadius}px`
			: undefined,
		'--border-width': borderWidth === 0 || borderWidth
			? `${borderWidth}px`
			: '0px',
		'--background-color': backgroundColor || undefined,
		'--font-color': fontColor || undefined,
		'--border-color': borderColor || 'rgb(26, 26, 26)',
		'--background-color-hover': backgroundColorHover || undefined,
		'--font-color-hover': fontColorHover || undefined,
		'--border-color-hover': borderColorHover || undefined,
		'--m-width': mobileWidthVw,
		'--m-height': mobileHeightVw,
	};

	const className = [
		'grid-button',
		`grid-button--${type}`,
		!text ? 'grid-button--empty' : '',
		isLoading ? 'loading' : '',
	].filter(Boolean).join(' ');

	const sharedProps = {
		id,
		className,
		style,
		'data-element-id': id,
		'aria-hidden': isLoading || undefined,
		disabled: Tag === 'button' ? isDisabled : undefined,
		onClick,
	};

	if (Tag === 'button') {
		return (
			<button type={buttonType} {...sharedProps}>
				{text}
			</button>
		);
	}

	return (
		<SmartLink
			{...sharedProps}
			href={isDisabled ? undefined : href}
			target={target}
			rel={rel}
		>
			{text}
		</SmartLink>
	);
}
