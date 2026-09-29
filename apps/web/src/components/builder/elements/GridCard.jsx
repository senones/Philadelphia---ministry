import React from 'react';

export default function GridCard({
	id,
	content,
	background = 'rgb(255, 255, 255)',
	border = '1px solid rgb(0, 0, 0)',
	borderRadius = '12px',
	boxShadow = 'none',
	opacity = '1',
	height = '100%',
}) {
	const style = {
		'--card-bg': background,
		'--card-border': border,
		'--card-border-radius': borderRadius,
		'--card-box-shadow': boxShadow,
		'--card-opacity': opacity,
		'--card-height': height,
		width: '100%',
		height: 'var(--card-height, 100%)',
		background: 'var(--card-bg)',
		border: 'var(--card-border)',
		borderRadius: 'var(--card-border-radius)',
		boxShadow: 'var(--card-box-shadow)',
		opacity: 'var(--card-opacity)',
		boxSizing: 'border-box',
	};

	if (content) {
		return (
			<div
				className="grid-card"
				data-element-id={id}
				style={style}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		);
	}

	return (
		<div
			className="grid-card"
			data-element-id={id}
			style={style}
		/>
	);
}
