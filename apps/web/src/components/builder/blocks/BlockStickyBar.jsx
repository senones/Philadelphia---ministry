import React from 'react';

export default function BlockStickyBar({
	items = [],
	isHiddenDesktop = false,
	isHiddenMobile = false,
	style = {},
}) {
	if (!items.length) {
		return null;
	}

	const className = [
		'block-sticky-bar',
		isHiddenDesktop ? 'block-sticky-bar--hidden-desktop' : '',
		isHiddenMobile ? 'block-sticky-bar--hidden-mobile' : '',
	].filter(Boolean).join(' ');

	return (
		<div className={className} style={style}>
			{items.map((item, index) => (
				<div
					// Items are static baked content; index key is stable.
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					className="block-sticky-bar__item text-box"
					dangerouslySetInnerHTML={{ __html: item.content }}
				/>
			))}
		</div>
	);
}
