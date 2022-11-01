import React, { useMemo } from 'react';
import { IPortfolioList } from '../store/storeTypes';

const baseUrl = 'http://localhost:4000/images/';


export const useUrlsFormat = (imagePath: string | IPortfolioList[]) => {
  const urls = useMemo(() => {
    if(Array.isArray(imagePath)) {
      const pathList: string[] = imagePath.map(path => `${baseUrl}${path.image_path}?w=248&fit=crop&auto=format`);
      return pathList;
    } else {
      const src: string = `${baseUrl}${imagePath}?w=248&fit=crop&auto=format`;
      return src;
    }
  }, [imagePath])


  return urls;
}
