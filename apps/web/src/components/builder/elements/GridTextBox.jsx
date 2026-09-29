import React from 'react';

export default function GridTextBox({
	id,
	content = '',
	textAlign = null,
	textAlignMobile,
	backgroundColor,
}) {
	const resolvedTextAlignMobile = textAlignMobile || textAlign;
	const whiteSpace = textAlign === 'justify' ? 'normal' : 'break-spaces';
	const whiteSpaceMobile = resolvedTextAlignMobile === 'justify' ? 'normal' : whiteSpace;

	const style = {
		'--white-space': whiteSpace,
		'--white-space-mobile': whiteSpaceMobile,
		backgroundColor,
		textAlign: textAlign || undefined,
	};

	return (
		<div
			className="text-box"
			data-element-id={id}
			style={style}
			dangerouslySetInnerHTML={content ? { __html: content } : undefined}
		/>
	);
}
