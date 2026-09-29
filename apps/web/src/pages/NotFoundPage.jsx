import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function NotFoundPage() {
 return <main style={{minHeight:'100vh',display:'grid',placeContent:'center',padding:32,background:'#f7f4ef',color:'#231c18',textAlign:'center'}}>
 <Helmet><title>Seite nicht gefunden | Philadelphia</title><meta name="robots" content="noindex" /></Helmet>
 <p>404</p><h1>Diese Seite wurde nicht gefunden.</h1><p>Über die Startseite finden Sie unsere Angebote und Kontaktinformationen.</p><Link to="/">Zur Startseite</Link></main>;
}
