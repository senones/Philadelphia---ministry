import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { useLocale } from './LocaleContext';
import { ui } from './content';

// Set this only for an independently configured PocketBase backend.
const backend = import.meta.env.VITE_POCKETBASE_URL;
const client = backend ? new PocketBase(backend) : null;
export default function ContactForm() {
  const { t } = useLocale();
  const [status, setStatus] = useState('idle');
  const submit = async (event) => {
    event.preventDefault();
    if (!client || status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return;
    setStatus('sending');
    try {
      await client.collection('contact_form').create({ name: data.get('name'), email: data.get('email'), message: data.get('message') });
      form.reset(); setStatus('success');
    } catch { setStatus('error'); }
  };
  return <form className="contact-form" onSubmit={submit}>
    {!client && <p className="form-notice">{t(ui.formPending)}</p>}
    <div className="form-grid">
      <label htmlFor="contact-name">{t(ui.name)}<input id="contact-name" name="name" autoComplete="name" maxLength={120} required /></label>
      <label htmlFor="contact-email">{t(ui.email)}<input id="contact-email" name="email" type="email" dir="ltr" autoComplete="email" maxLength={254} required /></label>
    </div>
    <label htmlFor="contact-message">{t(ui.message)}<textarea id="contact-message" name="message" rows={5} maxLength={5000} required /></label>
    <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button button-primary" type="submit" disabled={!client || status === 'sending'}>{t(status === 'sending' ? ui.sending : ui.send)}</button>
    <p className={`form-status ${status}`} role="status">{status === 'success' ? t(ui.sent) : status === 'error' ? t(ui.error) : ''}</p>
  </form>;
}
