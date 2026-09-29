const GRANTED = 'granted';
const DENIED = 'denied';

export const CONSENT_DEFAULTS_DENIED = {
	analytics_storage: DENIED,
	ad_storage: DENIED,
	ad_user_data: DENIED,
	ad_personalization: DENIED,
	functionality_storage: DENIED,
	personalization_storage: DENIED,
	security_storage: GRANTED,
};

function ensureGtag() {
	if (typeof window === 'undefined') {
		return;
	}

	window.dataLayer = window.dataLayer || [];

	if (typeof window.gtag !== 'function') {
		window.gtag = function gtag() {
			(window.dataLayer || []).push(arguments);
		};
	}
}

export function updateConsent({
	isAnalyticsAccepted,
	isMarketingAccepted,
}) {
	if (typeof window === 'undefined') {
		return;
	}

	ensureGtag();

	window.gtag?.('consent', 'update', {
		analytics_storage: isAnalyticsAccepted ? GRANTED : DENIED,
		ad_storage: isMarketingAccepted ? GRANTED : DENIED,
		ad_user_data: isMarketingAccepted ? GRANTED : DENIED,
		ad_personalization: isMarketingAccepted ? GRANTED : DENIED,
		functionality_storage: DENIED,
		personalization_storage: DENIED,
		security_storage: GRANTED,
	});
}
