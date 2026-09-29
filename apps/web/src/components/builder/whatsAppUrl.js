export function buildWhatsAppUrl(number, message, isEnabled) {
	if (!number) {
		return null;
	}

	// Match site-modules: show when number is set unless explicitly disabled.
	if (isEnabled === false) {
		return null;
	}

	const query = message ? `?text=${encodeURIComponent(message)}` : '';
	return `https://wa.me/${number}${query}`;
}
