import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import styled from 'styled-components';


interface IImageHoverContainerProps {
  hover: boolean;
}

const ImageHoverContainer = styled.div<IImageHoverContainerProps>`
  opacity: ${(props) => (props.hover ? .5 : 0)};
  background: #000;
  transition: .5s all;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

interface IImageHoverAreaProps { 
  hover: boolean;
  imgIsLoading: boolean;
}

const ImageHoverArea: FC<IImageHoverAreaProps> = observer(({ ...props }) => {
  const { hover, imgIsLoading } = props;
  if(imgIsLoading) return null;
  return (
    <ImageHoverContainer
      hover={hover}
    >
      <ZoomInIcon color='info' fontSize='large' />
    </ImageHoverContainer>
  )
})

export default ImageHoverArea;




