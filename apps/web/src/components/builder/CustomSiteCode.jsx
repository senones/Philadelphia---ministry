import {
	useEffect,
} from 'react';
import {
	customBodyHtml,
	customHeadHtml,
} from '@/data/customCode';

const MARKER = 'data-builder-custom-code';

function appendHtml(html, target, slot) {
	if (!html || !target) {
		return;
	}

	if (target.querySelector(`[${MARKER}="${slot}"]`)) {
		return;
	}

	const template = document.createElement('template');
	template.innerHTML = html;

	const fragment = document.createDocumentFragment();

	for (const node of [...template.content.childNodes]) {
		if (node.nodeName === 'SCRIPT') {
			const script = document.createElement('script');
			for (const attribute of node.attributes) {
				script.setAttribute(attribute.name, attribute.value);
			}
			script.text = node.textContent || '';
			script.setAttribute(MARKER, slot);
			fragment.appendChild(script);
			continue;
		}

		if (node.nodeType === Node.ELEMENT_NODE) {
			node.setAttribute(MARKER, slot);
		}

		fragment.appendChild(node);
	}

	target.appendChild(fragment);
}

/**
 * Inject site-wide custom head/body HTML from meta.customMeta once per app load.
 * Scripts are re-created so browsers execute them (innerHTML alone does not).
 */
export default function CustomSiteCode() {
	useEffect(() => {
		appendHtml(customHeadHtml, document.head, 'head');
		appendHtml(customBodyHtml, document.body, 'body');
	}, []);

	return null;
}
