import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';


const ImageSpinerContainer = styled.div`
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  flex-grow: 1;
  overflow: hidden;
`

const loadingAnimation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const Rotate = styled.span`
  animation: ${loadingAnimation} 2s linear infinite;
`

interface IImageSpinerProps {
  imgIsLoading: boolean;
}

const ImageSpiner: FC<IImageSpinerProps> = ({ imgIsLoading }) => {
  if(!imgIsLoading) return null;
  return (
    <ImageSpinerContainer>
      <Rotate>
        <CameraOutlinedIcon
          fontSize='large'
          sx={{ 'color': 'tomato' }}
        />
      </Rotate>
    </ImageSpinerContainer>
  )
}

export default ImageSpiner;



