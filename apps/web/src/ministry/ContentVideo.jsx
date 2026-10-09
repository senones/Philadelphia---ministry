import React, { useState } from 'react';
import { useLocale } from './LocaleContext';

const labels = {
  de: { video: 'Video', open: 'Video öffnen', unavailable: 'Dieses Video ist momentan nicht verfügbar.' },
  en: { video: 'Video', open: 'Open video', unavailable: 'This video is currently unavailable.' },
  el: { video: 'Βίντεο', open: 'Άνοιγμα βίντεο', unavailable: 'Αυτό το βίντεο δεν είναι διαθέσιμο αυτή τη στιγμή.' },
  ar: { video: 'فيديو', open: 'فتح الفيديو', unavailable: 'هذا الفيديو غير متاح حاليًا.' },
};

function VideoSource({ video }) {
  const { locale, t } = useLocale();
  const [failed, setFailed] = useState(false);
  const caption = t(video.caption) || '';
  const text = labels[locale] || labels.de;
  return <figure className="content-video">
    {failed ? <p className="video-unavailable" role="status">{text.unavailable}</p> : <video
      src={video.src} poster={video.poster || undefined} controls playsInline preload="metadata"
      aria-label={caption || text.video} onError={() => setFailed(true)}
    >
      <a href={video.src} target="_blank" rel="noopener noreferrer">{text.open}</a>
    </video>}
    {caption && <figcaption dir="auto">{caption}</figcaption>}
  </figure>;
}

export default function ContentVideo({ video }) {
  if (!/^\/videos\/[^?#\\]+\.mp4$/i.test(video?.src || '') || video.src.includes('..')) return null;
  return <VideoSource key={video.src} video={video} />;
}
