import React, { useState } from 'react';

function ImageSource({ src, children, onError, node: _markdownNode, ...props }) {
  const [failed, setFailed] = useState(false);
  const image = typeof src === 'string' && src.trim() && !failed
    ? <img {...props} src={src} onError={event => { setFailed(true); onError?.(event); }} />
    : null;
  // A figure or image link can disappear together with its missing image.
  // Project links and PDF cards can keep their text and provide a fallback.
  return typeof children === 'function' ? children(image) : image;
}

export default function ContentImage(props) {
  // Selecting a replacement image clears the failure of the previous source.
  return <ImageSource key={props.src || ''} {...props} />;
}
