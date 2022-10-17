import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

 const useMediaQueryMatches = (query: string) => {
  const matches = useMediaQuery(query);  
  return matches ? { cols: 2, gap: 20 } : { cols: 3, gap: 8 };
}

export default useMediaQueryMatches;