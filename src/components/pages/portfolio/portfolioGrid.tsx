import React, { useEffect, useState } from "react";
import { Container, ImageList, ImageListItem, Typography, Skeleton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import portfolioStore from "../../../store/portfolioStore";
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import NoData from '../../noData';


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


export const PortfolioGrid: React.FC<IPortfolioGridProps> = observer(() => {

  console.log('PortfolioGrid')

    const { sortImages, imageListLength } = portfolioStore;

    if (!imageListLength) return <NoData text={'Нет изображений'} />

    const [imageGrid, setImageGrid] = useState({ cols: 3, gap: 8 })
    const matches = useMediaQuery('(max-width:1000px)');

    useEffect(() => {
      matches ? setImageGrid({ cols: 2, gap: 20 }) : setImageGrid({ cols: 3, gap: 8 })
    }, [matches])

    const mouseEnterHandler = () => {
      // console.log('Enter')
    }
    const mouseLeaveHandler = () => {
      // console.log('Leave')
    }

    return (
      <Container sx={{ height: '100%' }}>
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <ImageList variant="masonry" cols={imageGrid.cols} gap={imageGrid.gap}>
            {sortImages.map((image) => (
              <ImageListItem
                key={image.id}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
              >
                <img
                  src={'http://localhost:4000/images/' + `${image.image_path}?w=248&fit=crop&auto=format`}
                  srcSet={'http://localhost:4000/images/' + `${image.image_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.id}
                  loading="lazy"
                />
                <IDOut>{image.id}</IDOut>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    )
  })

export default PortfolioGrid;



