import { CONSENT_DEFAULTS_DENIED } from './googleConsentMode';

export function googleConsentDefaultScript() {
	return `window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('consent', 'default', ${JSON.stringify(CONSENT_DEFAULTS_DENIED)});`;
}

export function facebookPixelScript(facebookPixelId) {
	return `!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '${facebookPixelId}');
	fbq('track', 'PageView');`;
}

export function facebookPixelNoScript(facebookPixelId) {
	return `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"/>`;
}

export function googleTagManagerScript({
	containerId,
	gtmQuery = '',
} = {}) {
	return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl${gtmQuery};f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer',${JSON.stringify(containerId)});`;
}

export function googleTagManagerNoScript(containerIdOrOptions) {
	const containerId = typeof containerIdOrOptions === 'string'
		? containerIdOrOptions
		: containerIdOrOptions?.containerId;
	const gtmQuery = typeof containerIdOrOptions === 'object'
		? (containerIdOrOptions?.gtmQuery || '')
		: '';

	return `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}${gtmQuery}"
		height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
}

export function googleAnalyticsScript({
	containerId,
	googleAdsIds = [],
	googleTag,
} = {}) {
	const adsIds = googleAdsIds.length
		? googleAdsIds.map((id) => `gtag('config', ${JSON.stringify(id)});`).join('\n		')
		: '';
	const googleAnalyticsId = containerId ? `gtag('config', ${JSON.stringify(containerId)});` : '';
	const googleTagId = googleTag ? `gtag('config', ${JSON.stringify(googleTag)});` : '';

	return `window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		${googleAnalyticsId}
		${googleTagId}
		${adsIds}`;
}

export function googleAnalyticsScriptAsync(analyticsId) {
	return `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
}

export function hotjarScript(hotjarId) {
	return `(function(d) {
	var script = d.createElement('script');
	script.src = 'https://t.contentsquare.net/uxa/${hotjarId}.js';
	script.async = true;
	d.head.appendChild(script);
})(document);`;
}
