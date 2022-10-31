import React, { FC, useCallback, useState, useEffect } from "react";
import { Backdrop } from '@mui/material';
import styled from "styled-components";



const Img = styled.img`
  transition: 1s all;
  object-fit: contain;
  width: 90%;
  height: auto;
  max-height: 90%;
  &:hover {
    cursor: pointer;
  }
`

interface IZoomImage {
  zoomUrl: string;
  setZoomUrl: (url: string) => void;
}

const ZoomImage: FC<IZoomImage> = ({ ...props }) => {

  const { zoomUrl, setZoomUrl } = props;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    zoomUrl ? setOpen(true) : setOpen(false);
  }, [zoomUrl])

  const handleClose = useCallback(() => {
    setOpen(false)
    setZoomUrl('');
  }, [])

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      }}
      open={open}
      onClick={handleClose}
    >
      <Img
        src={zoomUrl}
        srcSet={zoomUrl}
        alt='Маникюр'
        loading='lazy'
      // onLoad={onLoad}
      // transparency={imgIsLoading}
      // onMouseMove={mouseEnterHandler}
      // onMouseOut={mouseLeaveHandler}
      // onClick={() => zoomHandler(url.src)}
      />

    </Backdrop>
  )
}


export default ZoomImage;