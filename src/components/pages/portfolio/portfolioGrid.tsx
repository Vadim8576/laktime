import React, { useEffect, useCallback, useState } from "react";
import { Container, ImageList, ImageListItem, Skeleton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import portfolioStore from "../../../store/portfolioStore";
import Box from '@mui/material/Box';
import styled from 'styled-components';
import NoData from '../../noData';
import { toJS } from 'mobx';
import useMediaQueryMatches from '../../../hooks/useMediaQueryMatches';
import ImageItem from './imageItem';





// const Image = styled.img`
//   width: auto;
//   height: 100px;
//   :hover {
// 		height: 100px;
// 	}
// `;

const IDOut = styled.div`
  position: absolute;
  left: 0;
  top: 20px;
  color: #fff;
`;

interface IPortfolioGridProps {
}


const PortfolioGrid: React.FC<IPortfolioGridProps> = observer(() => {

  console.log('PortfolioGrid')

  const { sortImages, imageListLength } = portfolioStore;
  const { cols, gap } = useMediaQueryMatches('(max-width:1000px)');


  const mouseEnterHandler = useCallback(() => {
    // console.log('Enter')
  }, [])
  const mouseLeaveHandler = useCallback(() => {
    // console.log('Leave')
  }, [])

  if (!imageListLength) return <NoData text={'Нет изображений'} />
  
  return (
    <Container sx={{ height: '100%' }}>
      <Box sx={{ width: '100%', height: '100%', overflowY: 'hidden' }}>
        <ImageList cols={cols} gap={gap}>
          {sortImages.map((image) => (
            <ImageItem key={image.id} imagePath={image.image_path} />
          ))}
        </ImageList>
      </Box>
    </Container>
  )
})


export default PortfolioGrid;
