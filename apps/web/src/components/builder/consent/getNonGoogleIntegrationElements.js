import { ELEMENT_DATA_ATTRIBUTE } from './addDomElements';
import {
	facebookPixelNoScript,
	facebookPixelScript,
	hotjarScript,
} from './integrationScripts';

function mapToElements(integrationElements) {
	return Object.entries(integrationElements)
		.map(([
			elementKey,
			{
				tagName,
				properties = {},
				children = [],
			},
		]) => ({
			type: 'element',
			tagName,
			properties: {
				...properties,
				[ELEMENT_DATA_ATTRIBUTE]: elementKey,
			},
			children,
		}));
}

export function getMarketingIntegrationElements({ siteMeta }) {
	const integrationElements = {};

	if (siteMeta.facebookPixel) {
		integrationElements['noscript-fb-pixel'] = {
			tagName: 'noscript',
			children: [
				{
					type: 'text',
					value: facebookPixelNoScript(siteMeta.facebookPixel),
				},
			],
		};

		integrationElements['script-fb-pixel'] = {
			tagName: 'script',
			children: [
				{
					type: 'text',
					value: facebookPixelScript(siteMeta.facebookPixel),
				},
			],
		};
	}

	return mapToElements(integrationElements);
}

export function getAnalyticsIntegrationElements({ siteMeta }) {
	const integrationElements = {};

	if (siteMeta.hotjar) {
		integrationElements['script-hotjar'] = {
			tagName: 'script',
			children: [
				{
					type: 'text',
					value: hotjarScript(siteMeta.hotjar),
				},
			],
		};
	}

	return mapToElements(integrationElements);
}

export function getNonGoogleIntegrationElements({ siteMeta }) {
	return [
		...getMarketingIntegrationElements({ siteMeta }),
		...getAnalyticsIntegrationElements({ siteMeta }),
	];
}
