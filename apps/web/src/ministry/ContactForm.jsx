import React, { useEffect, useRef, useState } from 'react';
import { useLocale } from './LocaleContext';
import { ui } from './content';

export default function ContactForm() {
  const { t, locale } = useLocale();
  const [available, setAvailable] = useState(null);
  const [status, setStatus] = useState('idle');
  const submitting = useRef(false);
  const submission = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    let mounted = true;
    fetch('/api/contact', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => response.ok ? response.json() : null)
      .then((data) => { if (mounted) setAvailable(data?.enabled === true); })
      .catch(() => { if (mounted) setAvailable(false); })
      .finally(() => clearTimeout(timer));
    return () => { mounted = false; clearTimeout(timer); controller.abort(); };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!available || submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { name: data.get('name'), email: data.get('email'), message: data.get('message'), website: data.get('website'), locale };
    if (payload.website) { setStatus('error'); return; }
    const fingerprint = JSON.stringify(payload);
    if (submission.current?.fingerprint !== fingerprint) submission.current = { fingerprint, requestId: crypto.randomUUID() };
    submitting.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ ...payload, requestId: submission.current.requestId }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        setStatus(response.status === 429 ? 'rate-limit' : 'error');
        if (response.status === 503) setAvailable(false);
        return;
      }
      form.reset();
      submission.current = null;
      setStatus('success');
    } catch { setStatus('error'); }
    finally { clearTimeout(timer); submitting.current = false; }
  };
  return <form className="contact-form" onSubmit={submit} onChange={() => { if (!submitting.current) setStatus('idle'); }} aria-busy={available === null || status === 'sending'}>
    {available !== true && <p className="form-notice" role="status">{t(available === null ? ui.formChecking : ui.formPending)}</p>}
    <div className="form-grid">
      <label htmlFor="contact-name">{t(ui.name)}<input id="contact-name" name="name" autoComplete="name" maxLength={120} required /></label>
      <label htmlFor="contact-email">{t(ui.email)}<input id="contact-email" name="email" type="email" dir="ltr" autoComplete="email" maxLength={254} required /></label>
    </div>
    <label htmlFor="contact-message">{t(ui.message)}<textarea id="contact-message" name="message" rows={5} maxLength={5000} required /></label>
    <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button button-primary" type="submit" disabled={!available || status === 'sending'}>{t(status === 'sending' ? ui.sending : ui.send)}</button>
    <p className={`form-status ${status}`} role="status">{status === 'success' ? t(ui.sent) : status === 'rate-limit' ? t(ui.rateLimit) : status === 'error' ? t(ui.error) : ''}</p>
  </form>;
}
