import React, { FC, useEffect } from "react";
import { ImageList } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import NoData from '../../widgets/noData';
import useMediaQueryMatches from '../../../hooks/useMediaQueryMatches';
import ImageItem from './imageItem';

import { IPortfolioList } from '../../../store/storeTypes';


interface IPortfolioGridProps {
  sortImages: IPortfolioList[];
  imageListLength: number;
  zoomHandler: (zoomImage: any) => void;
}

const PortfolioGrid: FC<IPortfolioGridProps> = observer(( {...props} ) => {

  const { sortImages, imageListLength, zoomHandler } = props;
  const { cols, gap } = useMediaQueryMatches('(max-width:1000px)');

  useEffect(() => {
    console.log('PortfolioGrid')
  }, [])


  if (!imageListLength) return <NoData text={'Нет изображений'} />

  return (
    <Box sx={{ width: '100%', height: '100%', overflowY: 'hidden',  }}>
      <ImageList cols={cols} gap={gap} sx={{margin: 2}}>
        {sortImages.map((image, imageIndex) => (
          <ImageItem
            key={image.id}
            imagePath={image.image_path}
            id={image.id}
            zoomHandler={zoomHandler}
            imageIndex={imageIndex}
          />
        ))}
      </ImageList>
    </Box>
  )
})


export default PortfolioGrid;
