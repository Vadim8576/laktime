import React from "react";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Event } from "../../types/types";

interface IImageChangeButtonProps {
  imageChangeHandler: { (e: Event<HTMLInputElement>): void } | null;
  multiple: boolean;
}

const ImageChangeButton = ({ ...props }: IImageChangeButtonProps) => {
  const { imageChangeHandler, multiple } = props;
  if (!imageChangeHandler) return null;
  return (
    <Tooltip title="Выбрать изображения">
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept=".png, .jpg" multiple={multiple} type="file" onChange={imageChangeHandler} />
        <PhotoCamera
          fontSize='large'
        />
      </IconButton>
    </Tooltip>
  )
}

export default ImageChangeButton;