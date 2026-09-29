import React, {
	useEffect,
	useRef,
} from 'react';

function activateAnimationTarget(target) {
	if (!target) {
		return;
	}

	target.setAttribute('data-animation-state', 'active');
}

export default function LayoutElement({
	elementId,
	className,
	style,
	hasRotationFrame = false,
	hasEntranceAnimation = false,
	children,
}) {
	const rootRef = useRef(null);

	useEffect(() => {
		if (!hasEntranceAnimation || typeof IntersectionObserver === 'undefined') {
			return undefined;
		}

		const root = rootRef.current;
		if (!root) {
			return undefined;
		}

		const isRootHidden = className?.includes('transition--root-hidden');
		const targets = isRootHidden
			? [
				...root.querySelectorAll('[data-animation-role="image"]'),
				...root.querySelectorAll('[data-animation-role="block-element"]'),
			]
			: [root];

		if (!targets.length) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						entry.target.removeAttribute('data-animation-state');
						return;
					}

					observer.unobserve(entry.target);
					activateAnimationTarget(entry.target);
				});
			},
			{
				threshold: 0,
			},
		);

		targets.forEach((target) => observer.observe(target));

		return () => {
			observer.disconnect();
		};
	}, [hasEntranceAnimation, className]);

	return (
		<div
			ref={rootRef}
			className={className}
			style={style}
			data-element-id={elementId}
		>
			{hasRotationFrame ? (
				<div className="layout-element__rotation-frame">
					{children}
				</div>
			) : children}
		</div>
	);
}
