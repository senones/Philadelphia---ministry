import {
	useEffect,
	useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { addElementsToDom } from '@/components/builder/consent/addDomElements';
import { COOKIE_CONSENT_SECTION_TRANSLATIONS } from '@/components/builder/consent/cookieConsentSectionTranslations';
import { getGoogleIntegrationElements } from '@/components/builder/consent/getGoogleIntegrationElements';
import {
	getAnalyticsIntegrationElements,
	getMarketingIntegrationElements,
	getNonGoogleIntegrationElements,
} from '@/components/builder/consent/getNonGoogleIntegrationElements';
import { updateConsent } from '@/components/builder/consent/googleConsentMode';
import {
	consentByLocale,
	defaultLocale,
	locales,
	siteMeta,
	siteStyles,
} from '@/data/cookieConsent';
import { loadCookieConsentRunner } from '@/data/cookieConsentLoader';

const CATEGORY_NECESSARY = 'necessary';
const CATEGORY_PLATFORM_ANALYTICS = 'platformAnalytics';
const CATEGORY_ANALYTICS = 'analytics';
const CATEGORY_MARKETING = 'marketing';
const CUSTOM_THEME_STYLE_ID = 'cc-custom-theme';

const DEFAULT_CONFIG = {
	categories: {
		isAnalyticsEnabled: true,
		isMarketingEnabled: true,
	},
	guiOptions: {
		consentModal: {
			layout: 'box',
			position: 'bottom left',
			isFlipButtons: false,
			isEqualWeightButtons: true,
		},
		preferencesModal: {
			layout: 'box',
			isFlipButtons: false,
			isEqualWeightButtons: true,
		},
	},
	theme: 'custom',
};

export function isHostingerConsentEnabled(meta) {
	return meta?.isCookieBarEnabled === true;
}

function getConsentConfig(meta) {
	if (meta?.cookieConsent) {
		return meta.cookieConsent;
	}

	return DEFAULT_CONFIG;
}

function buildCategories(config) {
	const categories = {
		[CATEGORY_NECESSARY]: {
			enabled: true,
			readOnly: true,
		},
		[CATEGORY_PLATFORM_ANALYTICS]: {
			enabled: false,
			readOnly: false,
		},
	};

	if (config.categories?.isAnalyticsEnabled) {
		categories[CATEGORY_ANALYTICS] = {};
	}

	if (config.categories?.isMarketingEnabled) {
		categories[CATEGORY_MARKETING] = {};
	}

	return categories;
}

function buildSections(config, translations, locale) {
	const sectionDefaults = COOKIE_CONSENT_SECTION_TRANSLATIONS[locale]
		|| COOKIE_CONSENT_SECTION_TRANSLATIONS.en;

	const sections = [
		{
			description: translations.description || 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.',
		},
		{
			title: translations.categoryNecessaryName || sectionDefaults.categoryNecessaryName,
			description: translations.categoryNecessaryDescription || sectionDefaults.categoryNecessaryDescription,
			linkedCategory: CATEGORY_NECESSARY,
		},
		{
			title: translations.categoryPlatformAnalyticsName || sectionDefaults.categoryPlatformAnalyticsName,
			description: translations.categoryPlatformAnalyticsDescription || sectionDefaults.categoryPlatformAnalyticsDescription,
			linkedCategory: CATEGORY_PLATFORM_ANALYTICS,
		},
	];

	if (config.categories?.isAnalyticsEnabled) {
		sections.push({
			title: translations.categoryAnalyticsName || 'Analytics',
			description: translations.categoryAnalyticsDescription || 'These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.',
			linkedCategory: CATEGORY_ANALYTICS,
		});
	}

	if (config.categories?.isMarketingEnabled) {
		sections.push({
			title: translations.categoryMarketingName || 'Marketing',
			description: translations.categoryMarketingDescription || 'These cookies are used to deliver advertisements that are relevant to you and your interests.',
			linkedCategory: CATEGORY_MARKETING,
		});
	}

	return sections;
}

function handleConsentChange({ acceptedCategories, meta }) {
	const isAnalyticsAccepted = acceptedCategories.includes(CATEGORY_ANALYTICS);
	const isMarketingAccepted = acceptedCategories.includes(CATEGORY_MARKETING);

	updateConsent({
		isAnalyticsAccepted,
		isMarketingAccepted,
	});

	if (isAnalyticsAccepted) {
		addElementsToDom(getAnalyticsIntegrationElements({ siteMeta: meta }));
	}

	if (isMarketingAccepted) {
		addElementsToDom(getMarketingIntegrationElements({ siteMeta: meta }));
	}
}

function formatBorderRadius(value) {
	const num = typeof value === 'string' ? Number.parseFloat(value) : value;

	if (Number.isNaN(num)) {
		return undefined;
	}

	return num >= 999 ? '999px' : `${num}px`;
}

function applyCustomTheme(styles) {
	const existing = document.getElementById(CUSTOM_THEME_STYLE_ID);

	if (existing) {
		existing.remove();
	}

	const primary = styles['grid-button-primary'] || {};
	const secondary = styles['grid-button-secondary'] || {};
	const vars = [];

	if (primary['background-color']) {
		vars.push(`--cc-btn-primary-bg: ${primary['background-color']}`);
		vars.push(`--cc-toggle-on-bg: ${primary['background-color']}`);
	}

	if (primary['background-color-hover']) {
		vars.push(`--cc-btn-primary-hover-bg: ${primary['background-color-hover']}`);
	}

	if (primary['font-color']) {
		vars.push(`--cc-btn-primary-color: ${primary['font-color']}`);
	}

	if (secondary['background-color']) {
		vars.push(`--cc-btn-secondary-bg: ${secondary['background-color']}`);
	}

	if (secondary['background-color-hover']) {
		vars.push(`--cc-btn-secondary-hover-bg: ${secondary['background-color-hover']}`);
	}

	if (secondary['font-color']) {
		vars.push(`--cc-btn-secondary-color: ${secondary['font-color']}`);
	}

	if (styles.font?.primary) {
		vars.push(`--cc-font-family: ${styles.font.primary}`);
	}

	if (!vars.length) {
		return;
	}

	const borderRadius = formatBorderRadius(primary['border-radius']);
	const btnRadiusRule = borderRadius
		? `#cc-main .cm__btn, #cc-main .pm__btn { border-radius: ${borderRadius}; }`
		: '';
	const style = document.createElement('style');

	style.id = CUSTOM_THEME_STYLE_ID;
	style.textContent = `#cc-main { ${vars.join('; ')}; } ${btnRadiusRule}`;
	document.head.appendChild(style);
}

function applyTheme(config, styles) {
	if (config.theme === 'dark') {
		document.documentElement.classList.add('cc--darkmode');
	}

	if (config.theme === 'custom' && styles) {
		applyCustomTheme(styles);
	}
}

function resolveTranslations(cookieConsentTranslations, legacyTranslations) {
	if (cookieConsentTranslations) {
		return cookieConsentTranslations;
	}

	return {
		title: legacyTranslations?.cookieBannerDisclaimer,
		description: legacyTranslations?.cookieBannerDisclaimer,
		acceptAll: legacyTranslations?.cookieBannerAcceptText,
		rejectAll: legacyTranslations?.cookieBannerDeclineText,
	};
}

function localeFromPath(pathname) {
	const first = String(pathname || '/').split('/').filter(Boolean)[0];

	if (first && locales.includes(first) && first !== defaultLocale) {
		return first;
	}

	return defaultLocale || 'en';
}

export default function CookieConsent() {
	const { pathname } = useLocation();
	const locale = useMemo(() => localeFromPath(pathname), [pathname]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return undefined;
		}

		let cancelled = false;

		const start = async () => {
			const consentEnabled = isHostingerConsentEnabled(siteMeta);
			const googleElements = getGoogleIntegrationElements({
				siteMeta,
				shouldSetConsentDefault: consentEnabled,
			});

			if (!consentEnabled) {
				addElementsToDom(googleElements);
				addElementsToDom(getNonGoogleIntegrationElements({ siteMeta }));
				return;
			}

			addElementsToDom(googleElements);

			const run = await loadCookieConsentRunner();

			if (cancelled || !run) {
				return;
			}

			const config = getConsentConfig(siteMeta);
			const localeConsent = consentByLocale[locale] || consentByLocale[defaultLocale] || {};
			const translations = resolveTranslations(
				localeConsent.translations,
				localeConsent.legacyTranslations,
			);

			await run({
				cookie: {
					name: 'cc_cookie',
					expiresAfterDays: 182,
					path: '/',
					sameSite: 'Lax',
					useLocalStorage: false,
				},
				categories: buildCategories(config),
				guiOptions: {
					consentModal: {
						layout: config.guiOptions?.consentModal?.layout,
						position: config.guiOptions?.consentModal?.position || 'bottom center',
						flipButtons: config.guiOptions?.consentModal?.isFlipButtons,
						equalWeightButtons: config.guiOptions?.consentModal?.isEqualWeightButtons,
					},
					preferencesModal: {
						layout: config.guiOptions?.preferencesModal?.layout,
						position: config.guiOptions?.preferencesModal?.position || 'left',
						flipButtons: config.guiOptions?.preferencesModal?.isFlipButtons,
						equalWeightButtons: config.guiOptions?.preferencesModal?.isEqualWeightButtons,
					},
				},
				language: {
					default: locale || 'en',
					translations: {
						[locale || 'en']: {
							consentModal: {
								title: translations.title || 'We use cookies',
								description: translations.description || 'This website uses cookies to ensure you get the best experience.',
								acceptAllBtn: translations.acceptAll || 'Accept all',
								acceptNecessaryBtn: translations.rejectAll || 'Reject all',
								showPreferencesBtn: translations.managePreferences || 'Manage preferences',
							},
							preferencesModal: {
								title: translations.preferencesTitle || 'Cookie Preferences',
								acceptAllBtn: translations.acceptAll || 'Accept all',
								acceptNecessaryBtn: translations.rejectAll || 'Reject all',
								savePreferencesBtn: translations.savePreferences || 'Save preferences',
								closeIconLabel: translations.closeIconLabel || 'Close',
								sections: buildSections(config, translations, locale || 'en'),
							},
						},
					},
				},
				onConsent: ({ cookie }) => {
					handleConsentChange({
						acceptedCategories: cookie.categories,
						meta: siteMeta,
					});
				},
				onChange: ({ cookie }) => {
					handleConsentChange({
						acceptedCategories: cookie.categories,
						meta: siteMeta,
					});
				},
			});

			if (!cancelled) {
				applyTheme(config, siteStyles);
			}
		};

		start();

		return () => {
			cancelled = true;
		};
	}, [locale]);

	return null;
}
