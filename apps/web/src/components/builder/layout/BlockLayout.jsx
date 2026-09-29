import React from 'react';
import BlockBackground from '../blocks/BlockBackground.jsx';

export default function BlockLayout({
	blockId,
	htmlId,
	className = 'block-layout block-layout--layout',
	blockClassName = 'block',
	style,
	background,
	isFixed = false,
	backgroundImagePosition,
	children,
}) {
	return (
		<section
			id={htmlId || blockId}
			className={blockClassName}
			style={style}
			data-block-id={blockId}
		>
			{background ? (
				<BlockBackground
					background={background}
					isFixed={isFixed}
					backgroundImagePosition={backgroundImagePosition}
				/>
			) : null}
			<div className={className}>
				{children}
			</div>
		</section>
	);
}
