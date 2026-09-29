import React from 'react';

export default function GridShape({
	id,
	svg = '',
	color = 'currentColor',
	shape,
	borderRadius,
	height,
}) {
	const style = {
		'--shape-color': color,
		'--shape-height': height != null ? `${height}px` : '100%',
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: 'var(--shape-height, 100%)',
		overflow: 'hidden',
		color: 'var(--shape-color)',
	};

	if (svg) {
		return (
			<div
				className="grid-shape"
				data-element-id={id}
				data-shape={shape || undefined}
				style={style}
			>
				<style>
					{`
						.grid-shape[data-element-id="${id}"] svg {
							width: 100%;
							height: 100%;
							fill: var(--shape-color);
						}
					`}
				</style>
				<span
					style={{ display: 'contents' }}
					dangerouslySetInnerHTML={{ __html: svg }}
				/>
			</div>
		);
	}

	return (
		<div
			className="grid-shape"
			data-element-id={id}
			data-shape={shape || undefined}
			style={{
				...style,
				background: color,
				borderRadius: borderRadius != null ? `${borderRadius}px` : undefined,
			}}
		/>
	);
}
