import { useMemo } from 'react';
import { IPortfolioList } from '../types/types';

const baseUrl = 'http://localhost:4000/images/';

export const useUrlsFormat = (imageNames: string | IPortfolioList[]) => {
  const urls = useMemo(() => {
    if(Array.isArray(imageNames)) {
      return imageNames.map(name => `${baseUrl}${name.image_name}?w=248&fit=crop&auto=format`)
    } else {
      return `${baseUrl}${imageNames}?w=248&fit=crop&auto=format`;
    }
  }, [imageNames])

  return urls;
}
