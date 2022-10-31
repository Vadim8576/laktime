import { useMemo, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

 const useMediaQueryMatches = (query: string) => {
  const matches = useMediaQuery(query);
  const mediaQueryMatches = useMemo(() => {    
    return matches ? { cols: 2, gap: 20 } : { cols: 4, gap: 20 };
  }, [matches])
  
  return mediaQueryMatches;
}

export default useMediaQueryMatches;