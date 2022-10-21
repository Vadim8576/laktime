import React from 'react';
import styled, { keyframes } from 'styled-components';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';


const LoadingIconContainer = styled.div`
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  flex-grow: 1;
  overflow: hidden;
`

const loading = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const Rotate = styled.span`
  animation: ${loading} 2s linear infinite;
`


const LoadingIcon = () => {
  return (
    <LoadingIconContainer>
      <Rotate>
        <CameraOutlinedIcon
          fontSize='large'
          sx={{ 'color': 'tomato' }}
        />
      </Rotate>
    </LoadingIconContainer>
  )
}

export default LoadingIcon;



