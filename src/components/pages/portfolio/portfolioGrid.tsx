import React, { useCallback, useEffect } from "react";
import { Container, ImageList } from '@mui/material';
import { observer } from 'mobx-react-lite';
import portfolioStore from "../../../store/portfolioStore";
import Box from '@mui/material/Box';
import NoData from '../../noData';
import { toJS } from 'mobx';
import useMediaQueryMatches from '../../../hooks/useMediaQueryMatches';
import ImageItem from './imageItem';



const PortfolioGrid = observer(() => {

  const { sortImages, imageListLength } = portfolioStore;
  const { cols, gap } = useMediaQueryMatches('(max-width:1000px)');

  useEffect(() => {
    console.log('PortfolioGrid')
  }, [])

  if (!imageListLength) return <NoData text={'Нет изображений'} />

  return (
    <Box sx={{ width: '100%', height: '100%', overflowY: 'hidden' }}>
      <ImageList cols={cols} gap={gap}>
        {sortImages.map((image) => (
          <ImageItem
            key={image.id}
            imagePath={image.image_path}
            id={image.id}
          />
        ))}
      </ImageList>
    </Box>
  )
})


export default PortfolioGrid;
