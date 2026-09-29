import { ELEMENT_DATA_ATTRIBUTE } from './addDomElements';
import {
	googleAnalyticsScript,
	googleAnalyticsScriptAsync,
	googleConsentDefaultScript,
	googleTagManagerNoScript,
	googleTagManagerScript,
} from './integrationScripts';

export function getGoogleIntegrationElements({ siteMeta, shouldSetConsentDefault = false }) {
	const integrationElements = {};

	if (shouldSetConsentDefault) {
		integrationElements['script-consent-default'] = {
			tagName: 'script',
			children: [
				{
					type: 'text',
					value: googleConsentDefaultScript(),
				},
			],
		};
	}

	if (siteMeta.googleTagManager) {
		integrationElements['noscript-gtm'] = {
			tagName: 'noscript',
			children: [
				{
					type: 'text',
					value: googleTagManagerNoScript(siteMeta.googleTagManager),
				},
			],
		};

		integrationElements['script-gtm'] = {
			tagName: 'script',
			children: [
				{
					type: 'text',
					value: googleTagManagerScript({
						containerId: siteMeta.googleTagManager,
					}),
				},
			],
		};
	}

	const gtagLoaderId = siteMeta.googleAnalytics || siteMeta.googleTag || siteMeta.googleAdsIds?.[0];

	if (gtagLoaderId) {
		integrationElements['script-google-analytics'] = {
			tagName: 'script',
			children: [
				{
					type: 'text',
					value: googleAnalyticsScript({
						containerId: siteMeta.googleAnalytics,
						googleTag: siteMeta.googleTag,
						googleAdsIds: siteMeta.googleAdsIds || [],
					}),
				},
			],
		};

		integrationElements['script-google-analytics-async'] = {
			tagName: 'script',
			properties: {
				src: googleAnalyticsScriptAsync(gtagLoaderId),
			},
		};
	}

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
