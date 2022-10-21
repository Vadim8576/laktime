import React, { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:4000/images/';

export const useSrc = (path: string) =>{
  const [url, setUrl] = useState({ src: '', srcSet: '' });

  useEffect(() => {
    const src = `${baseUrl}${path}?w=248&fit=crop&auto=format`;
    const srcSet = `${baseUrl}${path}?w=248&fit=crop&auto=format&dpr=2 2x`;
    setUrl({ src, srcSet });
  }, [path])

  return url;
}
